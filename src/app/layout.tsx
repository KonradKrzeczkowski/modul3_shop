import "./globals.css";
import Footer from "./footer";
import Header from "./header";

export const metadata = {
  title: 'Shop',
  description: 'My Shop App',
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className="flex flex-col min-h-screen">
      <Header/>
      
        <main className="flex-grow px-[40px]">{children}
      
        </main>
        <Footer /> 
      </body>


    </html>
  );
}
