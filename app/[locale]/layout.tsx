import * as React from "react";

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}) {
  return (
    <html lang={params.locale}>
      <body className={"max-w-5xl mx-auto my-10"}>{children}</body>
    </html>
  );
}
