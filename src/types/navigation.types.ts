import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {Post, User} from './api.types';

// Root Stack Parameter List
export type RootStackParamList = {
  Home: undefined;
  Details: {
    post: Post;
  };
  Profile: {
    userId: number;
  };
};

// Screen Props Types
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;
export type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

// Navigation Prop Types
export type NavigationProps = HomeScreenProps['navigation'] | 
                              DetailsScreenProps['navigation'] | 
                              ProfileScreenProps['navigation'];

// Route Prop Types
export type RouteProps = HomeScreenProps['route'] | 
                        DetailsScreenProps['route'] | 
                        ProfileScreenProps['route'];
