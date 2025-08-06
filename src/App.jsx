import { Toaster } from "sonner";
import Timer from "./pages/Timer"

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Toaster position="top-center"/>
      <Timer />
      
    </div>
  )

}

export default App
