import './globals.css';

export const metadata = {
  title: 'Alemdar Restaurant — Spin & Win',
  description: 'Spin & Win promotional experience',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-gradient-to-b from-[#fff8f0] to-[#ffe5c4] text-[#3b2c1a]">
          <div className="max-w-xl mx-auto p-6">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}