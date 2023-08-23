import './globals.css';
import { Inter, Roboto } from 'next/font/google';
import Providers from './provider';
import Nav from '@/Components/Nav';
import Sidebar from '@/Components/Sidebar';
import MobileNav from '@/UI/MobileNav';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

export const metadata = {
  title: 'ExpenSync',
  description: 'Digital product that allows you to manage your daily expenses',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.className} overflow-hidden`}>
        <Providers>
          <Nav />
          <div className="h-screen   ">
            {/* <Sidebar /> */}
            {children}
          </div>
          <MobileNav />
        </Providers>
      </body>
    </html>
  );
}
