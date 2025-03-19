import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full px-6 py-12 md:px-12">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* Logo and Copyright Section */}
          <div className="space-y-6 md:col-span-6">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6" />
              <h2 className="text-xl font-semibold">HydraNode</h2>
            </div>

            <p className="text-sm text-gray-400">
              © 2024 HydraNode. All Rights Reserved.
            </p>

            <p className="max-w-md text-sm text-gray-400">
              Experience the future of exam preparation with HydraNode&apos;s
              advanced AI technology. Get realistic practice, instant feedback,
              and personalized learning paths.
            </p>
          </div>

          <div className="space-y-4 md:col-span-3">
            <h3 className="text-xl font-medium text-primary">Company</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="#"
                className="text-sm text-gray-400 transition-colors hover:text-white"
              >
                Product
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-400 transition-colors hover:text-white"
              >
                Pricing
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-400 transition-colors hover:text-white"
              >
                Contact
              </Link>
            </nav>
          </div>

          <div className="space-y-4 md:col-span-3">
            <h3 className="text-xl font-medium text-primary">Legal</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="#"
                className="text-sm text-gray-400 transition-colors hover:text-white"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-400 transition-colors hover:text-white"
              >
                Cookie Policy
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-400 transition-colors hover:text-white"
              >
                Terms of Service
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
