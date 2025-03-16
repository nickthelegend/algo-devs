import Providers from "@/app/chat/providers";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/toaster";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <Header/>
      <body className="flex min-h-full flex-col bg-gray-100 text-gray-900 antialiased">
        {children}
        
        <Toaster />
      </body>
    </Providers>
  );
}
