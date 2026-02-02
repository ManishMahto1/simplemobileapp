import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {RootStackParamList} from '../types/navigation.types';
import {ROUTES} from './routes';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={ROUTES.HOME}
        screenOptions={{
          headerShown: true,
          headerBackVisible: false,
          animation: 'slide_from_right',
        }}>
        <Stack.Screen
          name={ROUTES.HOME}
          component={HomeScreen}
          options={{
            title: 'Posts',
          }}
        />
        <Stack.Screen
          name={ROUTES.DETAILS}
          component={DetailsScreen}
          options={{
            title: 'Post Details',
          }}
        />
        <Stack.Screen
          name={ROUTES.PROFILE}
          component={ProfileScreen}
          options={{
            title: 'User Profile',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
