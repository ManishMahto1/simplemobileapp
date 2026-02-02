# React Native Posts App

A production-ready React Native application demonstrating best practices for mobile app development with posts browsing, search functionality, and pagination.

##  Features

- **Browse Posts**: View a list of posts fetched from JSONPlaceholder API
- **Search**: Real-time search with debouncing
- **Pagination**: Infinite scroll with load more functionality
- **User Profiles**: View detailed user information
- **Post Details**: Read full post content and author information
- **Data Persistence**: Posts and users cached locally for offline access
- **Lifecycle Management**: Proper handling of app states (active, background, killed)
- **Pull to Refresh**: Refresh data with swipe-down gesture
- **Smooth Performance**: Optimized FlatList rendering

##  Technical Stack

- **React Native CLI** 
- **TypeScript** for type safety
- **Redux Toolkit** for state management
- **Redux Persist** for data persistence
- **React Navigation** for navigation
- **AsyncStorage** for local storage
- **Functional Components** with React Hooks
- **No third-party UI libraries** (pure React Native components)

##  Project Structure

```
myApp/
├── android/                    # Android native code
├── ios/                       # iOS native code
├── src/
│   ├── api/                   # API client and endpoints
│   │   ├── apiClient.ts       # HTTP client with timeout & error handling
│   │   └── endpoints.ts       # API endpoint functions
│   │
│   ├── assets/                # Images, fonts, etc.
│   │
│   ├── components/
│   │   ├── common/           # Reusable components
│   │   │   ├── AppText.tsx   # Customizable text component
│   │   │   ├── Loader.tsx    # Loading indicator
│   │   │   ├── ErrorView.tsx # Error state component
│   │   │   └── SearchBar.tsx # Search input component
│   │   └── list/
│   │       └── ItemCard.tsx  # Post item component
│   │
│   ├── config/               # App configuration
│   │   ├── api.config.ts    # API settings
│   │   └── storage.config.ts # Storage keys & settings
│   │
│   ├── hooks/                # Custom React hooks
│   │   ├── useDebounce.ts   # Debounce hook for search
│   │   ├── useAppLifecycle.ts # App state tracking
│   │   └── usePagination.ts  # Pagination logic
│   │
│   ├── navigation/
│   │   ├── AppNavigator.tsx  # Navigation setup
│   │   └── routes.ts         # Route constants
│   │
│   ├── screens/
│   │   ├── HomeScreen.tsx    # Posts listing screen
│   │   ├── DetailsScreen.tsx # Post detail screen
│   │   └── ProfileScreen.tsx # User profile screen
│   │
│   ├── services/
│   │   └── storageService.ts # AsyncStorage wrapper
│   │
│   ├── store/                # Redux store
│   │   ├── index.ts         # Store configuration
│   │   ├── hooks.ts         # Typed Redux hooks
│   │   ├── middleware/
│   │   │   └── persistMiddleware.ts # Auto-save to storage
│   │   └── slices/
│   │       └── dataSlice.ts  # Posts & users state
│   │
│   ├── theme/                # Design tokens
│   │   ├── colors.ts        # Color palette
│   │   └── spacing.ts       # Spacing, fonts, etc.
│   │
│   ├── types/                # TypeScript types
│   │   ├── api.types.ts     # API response types
│   │   ├── navigation.types.ts # Navigation types
│   │   ├── store.types.ts   # Redux state types
│   │   └── common.types.ts  # Shared types
│   │
│   ├── utils/
│   │   ├── constants.ts     # App constants
│   │   └── helpers.ts       # Utility functions
│   │
│   └── App.tsx              # Root component
│
├── .gitignore
├── app.json
├── babel.config.js
├── index.js
├── metro.config.js
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn
- React Native development environment set up
  - For iOS: Xcode, CocoaPods
  - For Android: Android Studio, JDK

### Installation

1. **Clone the repository**
   ```bash
   git clone <https://github.com/ankitatworkz/simplemobileapp.git>
   cd myApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install iOS dependencies** (Mac only)
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Start Metro bundler**
   ```bash
   npm start
   # or
   yarn start
   ```

5. **Run the app**

   For iOS:
   ```bash
   npm run ios
   # or
   yarn ios
   ```

   For Android:
   ```bash
   npm run android
   # or
   yarn android
   ```

##  Key Technical Decisions

### 1. **State Management - Redux Toolkit**
- **Why**: Predictable state management with excellent TypeScript support
- **Implementation**: 
  - Single source of truth for posts and users
  - Async thunks for API calls
  - Normalized state structure
  - Type-safe selectors and actions

### 2. **Data Persistence - Redux Persist + AsyncStorage**
- **Why**: Seamless offline experience and faster app launches
- **Implementation**:
  - Automatic state persistence
  - Custom middleware for selective persistence
  - Restore data on app launch
  - Handle app lifecycle states

### 3. **Performance Optimizations**
- **FlatList Optimization**:
  - `keyExtractor` for stable keys
  - `getItemLayout` for known heights (could be added)
  - `removeClippedSubviews` for large lists
  - Memoized render functions
- **Search Debouncing**: 300ms delay to reduce unnecessary renders
- **Pagination**: Load 20 items at a time with infinite scroll

### 4. **Type Safety - TypeScript**
- Strict mode enabled
- Comprehensive type definitions for:
  - API responses
  - Redux state
  - Navigation params
  - Component props
- Path aliases for cleaner imports

### 5. **Code Organization**
- **Feature-based structure**: Related code grouped together
- **Separation of concerns**: Clear boundaries between layers
- **Reusable components**: DRY principle applied
- **Custom hooks**: Shared logic extraction

### 6. **Error Handling**
- API client with timeout and retry logic
- Error states in Redux
- User-friendly error messages
- Retry functionality in UI

### 7. **Navigation**
- Type-safe navigation with TypeScript
- Native stack navigator for performance
- Proper param passing between screens

##  API Integration

**Base URL**: `https://jsonplaceholder.typicode.com`

### Endpoints Used:
- `GET /posts` - Fetch posts with pagination
- `GET /posts/:id` - Fetch single post
- `GET /users` - Fetch all users
- `GET /users/:id` - Fetch single user

### Features:
- Request timeout (30 seconds)
- Retry logic with exponential backoff
- Network error handling
- TypeScript typed responses

##  App Lifecycle Handling

The app properly handles all lifecycle states:

1. **Active State**: Normal operation, data fetching enabled
2. **Background State**: App minimized, operations paused
3. **Killed State**: Data persisted, restored on next launch

Implementation via:
- `useAppLifecycle` custom hook
- Redux Persist for state restoration
- AsyncStorage for data caching

##  Data Persistence Strategy

### What's Persisted:
- Posts data
- Users data
- Pagination state
- Search query

### Storage Keys:
- Defined in `storage.config.ts`
- Namespaced to avoid conflicts
- Versioned for migration support

### Restore Flow:
1. App launches
2. Redux Persist rehydrates state
3. Cached data loaded from AsyncStorage
4. Fresh data fetched in background
5. UI updated with latest data

##  Design Decisions

### UI/UX:
- **Clean, minimalist design** focusing on content
- **Consistent spacing** using design tokens
- **Readable typography** with proper hierarchy
- **Intuitive navigation** with clear back actions
- **Loading states** for better user feedback
- **Empty states** with helpful messages

### Accessibility:
- Semantic component naming
- Proper text hierarchy
- Touch target sizes (44px minimum)
- Color contrast ratios

##  Testing Considerations

While tests aren't included, here's the testing strategy:

### Unit Tests:
- Utility functions (helpers.ts)
- Redux reducers and actions
- Custom hooks

### Integration Tests:
- API client
- Redux thunks
- Component interactions

### E2E Tests:
- User flows (browse → details → profile)
- Search functionality
- Pagination

##  Future Improvements

### Short Term:
1. **Offline Mode Indicator**: Show when using cached data
2. **Pull-to-Refresh Animation**: Custom refresh indicator
3. **Skeleton Loaders**: Better loading experience
4. **Image Caching**: If images are added
5. **Error Boundaries**: Graceful error handling

### Medium Term:
1. **Unit Tests**: Jest + React Native Testing Library
2. **E2E Tests**: Detox for automated testing
3. **CI/CD**: Automated builds and deployments
4. **Analytics**: Track user behavior
5. **Crash Reporting**: Sentry or similar

### Long Term:
1. **Dark Mode**: Theme switching
2. **Localization**: Multi-language support
3. **Push Notifications**: Real-time updates
4. **Offline-First**: Full offline functionality
5. **Advanced Filtering**: Multiple filter options

##  Known Limitations

1. **UI Design**: Functional but basic - focused on code quality
2. **No Images**: JSONPlaceholder doesn't provide post images
3. **Limited Filtering**: Only search, no advanced filters
4. **No Authentication**: Public API, no user auth
5. **No Caching Strategy**: Simple cache, could be more sophisticated



---
