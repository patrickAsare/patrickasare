import "./globals.css";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title:
    "Patrick Asare - Software engineer, builder of platforms, tech enthusiast",
  description:
    "A blog by a passionate Software Engineer, platform builder and observer",
  keywords: [
    "Software Engineer",
    "Platform Development",
    "Tech Enthusiast",
    "Programming",
    "Technology Blog",
    "Coding Tips",
    "Software Development",
  ],
};

const modeScript = `
  let darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  updateMode()
  darkModeMediaQuery.addEventListener('change', updateModeWithoutTransitions)
  window.addEventListener('storage', updateModeWithoutTransitions)

  function updateMode() {
    let isSystemDarkMode = darkModeMediaQuery.matches
    let isDarkMode = window.localStorage.isDarkMode === 'true' || (!('isDarkMode' in window.localStorage) && isSystemDarkMode)

    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    if (isDarkMode === isSystemDarkMode) {
      delete window.localStorage.isDarkMode
    }
  }

  function disableTransitionsTemporarily() {
    document.documentElement.classList.add('[&_*]:!transition-none')
    window.setTimeout(() => {
      document.documentElement.classList.remove('[&_*]:!transition-none')
    }, 0)
  }

  function updateModeWithoutTransitions() {
    disableTransitionsTemporarily()
    updateMode()
  }
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full antialiased" lang="en">
      <body
        className={`flex h-full flex-col bg-zinc-50 dark:bg-black ${inter.className}`}
      >
        <div className="fixed inset-0 flex justify-center sm:px-8">
          <div className="flex w-full max-w-7xl lg:px-8">
            <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
          </div>
        </div>
        <div className="relative">
          <Header />
          <Script id="mode-toggle">{modeScript}</Script>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
