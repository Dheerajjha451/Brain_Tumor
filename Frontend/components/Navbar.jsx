"use client"
import { FaUserCircle, FaNewspaper, FaSignOutAlt, FaDashcube, FaVideo } from 'react-icons/fa';
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react";
import { redirect } from 'next/navigation';

export default function Navbar() {
  const { data: session } = useSession();

  const handleLogout = async () => {
    try {
      await signOut();
      localStorage.removeItem('userToken');
      redirect("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 h-full bg-light-background text-black overflow-y-auto w-64 flex flex-col justify-between">
      <div className="py-4 px-6">
        <div className="flex items-center mb-8">
          <FaUserCircle className="text-2xl mr-2" />
          <h2 className="text-xl font-bold mx-2">{session?.user?.name}</h2>
        </div>
        <ul className="space-y-4">
          <li>
            <Link href="/dashboard">
              <button className="flex items-center hover:text-blue-700">
                <FaDashcube className="mr-2" />
                Dashboard
              </button>
            </Link>
          </li>
          <li>
            <Link href="/articles">
              <button className="flex items-center hover:text-blue-700">
                <FaNewspaper className="mr-2" />
                Article
              </button>
            </Link>
          </li>
          <li>
            <Link href="/videocall">
              <button className="flex items-center hover:text-blue-700">
                <FaVideo className="mr-2" />
                VideoCall
              </button>
            </Link>
          </li>
        </ul>
      </div>
      <div className="py-4 px-6 border-t border-stone-900">
        <button className="flex items-center hover:text-blue-700" onClick={handleLogout}>
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </div>
    </nav>
  );
}
