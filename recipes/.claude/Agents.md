# Development Guidelines

## Web Development Standards

### TypeScript & Svelte 5
- **Always use TypeScript** for type safety and better developer experience
- **Use Svelte 5 exclusively** with the new runes syntax
- **Migrate away from Svelte 4 patterns** like `$:` reactive statements
- **Use runes**: `$state()`, `$derived()`, `$effect()`, `$props()` instead of legacy syntax

### Package Management & Testing
- **Use npm exclusively** - no yarn or other package managers
- **Use Vitest for testing** - preferred over Jest or other testing frameworks
- **Follow npm best practices** for dependency management

### Svelte 5 Runes Examples
```typescript
// ✅ Use this (Svelte 5 runes)
let count = $state(0);
const doubled = $derived(count * 2);
let { user }: { user: User } = $props();

// ❌ Avoid this (Svelte 4 syntax)
let count = 0;
$: doubled = count * 2;
export let user: User;
```

## iOS Development Standards

### SwiftUI & VML
- **Use iOS 26+ syntax exclusively** - always use the newest SwiftUI patterns
- **VML (XML-like SwiftUI)**: All SwiftUI components are written in VML syntax
- **All tag names must be lowercase** - use `navigationstack` not `NavigationStack`, `flowlayout` not `FlowLayout`
- **Modern background syntax**: Use `background(color, in: shape)` not old `background().cornerRadius()`
- **Current navigation**: Use `NavigationStack` not deprecated `NavigationView`

### iOS-Native Design Philosophy
- **Prefer iOS-native patterns** over web 1:1 copies unless explicitly requested
- **Use iOS design patterns**:
  - `SearchableNavigationStack` for search functionality
  - Sheet presentations for filters/modals
  - Toolbar buttons for actions
  - Native iOS list styles and spacing
- **Embrace iOS conventions**: tab views, navigation patterns, visual hierarchy

### VML Examples
```xml
<!-- ✅ Modern iOS syntax with lowercase tags -->
<text modifiers="background(.quaternary, in: .capsule);">Content</text>
<navigationstack>
<searchable text="{searchText}" prompt="Search..." />
<flowlayout spacing="4">

<!-- ❌ Avoid older syntax or incorrect casing -->
<text modifiers="background(.quaternary).cornerRadius(16);">Content</text>
<NavigationStack> <!-- Wrong: should be lowercase -->
<FlowLayout> <!-- Wrong: should be lowercase -->
```

## Shared Architecture

### Business Logic Separation
- **Keep shared logic in `/src/lib/`** for utilities, data models, and business logic
- **Platform-specific UI only**: Keep only UI-specific code in component files
- **Shared modules for**:
  - Data filtering and sorting logic
  - API calls and data fetching
  - Type definitions and interfaces
  - Utility functions
  - State management stores

### Code Organization
```
src/
├── lib/
│   ├── data.ts           # Shared data models
│   ├── filters.ts        # Shared filtering logic
│   ├── utils.ts          # Shared utilities
│   └── stores.ts         # Shared state management
├── components/
│   ├── Component.svelte      # Web version
│   └── Component.swiftui.svelte # iOS VML version
```

## General Principles

1. **Type Safety First**: Use TypeScript interfaces and proper typing
2. **Modern Syntax**: Always use the newest language/framework features
3. **Platform Conventions**: Respect each platform's design patterns
4. **Shared Logic**: Avoid duplicating business logic between platforms
5. **Progressive Enhancement**: Start with core functionality, then add enhancements

## Migration Priorities

When updating existing code:
1. **Svelte 4 → 5 migration** is high priority
2. **iOS syntax updates** to modern patterns
3. **Extract shared logic** from UI components
4. **Improve type safety** with better TypeScript usage