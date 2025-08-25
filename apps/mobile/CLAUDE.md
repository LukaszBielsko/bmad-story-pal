# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### From Mobile App Directory (apps/mobile)

- `npm run dev` or `expo start` - Start the development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run in web browser
- `npm run build` - Export production build
- `npm run lint` - Run ESLint for code quality checks

### From Monorepo Root

- `npm run mobile` - Start mobile development server
- `npm run mobile:ios` - Run mobile app on iOS simulator
- `npm run mobile:android` - Run mobile app on Android device/emulator

## Architecture

### Routing System

Uses **Expo Router** with file-based routing and typed routes enabled:

- `app/_layout.tsx` - Root layout with Stack navigator
- `app/(tabs)/` - Tab-based navigation group
- `app/(tabs)/_layout.tsx` - Tab layout with bottom tabs
- `app/(tabs)/index.tsx` - Stories screen (home)
- `app/(tabs)/library.tsx` - Story library
- `app/(tabs)/profile.tsx` - User profile management
- `app/(tabs)/about.tsx` - About screen
- `app/modals/` - Modal screens for profile creation and story completion
- `app/story/[theme].tsx` - Dynamic story reading interface

### State Management

Uses **Zustand** with three main stores:

- `stores/appStore.ts` - App-wide settings, first launch, haptics
- `stores/profileStore.ts` - User profile management
- `stores/storyStore.ts` - Story progress, templates, and state

### Styling Approach

- **NativeWind/Tailwind CSS** for styling (not React Native StyleSheet)
- Custom theme colors in `tailwind.config.js`:
  - Primary: #8E44FF
  - Accent: #FF4EDD
  - Background: #F5F5FA
  - Text colors defined
- Global styles in `global.css`

### Key Components

- `components/Button.tsx` - Custom button component
- `components/StoryCard.tsx` - Story preview cards
- `components/StoryReader.tsx` - Story reading interface
- `components/ProfileCard.tsx` - User profile display
- `components/ChoiceButton.tsx` - Interactive story choices
- `components/LoadingSpinner.tsx` - Loading states

### Data Layer

- `data/storyTemplates.ts` - Story content and branching logic
- `data/constants.ts` - App constants
- `utils/storage.ts` - AsyncStorage utilities
- `utils/haptics.ts` - Haptic feedback utilities
- `utils/validation.ts` - Form validation

## Technology Stack

### Core Framework

- React Native 0.79.5 with React 19.0.0
- Expo SDK 53 with new architecture enabled
- TypeScript with strict mode

### Navigation & UI

- `expo-router` - File-based routing with typed routes
- `@expo/vector-icons` - Icon library (Ionicons)
- `expo-linear-gradient` - Gradient backgrounds
- `expo-haptics` - Tactile feedback

### State & Storage

- `zustand` - Lightweight state management
- `@react-native-async-storage/async-storage` - Persistent storage

### Development Tools

- `nativewind` & `tailwindcss` - Utility-first styling
- `eslint-config-expo` - Linting configuration

### Future Integration

- `@tanstack/react-query` - Server state management (for backend integration)
- `react-native-webview` - Web content display

## Configuration

### TypeScript

- Extends `expo/tsconfig.base`
- Path alias `@/*` maps to app root
- Strict mode enabled

### Expo Configuration (`app.json`)

- App name: "StoryPal"
- New architecture enabled
- Typed routes experiment enabled
- Portrait orientation only
- Edge-to-edge on Android

### Run expo on your mobile

- open Expo Go on your Iphone
- run nrd in the apps/mobile
- select project in the app

#### Component Patterns

- Use NativeWind classes, not StyleSheet
- Implement haptic feedback for interactions
- Handle loading states consistently
- Follow existing naming conventions
