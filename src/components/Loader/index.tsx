import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

export function Loader({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-6 ${className}`}>
      <Button disabled className="text-4xl py-6 px-6 bg-transparent text-black">
        <Spinner data-icon="inline-start" className="size-10 mr-2" />
        {text}
      </Button>
    </div>
  );
}