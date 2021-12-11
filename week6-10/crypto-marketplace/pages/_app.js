import "../styles/globals.css";
import Link from "next/link";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <nav className="border-b p-6 flex flex-row justify-between items-center">
        <Link href="/" passHref>
          <a className="text-4xl font-bold text-green-500 hover:underline">
            Crypto-Kickstarter
          </a>
        </Link>
        <div className="flex mt-4">
          <Link href="/create-project" passHref>
            <a className="mr-4 text-green-500 hover:underline">
              Start a Project Fund
            </a>
          </Link>
          <Link href="/my-projects" passHref>
            <a className="mr-4 text-green-500 hover:underline">
              My Project Funds
            </a>
          </Link>
          <Link href="/creator-dashboard" passHref>
            <a className="mr-4 text-green-500 hover:underline">
              Creator Dashboard
            </a>
          </Link>
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
