'use client'

import Link from 'next/link'

export default function Topbar() {
  return (
    <header className="w-full bg-white shadow-md px-6 py-3 flex items-center justify-between fixed top-0 left-0 z-50">
      <div className="flex items-center gap-8 text-lg font-medium">
        <Link href="/" className="text-blue-600 font-bold text-2xl">
          Bookverse
        </Link>
        <nav className="hidden md:flex gap-6 text-gray-700">
          <Link href="/">홈</Link>
          <Link href="/groups">Browse</Link>
          <Link href="/my/groups">My Groups</Link>
          <Link href="/my">My Page</Link>
          <Link href="/my/settings">Settings</Link>
        </nav>
      </div>
    </header>
  )
}

