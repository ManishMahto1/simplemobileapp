import {API_CONFIG} from '../config/api.config';
import {ApiError} from '../types/api.types';

class ApiClient {
  private baseURL: string;
  private timeout: number;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
  }

  /**
   * Make HTTP request with timeout
   */
  private async fetchWithTimeout(
    url: string,
    options: RequestInit = {},
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  /**
   * Handle API errors
   */
  private handleError(error: any): ApiError {
    if (error.name === 'AbortError') {
      return {
        message: 'Request timeout',
        status: 408,
        code: 'TIMEOUT',
      };
    }

    if (typeof navigator !== 'undefined' && (navigator as any).onLine === false) {
      return {
        message: 'No internet connection',
        status: 0,
        code: 'NETWORK_ERROR',
      };
    }

    return {
      message: error.message || 'An error occurred',
      status: error.status || 500,
      code: error.code || 'UNKNOWN_ERROR',
    };
  }

  /**
   * GET request
   */
  async get<T = any>(endpoint: string, params?: Record<string, any>): Promise<T> {
    try {
      let url = `${this.baseURL}${endpoint}`;
      
      // Add query parameters
      if (params) {
        const queryString = new URLSearchParams(params).toString();
        url += `?${queryString}`;
      }

      const response = await this.fetchWithTimeout(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw {
          message: `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
        };
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * POST request
   */
  async post<T = any>(endpoint: string, body?: any): Promise<T> {
    try {
      const response = await this.fetchWithTimeout(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw {
          message: `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
        };
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * PUT request
   */
  async put<T = any>(endpoint: string, body?: any): Promise<T> {
    try {
      const response = await this.fetchWithTimeout(`${this.baseURL}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw {
          message: `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
        };
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * DELETE request
   */
  async delete<T = any>(endpoint: string): Promise<T> {
    try {
      const response = await this.fetchWithTimeout(`${this.baseURL}${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw {
          message: `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
        };
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
