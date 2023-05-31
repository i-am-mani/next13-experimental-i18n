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
  const links = [
    {
      name: "Home-en",
      link: "/en",
    },
    {
      name: "Home-da",
      link: "/da",
    },
    {
      name: "Feature-1(en)",
      link: "/en/feature-1",
    },
    {
      name: "Feature-1(da)",
      link: "/da/feature-1",
    },
  ];

  return (
    <html lang={params.locale}>
      <body className={"max-w-5xl mx-auto my-10"}>
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-3 border flex flex-col justify-center items-center gap-y-3 h-[600px]">
            {links.map((link) => {
              return (
                <a
                  href={link.link}
                  key={link.name}
                  className="bg-blue-500 px-4 py-2 rounded-xl text-white w-3/4"
                >
                  {link.name}
                </a>
              );
            })}
          </div>
          <div className="col-span-8">{children}</div>
        </div>
      </body>
    </html>
  );
}
