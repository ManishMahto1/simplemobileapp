import {Middleware, AnyAction} from '@reduxjs/toolkit';
import {storageService} from '../../services/storageService';

/**
 * Middleware to persist specific state changes to AsyncStorage
 */
export const persistMiddleware: Middleware = store => next => (action: unknown) => {
  const typedAction = action as AnyAction;
  const result = next(action);
  
  // Get the current state after the action is processed
  const state = store.getState();
  
  // Persist posts and users data when they change
  if (typedAction.type?.includes('data/fetchPosts')) {
    storageService.savePosts(state.data.posts).catch(console.error);
  }
  
  if (typedAction.type?.includes('data/fetchUsers')) {
    storageService.saveUsers(state.data.users).catch(console.error);
  }
  
  // Save last sync timestamp
  if (
    typedAction.type?.includes('data/fetchPosts') ||
    typedAction.type?.includes('data/fetchUsers')
  ) {
    storageService.saveLastSync(Date.now()).catch(console.error);
  }
  
  return result;
};
