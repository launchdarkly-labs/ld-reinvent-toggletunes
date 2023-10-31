import { ChevronLeft, ChevronRight, XIcon } from "lucide-react";
import Link from "next/link";

const PageHeader = () => {
  return (
    <div className="relative z-10 py-4 px-6 flex">
      <Link
        href="/"
        aria-label="go back to home page"
        className="inline-flex justify-center items-center h-8 w-8"
      >
        
        <div className="ml-4 flex">
        <ChevronLeft className="h-10 w-10 text-gray-700" />
        <ChevronRight className="h-10 w-10 text-gray-700 " />
        </div>
 
          <div className="absolute right-5">
          <XIcon className="h-10 w-10 text-gray-700" />
        </div>
        
      </Link>
      
      
    </div>
  );
};

export default PageHeader;
