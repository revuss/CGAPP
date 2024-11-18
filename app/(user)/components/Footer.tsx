import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-gray-50 select-none">
      <div className="w-full mx-auto p-4 md:py-2">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            href="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-bold whitespace-nowrap bg-gradient-to-r from-secondary via-third to-primary bg-clip-text text-transparent">
              CytoGensis
            </span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-xs font-medium text-gray-400 sm:mb-0">
            <li>
              <Link href="/about" className="hover:underline me-4 md:me-6">
                About
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="my-4 border-gray-200 sm:mx-auto border-b-2"></div>
        <span className="block text-sm text-gray-500 sm:text-center ">
          © 2024
          <Link href="/" className="hover:underline">
            CytoGenesis
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
