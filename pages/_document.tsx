import KeyboardNavigation from "@/components/KeyboardNavigation";
import PageHeader from "@/components/PageHeader";
import SideBar from "@/components/Sidebar";
import { useFlags } from "launchdarkly-react-client-sdk";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="dark bg-gradient-to-br from-lddblue to-green-400 h-screen">
          <main className="">
            <div className="">
              <Main />
              <NextScript />
            </div>
          </main>
      </body>
    </Html>
  );
}
