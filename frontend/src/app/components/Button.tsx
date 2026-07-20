import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

export function Button({ text, to }: { text: string, to: string }) {
  return (
    <div className="w-full mt-10 flex justify-center text-md">
      <Link to={to} className="flex justify-center items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full bg-secondary text-white hover:bg-secondary/80 transition-all duration-200">
        {text}
        <ArrowRight size={20} />
      </Link>
    </div>
  )
}