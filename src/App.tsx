import UsersTable from "./components/Table"

export function App() {
  return (
    <div className="mx-auto min-h-screen max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">
        API CRUD Demo
      </h1>

      <section>
        <UsersTable />
      </section>
    </div>
  )
}

export default App
