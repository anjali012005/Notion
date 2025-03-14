// import type { Metadata } from "next";
// import "./globals.css";
// import { ClerkProvider } from "@clerk/nextjs";
// import Header from "@/components/Header";
// import Sidebar from "@/components/Sidebar";
// import { Toaster } from "@/components/ui/sonner";

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <ClerkProvider>
//       <html lang="en">
//         <body>
//           <Header />

//           <div className="layout-div ">
//             <Sidebar />
//             <div className="children flex-1 p-4 bg-gray-100 overflow-y-auto">{children}</div>
//           </div>

//           <Toaster position="top-center" />
//         </body>
//       </html>
//     </ClerkProvider>
//   );
// }


import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <Header />

          <div className="layout-div">
            <Sidebar />
            <div className="children flex-1 p-4 bg-gray-100 overflow-y-auto">
              {children}
            </div>
          </div>

          <Toaster position="top-center" />
        </ClerkProvider>
      </body>
    </html>
  );
}
