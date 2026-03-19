import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import UserContextProvider from "./context/UserContextProvider.tsx"
import { Toaster } from "@/components/ui/sonner"

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <UserContextProvider>
      <App />
      <Toaster position="top-center" />
    </UserContextProvider>
  </ThemeProvider>
)
