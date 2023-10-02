import KeyboardNavigation from "@/components/KeyboardNavigation";
import PageHeader from "@/components/PageHeader";
import SideBar from "@/components/Sidebar";
import { Html, Head, Main, NextScript } from "next/document";


export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="dark">
        <main className="relative h-screen p-2 gap-2 flex items-stretch">
          <div className="w-[350px] flex-col hidden lg:flex overflow-y-auto">
            <SideBar />
          </div>
          <div className="rounded-lg bg-zinc-900 flex-1 mx-auto overflow-y-auto">
            <Main />
            <NextScript />
          </div>
        </main>
      </body>
    </Html>
  );
}
