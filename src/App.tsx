import { PaginationBox } from "./components/PaginationBox"
import UsersTable from "./components/UsersTable"

export function App() {
  return (
    <div className="mx-auto min-h-screen max-w-5xl px-4 py-10 sm:px-6 lg:px-8 border rounded-3xl my-2">
      <h1 className="mb-8 text-3xl font-bold text-center">
        API CRUD Demo
      </h1>

      <section className="flex flex-col gap-10">
        <UsersTable />
        <PaginationBox/>
      </section>
    </div>
  )
}

export default App
