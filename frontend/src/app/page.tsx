"use client";
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) return <div>Loading...</div>

  return (
    user ? (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-var(--navbar-height))]"> 
        <p className='text-center'>You are logged in to the homepage.</p>
        <p className='text-center'>Welcome, {user.username}!</p>
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-var(--navbar-height))]">
        <p className='text-center'>You are not logged in, redirecting...</p>
      </div>
    )
  );
}