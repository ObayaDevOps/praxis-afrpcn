import { Html, Head, Main, NextScript } from "next/document";
import theme from '../styles/theme';


export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
        <Head>
        <meta name="description" content="Afropocene StudioLab Webpage" />
        <link rel="icon" href="../public/images/icon/uganda.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap" 
        rel="stylesheet" />
        </Head>      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
