import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export function Toast() {
  return (
    <div className="flex flex-wrap gap-2">
      
       {toast.info("performing...", {duration : 1000})}
    
    </div>
  )
}
