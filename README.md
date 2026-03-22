# Naph Tasker

A task management SPA built with React, TypeScript, Redux Toolkit, and MUI. This is a fully client-side, mock-backend application designed to demonstrate a production-style frontend architecture including authentication flows, optimistic updates, token refresh, and component decomposition patterns.

---

## Getting Started

```bash
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

**Demo credentials:**
```
Username: admin
Password: password123
```

---

## App Navigation

### Login Page (`/login`)

- Enter the demo credentials above and click **Sign in** (or press `Enter`).
- The demo credentials are also displayed at the bottom of the login card for convenience.
- Field validation fires on submit — both fields are required.
- A server error (simulated 15% of the time) shows a generic error message; invalid credentials show a specific one.
- Once authenticated, you are automatically redirected to `/items`.

### Items Page (`/items`)

This is the main workspace. It is protected — unauthenticated users are redirected to `/login`.

#### Header

- **Search bar**: Filter items by name in real time. Press `Ctrl+K` to focus the search input. The banner above the table reflects the filtered count ("X items found") vs. the total ("X items").
- **Add Item**: Creates a new editable row at the top of the table. Only one unsaved item can exist at a time (the button is disabled while a new item is pending).
- **Sign out**: Clears the session and returns to the login page.

#### Selection Banner

Always visible above the table. Shows two states:

- **No selection**: Displays the current item count (or filtered count when searching).
- **Items selected**: Shows a count pill, a status dropdown, an **Update** button (applies the chosen status to all selected items), and a **Delete** button (deletes all selected items). Both operations optimistically update the UI and revert on failure.

#### Table

| Column | Behaviour |
|---|---|
| **Checkbox** | Select individual rows. The header checkbox selects/deselects all. |
| **Name** | Click to edit inline. Press `Enter` or click the checkmark to save. Click away to cancel. |
| **Status** | Dropdown: Open → In Progress → Done. Changes save immediately. |
| **Priority** | Dropdown: P1 (highest) → P5 (lowest). Changes save immediately. |
| **Updated** | Read-only timestamp of the last change. |
| **Actions** | Trash icon — deletes the row optimistically. |

New items appear at the top of the list as an editable row. They must be confirmed via `Enter` or the checkmark before they are persisted.

#### Empty States

- **No items**: Shown when the list is empty. Includes a CTA button to add the first item.
- **No matches**: Shown when a search returns zero results. Prompts the user to adjust the search.

#### Token Refresh Info Footer

At the bottom of the page there is a collapsible "About token refresh" panel explaining the access token / session token behaviour. It can be dismissed for the session (persisted to `sessionStorage`).

---

## Architecture

### Folder Structure

```
src/
├── api/
│   ├── client.ts              # In-memory token store + refresh interceptor
│   └── mock.ts                # Simulated backend (localStorage persistence)
├── components/
│   ├── AppHeader.tsx
│   ├── TaskerButton.tsx
│   ├── TaskerDropdown.tsx
│   └── tasker-table/          # Generic, column-driven table
│       ├── TaskerTable.tsx
│       ├── TaskerTableHead.tsx
│       ├── TaskerTableRow.tsx
│       ├── types.ts
│       └── index.ts
├── hooks/
│   └── use-save-item.ts       # Item form state (new item + field edits)
├── icons/                     # SVG icon system via vite-plugin-svgr
├── lang/
│   └── en.ts                  # All user-facing strings in one place
├── pages/
│   ├── LoginPage.tsx
│   ├── ItemsPage.tsx
│   └── items-page/
│       ├── ItemsViewHeader.tsx
│       ├── ItemsTable.tsx
│       ├── ItemsSelectionBanner.tsx
│       ├── ItemsInfoFooter.tsx
│       ├── columns.tsx
│       ├── items-table-cells/  # One file per column cell
│       └── empty-state/        # DefaultEmptyState + SearchEmptyState
├── providers/
│   └── toast/                 # Thin wrapper around toast notifications
├── router/
│   └── AppRouter.tsx          # Routes + ProtectedRoute guard
├── store/
│   ├── actions/               # Async thunks (auth + items)
│   ├── slices/                # Reducers
│   ├── states/                # Initial state + state type definitions
│   └── selectors/             # Memoised selectors
├── types/                     # Shared domain types (Item, Status, Priority, …)
└── utils/
    ├── item.helpers.ts
    ├── priority.helpers.ts
    ├── status.helpers.ts
    └── style.helpers.ts        # Shared MUI sx objects
```

---

### Architecture Decision Notes

#### Mock API & Token Strategy

The app has no real backend. `src/api/mock.ts` simulates one using `localStorage` for data persistence and in-memory variables for session state. It intentionally introduces:

- **200–600 ms random delay** on every request to simulate network latency.
- **15% random 500 error rate** to demonstrate error handling and optimistic rollback.

Two-token model (mirrors common production patterns):

- **Access token** — short-lived (30 s). Automatically refreshed by `apiClient` on any 401 response without user interaction.
- **Session token** — longer-lived (5 min). Used only for refreshing the access token. Once it expires the user must log in again.

The refresh is handled inside `src/api/client.ts` via a request queue — concurrent requests that arrive during a refresh are held and replayed after the new token is obtained, preventing duplicate refresh calls.

#### Optimistic Updates

All write operations (create, update, delete — single and batch) apply changes to the Redux store immediately before the API call resolves. If the call fails, the previous state is restored and an error toast is shown. This keeps the UI feeling instant while correctly handling failures.

#### Input Lag Prevention

Editable name cells keep their value in **local component state** and only push to the Redux store on save (Enter / checkmark). An earlier design called `dispatch` on every keystroke, which caused the entire table to re-render on each character typed. The current design isolates re-renders to the single cell being edited.

#### Generic Table Component

`TaskerTable` is column-driven: callers pass a `columns` array where each entry declares a `key`, `header`, optional `width`, and a `renderCell` function. This keeps the table component free of domain knowledge and reusable across any entity type. The `emptyState` prop accepts any `ReactNode`, rendered spanning all columns inside the table body so the sticky header remains visible above it.

Table height is capped at 525 px via `maxHeight` on `TableContainer` with `stickyHeader` on the MUI `Table`. This means the table never resizes when the selection banner appears or disappears — only the body scrolls.

#### Shared Style Helpers (`utils/style.helpers.ts`)

Repeated MUI `sx` objects that appear in two or more components are extracted into named exports to avoid drift between visually identical elements:

| Export | Used by |
|---|---|
| `formLabelStyles` | `LoginForm` |
| `formHelperStyles` | `LoginForm` |
| `gradientButtonStyles.indigo` | `LoginForm`, `ItemsSelectionBanner`, `DefaultEmptyState` |
| `gradientButtonStyles.danger` | `ItemsSelectionBanner` |
| `checkboxStyles` | `TaskerTableHead`, `TaskerTableRow` |
| `dropdownPillStyles` | `StatusCell`, `PriorityCell` |
| `emptyStateStyles` | `DefaultEmptyState`, `SearchEmptyState` |

#### Language / String Management

All user-facing strings live in `src/lang/en.ts` under a structured object. Components import the `lang` constant and reference the section they need (`lang.login`, `lang.items`, etc.). Dynamic strings (counts, plurals) are plain functions rather than i18n library constructs, keeping the setup lightweight while still centralising all copy in one file.

#### Routing & Auth Guard

React Router v6. The `ProtectedRoute` component reads `isAuthenticated` from the Redux store and redirects to `/login` if false. Auth state is not persisted across page refreshes — tokens are in-memory only, so a refresh requires re-login by design.

#### State Shape

- **Auth slice**: `{ isAuthenticated, isLoggingIn, error }`
- **Items slice**: RTK `EntityAdapter` normalised state (`{ ids, entities }`) plus `{ isFetching, savingIds, error }`. `savingIds` tracks which item IDs are currently mid-request so each row can show its own saving state independently of others.

---

## Tech Stack

| Layer | Library |
|---|---|
| UI framework | React 18 |
| Language | TypeScript |
| Component library | MUI v7 |
| State management | Redux Toolkit |
| Routing | React Router v6 |
| Build tool | Vite |
| Icons | vite-plugin-svgr (inline SVG) |
| Notifications | Custom toast provider |
| Data persistence | `localStorage` (mock backend) |
