import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap"
        />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
