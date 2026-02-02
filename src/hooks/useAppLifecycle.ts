import {useEffect, useState, useRef} from 'react';
import {AppState, AppStateStatus} from 'react-native';

interface UseAppLifecycleReturn {
  isActive: boolean;
  isForeground: boolean;
  isBackground: boolean;
  currentState: AppStateStatus;
}

/**
 * Hook to track app lifecycle state
 * @returns Object containing app lifecycle information
 */
export function useAppLifecycle(): UseAppLifecycleReturn {
  const [appState, setAppState] = useState<AppStateStatus>(
    AppState.currentState,
  );
  const appStateRef = useRef<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appStateRef.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      if (
        appStateRef.current === 'active' &&
        nextAppState.match(/inactive|background/)
      ) {
        console.log('App has gone to the background!');
      }

      appStateRef.current = nextAppState;
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return {
    isActive: appState === 'active',
    isForeground: appState === 'active',
    isBackground: appState === 'background',
    currentState: appState,
  };
}
