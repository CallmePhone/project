import { useUser } from "@clerk/nextjs";

export default function Footer() {
  const { user } = useUser();

  return (
    <footer className="text-black border-gray-700 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-500">Solutions</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-400 transition">Marketing</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Analytics</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Automation</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Commerce</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Insights</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-500">Support</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-400 transition">Submit ticket</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Documentation</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Guides</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-500">Company</h3>
          <ul className="space-y-2">
            <li><a href="/about" className="hover:text-blue-400 transition">About</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Blog</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Jobs</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Press</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-500">Legal</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-400 transition">Terms of service</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Privacy policy</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">License</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-6 py-4 text-end text-sm text-gray-400">
        © 2025 แผนกเทคนิคคอมพิวเตอร์ซอฟต์แวร์
      </div>
    </footer>
  );
}
