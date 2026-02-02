import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE_KEYS} from '../config/storage.config';

class StorageService {
  /**
   * Save data to storage
   */
  async setItem<T>(key: string, value: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error(`Error saving ${key} to storage:`, error);
      throw error;
    }
  }

  /**
   * Get data from storage
   */
  async getItem<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error(`Error reading ${key} from storage:`, error);
      return null;
    }
  }

  /**
   * Remove data from storage
   */
  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key} from storage:`, error);
      throw error;
    }
  }

  /**
   * Clear all data from storage
   */
  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  }

  /**
   * Get all keys from storage
   */
  async getAllKeys(): Promise<string[]> {
    try {
      return [...(await AsyncStorage.getAllKeys())];
    } catch (error) {
      console.error('Error getting all keys from storage:', error);
      return [];
    }
  }

  /**
   * Get multiple items from storage
   */
  async multiGet(keys: string[]): Promise<Record<string, any>> {
    try {
      const pairs = await AsyncStorage.multiGet(keys);
      const result: Record<string, any> = {};
      
      pairs.forEach(([key, value]) => {
        if (value) {
          try {
            result[key] = JSON.parse(value);
          } catch {
            result[key] = value;
          }
        }
      });
      
      return result;
    } catch (error) {
      console.error('Error getting multiple items from storage:', error);
      return {};
    }
  }

  /**
   * Set multiple items to storage
   */
  async multiSet(keyValuePairs: Array<[string, any]>): Promise<void> {
    try {
      const jsonPairs: [string, string][] = keyValuePairs.map(([key, value]) => [
        key,
        JSON.stringify(value),
      ]);
      await AsyncStorage.multiSet(jsonPairs as [string, string][]);
    } catch (error) {
      console.error('Error setting multiple items to storage:', error);
      throw error;
    }
  }

  /**
   * Remove multiple items from storage
   */
  async multiRemove(keys: string[]): Promise<void> {
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.error('Error removing multiple items from storage:', error);
      throw error;
    }
  }

  /**
   * Check if item exists in storage
   */
  async hasItem(key: string): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value !== null;
    } catch (error) {
      console.error(`Error checking if ${key} exists in storage:`, error);
      return false;
    }
  }

  /**
   * Save posts data
   */
  async savePosts(posts: any[]): Promise<void> {
    return this.setItem(STORAGE_KEYS.POSTS_DATA, posts);
  }

  /**
   * Get posts data
   */
  async getPosts(): Promise<any[] | null> {
    return this.getItem(STORAGE_KEYS.POSTS_DATA);
  }

  /**
   * Save users data
   */
  async saveUsers(users: any[]): Promise<void> {
    return this.setItem(STORAGE_KEYS.USERS_DATA, users);
  }

  /**
   * Get users data
   */
  async getUsers(): Promise<any[] | null> {
    return this.getItem(STORAGE_KEYS.USERS_DATA);
  }

  /**
   * Save last sync timestamp
   */
  async saveLastSync(timestamp: number): Promise<void> {
    return this.setItem(STORAGE_KEYS.LAST_SYNC, timestamp);
  }

  /**
   * Get last sync timestamp
   */
  async getLastSync(): Promise<number | null> {
    return this.getItem(STORAGE_KEYS.LAST_SYNC);
  }
}

// Export singleton instance
export const storageService = new StorageService();
export default storageService;
