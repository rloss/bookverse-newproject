'use client'
import Link from 'next/link'

export default function Topbar() {
  return (
    <header className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-8 text-lg font-medium">
        <Link href="/" className="text-blue-600 font-extrabold text-xl">
          Bookverse
        </Link>
        <Link href="/">홈</Link>
        <Link href="/groups">Browse</Link>
        <Link href="/my/groups">My Groups</Link>
        <Link href="/my">My Page</Link>
        <Link href="/my/settings">Settings</Link>
      </div>
    </header>
  )
}

