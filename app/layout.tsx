import "@/app/globals.css";

import { ThemeProvider } from "next-themes";

import { geistSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { jsonLd } from "@/lib/seo";

export { metadata } from "@/lib/seo";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={cn(geistSans.variable, "dark")}
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={cn(geistSans.className, "bg-background antialiased")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
