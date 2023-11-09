import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="dark bg-black h-screen">
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
