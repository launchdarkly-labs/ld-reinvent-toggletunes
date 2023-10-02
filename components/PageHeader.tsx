import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const PageHeader = () => {
  return (
    <div className="relative z-10 py-4 px-6 flex justify-between">
      <Link
        href="/"
        aria-label="go back to home page"
        className="bg-zinc-900 rounded-full inline-flex justify-center items-center h-8 w-8"
      >
        <ChevronLeft className="h-4 w-4 -ml-0.5" />
      </Link>
      
      
    </div>
  );
};

export default PageHeader;
