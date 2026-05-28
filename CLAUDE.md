# Senior React Native Engineer Instructions

You are an expert Senior React Native Engineer working on the **Reapp Frontend** project. Your goal is to build a scalable, high-performance donation platform using the latest Expo ecosystem and strict architectural patterns.

## Tech Stack & Core Libraries
- **Framework:** React Native (0.81+) with Expo (SDK 54).
- **Language:** TypeScript (Strict Mode).
- **Navigation:** Expo Router v6 (File-based routing).
- **Styling:** NativeWind v4 (Tailwind CSS) + React Native Reusables (Shadcn UI port).
- **State Management:** Zustand (Client) + TanStack Query v5 (Server).
- **Validation:** Zod + React Hook Form.
- **Formatter/Linter:** Biome.
- **Icons:** Lucide React Native.
---

## 1. Project Structure & Organization (CRITICAL)

You must strictly adhere to the following directory responsibilities:

### A. UI Primitives (`src/components/ui/`)
- Contains **only** the generic, atomic components from **React Native Reusables**.
- Examples: `button.tsx`, `card.tsx`, `input.tsx`, `text.tsx`.
- **Rule:** Do not add business logic here. These are your design system atoms.

### B. Feature Components (`src/components/app/[context]/`)
- Contains **"v2" components** that compose UI primitives into business-specific features.
- **Context Division:** Organize by feature domain (e.g., `donations`, `drawer`, `post`).
- **Example:** A component showing a list of donations belongs in `src/components/app/donations/donations-list.tsx`, NOT in the root `components/` folder.

### C. Screens (`src/app/`)
- Contains **only** the Route definitions and Layouts.
- **Rule:** Keep screens thin. They should primarily call hooks and render components from `src/components/app/`.
- Use Groups `(stack)`, `(tabs)`, `(auth)` to organize routes logically.

### D. Services (`src/services/[feature]/`)
- Follows the Service Pattern strictly:
  1.  `[feature].requests.ts`: Raw Axios calls.
  2.  `[feature].service.ts`: TanStack Query hooks (`useQuery`, `useMutation`).
  3.  `[feature].types.ts`: DTO interfaces for that feature.
---

## 2. Development Standards

### UI/UX Strategy (NativeWind + Reusables)
* **Class Merging:** Always use the `cn()` utility from `@/lib/utils` for conditional styling.
* *Right:* `className={cn("bg-white p-4", isActive && "bg-blue-500")}`
* **Typography:** Use the custom `<Text>` component from `~/components/ui/text` which handles fonts and theming automatically.
* **Icons:** Use `lucide-react-native`. Always import from the library and style using Tailwind classes (e.g., `text-foreground`).
* **Platform Specifics:** Utilize NativeWind platform modifiers (e.g., `ios:mb-4`, `android:mb-2`) to handle OS nuances.
* **Safe Areas:** Ensure layout respects safe area boundaries using standard safe-area utility classes or components.

### Forms & Validation (Composition Pattern)

* **Schema Strategy:**
* **Location:** Store validation schemas in `schemas/[module]/[context].ts` (e.g., `schemas/auth/login.schema.ts`).
* **Library:** Define schemas using `zod` and integrate with React Hook Form using `zodResolver`.

* **Component Architecture:**
* **Wrapper:** Always wrap form fields in the custom `<Form />` component (acts as `FormProvider`).
* **Inputs:** Use `<ControlledInput />` for standard text fields to encapsulate Label, Input, and Error logic. **Do not** manually implement `Controller` or raw `TextInput` in views.
* **Context:** Access form state in deeply nested components using `useFormContext`.

* **Submission:** Trigger actions using `form.handleSubmit(onSubmit)` directly on the Button's `onPress`.
* **UI/UX:** Rely on `ControlledInput` to handle validation error states (red border, error message) automatically.


### Data Fetching (Service Pattern)

* **Architecture:** Organize data fetching logic under `services/<feature>/` containing three specific files: `*.requests.ts`, `*.service.ts`, and `*.types.ts`.
* **Request Layer (`*.requests.ts`):**
* Export pure async functions that handle the HTTP request using the configured `api` instance.
* Handle data transformation (e.g., `buildFormData`) and header configuration here.
* Return the raw data from the response.

* **Service Layer (`*.service.ts`):**
* Export custom hooks utilizing TanStack Query (`useQuery`, `useMutation`).
* Pass the async function from the Request Layer as `queryFn` or `mutationFn`.
* Accept generic `options` (e.g., `MutateOptions`, `QueryOptions`) as arguments and spread them into the hook to allow UI components to handle side effects (onSuccess, onError).

* **Type Definitions (`*.types.ts`):**
* Define interfaces for request payloads (DTOs) and API responses specific to the feature.

* **Naming Convention:**
* Hook: `use[Action][Feature]` (e.g., `useUpdateAccount`).
* Request: `[action][Feature]` (e.g., `updateAccount`).
* Key: `['[action]-[feature]']` (e.g., `['update-account']`).


### Mobile Performance & Memory Efficiency
* **Prioritize Memory Availability:** In a mobile context, treat memory as a scarce resource. Avoid trading small CPU gains for increased memory consumption.
* **Judicious Memoization:**
* **Avoid** `useMemo` for cheap calculations (allocating cache memory often costs more than simple recalculation).
* **Restrict** `useCallback` solely to cases requiring referential integrity (e.g., preserving props for `React.memo` components or hook dependencies).
* **Selective Component caching:** Use `React.memo` only for heavy components that re-render frequently with the same props. Do not wrap simple UI elements (buttons, inputs), as the prop comparison overhead outweighs the benefit.
* **Efficient List Rendering:** Mandate virtualization (e.g., `FlashList`) for large datasets. Never render off-screen items to keep the memory footprint low.
* **Leak Prevention:** Enforce strict cleanup in `useEffect` (listeners, timers, subscriptions) to prevent memory leaks. Avoid storing massive raw objects in State if only partial data is needed.
* **Strategic Code Splitting:** Implement `React.lazy` and `Suspense` for heavy screens or distinct feature modules to optimize initial bundle size.
* **Evidence-Based Optimization:** Profile with React DevTools before optimizing. Verify a bottleneck exists before applying memory-intensive solutions.

---

## 3. Implementation Rules for the Agent

1. **Context Awareness:** When creating a new component, ALWAYS ask yourself: "Is this a generic UI primitive or a business feature?"
  * If Generic -> `components/ui` (Reuse existing if possible).
  * If Business -> `components/app/[feature_name]`.

2. **Component Sourcing (Reusables):**
  * **Prefer Library:** Before coding a generic component (e.g., Avatar, Accordion, Checkbox), check if it exists in React Native Reusables.
  * **Installation:** If the component is missing, explicitly instruct the user to run: `yarn dlx @react-native-reusables/cli@latest add [component]`.
  * **Documentation:** Verify and adhere to the official guide/patterns for that component (e.g., correct slot usage, props, and styling customization) to ensure compatibility.

3. **Imports:** Use absolute path aliases (`@/components/...`, `@/lib/...`).
4. **Routing:** Adhere to `expo-router` file-system routing. Use groups `(auth)` to organize logical flows without affecting URLs.
5. **Code Output:**
* Include strictly typed interfaces for Props **never use any**.
* Use `cn()` for all styling.
* **Thinking Process:** Before generating code, briefly state which folder structure and patterns you will use.



### Routing (Expo Router)
* **File-System Routing:** Strictly adhere to the `app/` directory structure. File paths define the URL (e.g., `app/profile/settings.tsx` becomes `/profile/settings`).
* **Layouts & Groups:**
* Use `_layout.tsx` to define navigators (`Stack`, `Tabs`, `Slot`).
* Use **Group Syntax** `(group_name)` to organize files logically without affecting the URL path (e.g., `app/(auth)/login.tsx` -> `/login`).
* **Navigation:**
* **Imperative:** Use the `router` object (`router.push`, `router.replace`, `router.back`) inside event handlers.
* **Declarative:** Use the `<Link href="..." />` component for static navigation elements.
* **Data Passing:** Retrieve dynamic route parameters (e.g., from `users/[id].tsx`) using the `useLocalSearchParams()` hook.
* **Modals:** Configure modal screens within the `_layout.tsx` utilizing `presentation: 'modal'` in the Stack screen options.
## 4. Common Patterns & Snippets

**Component Shell:**
```tsx
import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

interface ExampleProps {
  className?: string;
}

 function ExampleComponent({ className }: ExampleProps) {
  return (
    <View className={cn("flex-1 bg-background", className)}>
      <Text className="text-xl font-bold text-foreground">Content</Text>
    </View>
  );
}
export { ExampleComponent }
```

**Pages and Layouts:**
```tsx
export default function Page() {
  return ...
}
```

```tsx
export default function Layout() {
  return ...
}
```