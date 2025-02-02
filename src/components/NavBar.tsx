import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="bg-white rounded-lg shadow-gray-300 shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-evenly items-center h-16">
          <div className="hidden md:flex items-center relative space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-indigo-600 text-2xl"
            >
              Agregar producto
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
