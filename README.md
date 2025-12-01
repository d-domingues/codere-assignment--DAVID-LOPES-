# TV Shows Application

A modern Angular + Ionic application that displays TV shows from the TVMaze API with search, filtering, and detailed views.

## 🏗️ Architecture & Design Decisions

### Framework Choice

- **Angular 21**: Latest version with modern features like signals, new control flow, signal forms and zoneless change deytection
- **Ionic 8.7.6**: For mobile-first UI components and responsive design
- **TypeScript**: Strict typing for better code quality and developer experience

### Architecture & Design Patterns

1. **Standalone Components**: Modern Angular approach without NgModules, eliminating boilerplate and improving tree-shaking
2. **Signal-based State**: Reactive state management with computed values for better performance than traditional observables
3. **Resource Management**: Angular's new `httpResource` for efficient API calls
4. **Lazy Loading**: Route-based code splitting for optimal performance and faster initial load times
5. **Service Layer**: Clean API abstraction with the TvMazeApiService for separation of concerns
6. **Type Safety**: Comprehensive TypeScript models for all API responses ensuring compile-time safety
7. **Inline Template Strategy**: Components under 100 lines use inline templates to maintain component cohesion and reduce file system overhead during development
8. **Component Composition**: Reusable components with clear separation of concerns and single responsibility principle

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.x or higher
- **NPM**: v8.x or higher
- **Angular CLI**: Latest version

### Installation & Setup

1. **Clone the repository and install dependencies:**

   ```bash
   git clone https://github.com/d-domingues/codere-assignment--DAVID-LOPES-.git
   cd codere-assignment
   npm install
   ```

2. **Development server:**

   ```bash
   npm start
   # Application runs on http://localhost:4200
   ```

3. **Run tests:**

   ```bash
   npm test
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 📱 Features

### Core Functionality

- **Dashboard**: Popular TV shows (8.0+ rating) displayed in horizontal scrollable lists
- **Genre Lists**: Shows categorized by genres (Drama, Comedy, Sports, etc.)
- **Search**: Real-time search with debouncing for optimal performance
- **Filtering**: Filter by genre and minimum rating
- **Details**: Comprehensive show information with image, summary, and metadata
- **Navigation**: Smooth routing between list and detail views

### Technical Features

- **Responsive Design**: Mobile-first approach with tablet/desktop optimizations
- **Loading States**: Proper loading indicators and error handling
- **Performance**: Lazy loading, OnPush change detection, and optimized rendering
- **Accessibility**: Semantic HTML and ARIA support through Ionic components

## 🧪 Testing

The application includes comprehensive unit tests:

- **Components**: All UI components with behavior testing
- **Services**: API service with HTTP mocking
- **Models**: Type definitions and validation
- **Pages**: Route components and navigation

Run tests with: `npm test`

## 📱 Mobile Support

The application is built mobile-first with:

- **Capacitor**: Ready for native mobile deployment
- **Responsive Design**: Optimized for phones, tablets, and desktop
- **Touch-friendly**: Ionic components with proper touch targets

### Mobile Development

```bash
# Add mobile platform (Android/iOS)
npx cap add android
npx cap add ios

# Run on device
npm run live  # Custom script for Android development
```

## 🛠️ Technology Stack

- **Frontend**: Angular 21, Ionic 8.7.6, TypeScript
- **State Management**: Angular Signals
- **HTTP Client**: Angular HttpClient with resource management
- **Testing**: Jasmine, Karma
- **Build**: Angular CLI, Capacitor
- **Styling**: SCSS, Ionic CSS Variables

## 📁 Project Structure

```
src/
├── app/
│   ├── components/         # Reusable UI components
│   ├── models/             # TypeScript type definitions
│   ├── pages/              # Route components
│   ├── services/           # Business logic and API calls
│   └── app.ts              # Root component
├── main.ts                 # Application bootstrap
└── styles.css              # Global styles
```

## 🎯 Performance Optimizations

- **Lazy Loading**: Route-based code splitting
- **Zoneless Change Detection**: Optimized rendering cycles
- **Resource Management**: Efficient API call handling with caching
- **Debounced Search**: Prevents excessive API calls

## 🎨 Design Philosophy

- **Clean UI**: Minimalist design focused on content
- **Mobile-First**: Optimized for touch interfaces
- **Consistent**: Ionic design system for cohesive experience
- **Accessible**: Proper contrast, focus management, and semantic markup
