import Header from "./components/Header"
import { PaginationBox } from "./components/PaginationBox"
import UsersTable from "./components/UsersTable"

export function App() {
  return (
    <div className="mx-auto my-2 min-h-screen max-w-5xl rounded-3xl border px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-center text-3xl font-bold">API CRUD Demo</h1>

      <Header />
      <section className="flex flex-col gap-10">
        <UsersTable />
        <PaginationBox />
      </section>
    </div>
  )
}

export default App
