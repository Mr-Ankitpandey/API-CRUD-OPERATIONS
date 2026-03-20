import { toast } from "sonner"

export function Toast() {
  return (
    <div className="flex flex-wrap gap-2">
      
       {toast.info("Performing...", {duration : 1000})}
    
    </div>
  )
}
