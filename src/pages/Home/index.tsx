import { PaginationBox } from "@/components/PaginationBox"
import UsersTable from "@/pages/Home/components/UsersTable"
import UsersToolbar from "./components/UsersToolbar"

const Home = () => {
  return (
    <div className="">
      <h1 className="mb-8 text-center text-3xl font-bold">API CRUD Demo</h1>

      <UsersToolbar />
      <section className="flex flex-col gap-10">
        <div className="max-h-160 overflow-y-scroll">
        <UsersTable />
        </div>
        <PaginationBox />
      </section>
    </div>
  )
}

export default Home

