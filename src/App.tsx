import { Toaster } from "sonner"
import UserContextProvider from "./context/UserContextProvider"
import Home from "./pages/Home/index"

export function App() {
  return (
    <div className="mx-auto my-2 max-h-screen max-w-5xl rounded-3xl border px-4 py-10 sm:px-6 lg:px-8">
      <Toaster position="top-center" />
      <UserContextProvider>
        <Home />
      </UserContextProvider>
    </div>
  )
}

export default App
