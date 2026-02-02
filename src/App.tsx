import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';

import AppNavigator from './navigation/AppNavigator';
import {store, persistor} from './store/index';
import {useAppLifecycle} from './hooks/useAppLifecycle';
import Loader from './components/common/Loader';
import {COLORS} from './theme/colors';

const AppContent: React.FC = () => {
  const {isActive} = useAppLifecycle();

  useEffect(() => {
    console.log('App lifecycle state:', isActive ? 'active' : 'background');
  }, [isActive]);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <AppNavigator />
    </SafeAreaProvider>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
};

export default App;
