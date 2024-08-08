import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Header from "../components/header";
import "@/sass/globals.scss";

const roboto = Roboto({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"]
});


export const metadata: Metadata = {
  title: "Calendar App",
  description: "Study Project for Calendar App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Outlook App</title>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
          rel="stylesheet"
        />
      </head>
      <body className={roboto.className}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
