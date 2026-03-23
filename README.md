# React CRUD Operations with Pagination & Debouncing


## Features

- **User Management:** Add, edit, delete, and search users.
- **Pagination:** Paginate user data with dynamic page size selection.
- **Search:** Real-time search with debounce for performance.
- **Dialogs:** Modal dialogs for adding/editing users and confirming deletions.
- **Toasts:** Success/error notifications for all operations.
- **Loading States:** Spinners and disabled UI during async operations.
- **Dark/Light Theme:** Theme toggling with system preference support.

## Project Structure

- `src/pages/Home/` — Main page, includes toolbar, table, and pagination.
- `src/components/` — Reusable UI components (Button, Dialog, Table, Spinner, etc.).
- `src/context/` — Global state management using React Context.
- `src/api/` — Axios configuration and API hooks for CRUD operations.
- `src/hooks/` — Custom hooks for pagination, debounce, and user logic.
- `src/Types/` — TypeScript types for users and context.
- `public/` — Static assets.

## How Features Are Implemented

### 1. User CRUD Operations
- **API Layer:** All API calls are abstracted in `src/api/useApi.ts` using Axios. The base URL is set in `.env`.
- **Hooks:** `useUsers` (in `src/pages/Home/components/UsersTable/hooks/useUsers.ts`) manages fetching, adding, updating, and deleting users, and handles toast notifications.
- **Context:** `UserContextProvider` provides all user data and actions to the app.

### 2. UI and State Management
- **Table:** Users are displayed in a paginated table (`UsersTable`), with edit and delete actions.
- **Dialogs:** Add/Edit and Delete actions open modal dialogs (`FormDialog`, `ConfirmDeleteDialog`).
- **Form Handling:** Controlled form state and validation in `useForm` hook.
- **Pagination:** `PaginationBox` and `usePagination` handle page navigation and page size.
- **Search:** The toolbar includes a debounced search input, filtering users by name or city.
- **Toasts:** All async actions show success/error toasts using Sonner.
- **Loading:** Spinners and disabled buttons indicate loading states.

### 3. Styling and Theming
- **Tailwind CSS:** Used for all styling, with custom themes in `src/index.css`.
- **shadcn/ui:** Provides accessible, customizable UI primitives.
- **ThemeProvider:** Handles dark/light/system theme switching.

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install

- code by @nkit
