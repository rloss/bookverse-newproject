'use client'
import Link from 'next/link'

export default function Topbar() {
  return (
    <header className="w-full h-header bg-white border-b shadow-sm px-6 py-3 flex items-center justify-between font-sans">
      <div className="flex items-center gap-8 text-base text-gray-700">
        <Link href="/" className="text-brand font-bold text-xl">
          Bookverse
        </Link>
        <Link href="/">홈</Link>
        <Link href="/groups">그룹 탐색</Link>
        <Link href="/my/groups">내 그룹</Link>
        <Link href="/my">마이페이지</Link>
        <Link href="/my/settings">설정</Link>
      </div>
    </header>
  )
}
