import { ChevronLeft, ChevronRight, XIcon } from "lucide-react";
import { useRouter } from "next/router";

const PageHeader = () => {
  const router = useRouter();
  return (
    <div className="relative z-10 py-4 px-6 flex" onClick={() => router.back()}>
      <button
        aria-label="go back to home page"
        className="inline-flex justify-center items-center h-8 w-8"
      >
        <div className="ml-4 flex">
          <ChevronLeft className="h-10 w-10 text-white" />
          <ChevronRight className="h-10 w-10 text-white " />
        </div>

        <div className="absolute right-5">
          <XIcon className="h-10 w-10 text-white" />
        </div>
      </button>
    </div>
  );
};

export default PageHeader;
