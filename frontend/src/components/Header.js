'use client'
import Link from 'next/link'
import { useAuth } from '../context/AuthContext'

const Header = () => {
  const { user, logoutUser } = useAuth()

  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Your App
        </Link>
        <div>
          <Link href="/" className="mr-4">
            Home
          </Link>
          {user ? (
            <>
              <span className="mr-4">Hello, {user.username}!</span>
              <button onClick={logoutUser} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="mr-4">
                Login
              </Link>
              <Link href="/register" className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header