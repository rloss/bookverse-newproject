'use client'
import Link from 'next/link'

export default function Topbar() {
  return (
    <header className="w-full bg-white shadow px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-8 text-lg font-medium">
        <Link href="/" className="text-blue-600 font-bold text-xl">
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
