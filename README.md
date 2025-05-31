
# Mini Dashboard Prototype

A modern, responsive dashboard application built with React, Redux Toolkit, and TypeScript. Features authentication, user profile management, notifications, and a drag-and-drop task list.

## Features

### Authentication
- Login/signup functionality with form validation
- Persistent authentication via localStorage
- Clean, modern auth UI matching the dashboard theme

### Dashboard Components
- **Sales Card**: Displays current sales with growth percentage and mini chart visualization
- **Profile Card**: User profile management with avatar upload and editable fields
- **Notifications Panel**: Interactive notifications with read/unread states
- **Task List**: Drag-and-drop task management with add/remove/toggle functionality

### Technical Features
- Pixel-perfect responsive design
- Redux Toolkit for state management
- TypeScript for type safety
- Drag-and-drop with @dnd-kit
- Component testing with React Testing Library

## Technology Stack

- **Frontend**: React, TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Drag & Drop**: @dnd-kit
- **Testing**: Vitest, React Testing Library
- **Build Tool**: Vite

## Setup & Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mini-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Run tests**
   ```bash
   npm test
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## Architecture Overview

### State Management
The application uses Redux Toolkit with feature-based slices:

- `authSlice`: Manages authentication state and localStorage persistence
- `profileSlice`: Handles user profile data and avatar management
- `notificationsSlice`: Manages notification list and read/unread states
- `tasksSlice`: Handles task CRUD operations and drag-and-drop reordering
- `salesSlice`: Contains sales dashboard data and chart information

### Component Structure
```
src/
├── components/
│   ├── ui/
│   │   └── avatar.tsx            # Avatar component
│   │   └── button.tsx            # Button component
│   │   └── card.tsx              # Card component
│   │   └── checkbox.tsx          # Checkbox component
│   │   └── input.tsx             # Input component
│   └── NotificationsCard.tsx     # Notifications panel layout
│   └── ProfileCard.tsx           # User profile form
│   └── SalesCard.tsx             # Sales visualization card
│   └── TasksCard.tsx             # Drag-and-drop task list
├── store.ts                      # Redux store configuration
├── features                      # Feature-based Redux slices
│   ├── authSlice.ts                  
│   ├── notificationsSlice.ts                  
│   ├── profileSlice.ts                  
│   ├── salesSlice.ts                  
│   ├── tasksSlice.ts                  
├── pages                         # Pages in app
│   ├── AuthScreen.tsx            # Authentication screen including sign in and sign up                  
│   ├── Dashboard.tsx             # Dashboard page   
├── test                          
│   ├── setup.ts                  # Testing setup              
└── __tests__/                    # Component tests
```

## Design Decisions

### Responsive Layout
- Grid-based layout that adapts from 1 column (mobile) to 2 columns (desktop)
- Cards maintain consistent aspect ratios across screen sizes
- Touch-friendly interactions for mobile devices


### Code Quality
- TypeScript for compile-time error prevention
- Comprehensive component documentation
- Modular, reusable component architecture
- Redux for predictable state management

## Testing Strategy

The application includes unit tests for key components:

- **SalesCard**: Snapshot testing and data rendering validation
- **TasksCard**: User interaction testing (add/toggle tasks)
- **Component Integration**: Redux state interaction testing

Run tests with: `npm test`

## Development Guidelines

### Adding New Features
1. Create feature slice in `src/features/`
2. Add slice to store configuration
3. Create components in appropriate directory
4. Write tests for new functionality
5. Update documentation

### State Management Patterns
- Use Redux Toolkit for all global state
- Keep component state local when possible
- Use TypeScript interfaces for type safety
- Follow the "ducks" pattern for slice organization

### Styling Guidelines
- Use Tailwind utility classes for styling
- Maintain design system conventions
- Ensure responsive design principles

## Assumptions & Trade-offs

### Assumptions
- Modern browser support (ES2020+)
- Users have JavaScript enabled
- Network connectivity for initial app load
- Local storage available for auth persistence

### Trade-offs
- **localStorage vs Secure Storage**: Used localStorage for simplicity; production would use secure HTTP-only cookies
- **Mock Data vs API**: Implemented with mock data; real implementation would use REST/GraphQL APIs
- **Simple Auth**: Basic email/password auth; production would include proper validation, password reset, etc.