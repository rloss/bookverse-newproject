'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function RightSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <aside className={`transition-all duration-300 ${open ? 'w-sidebar' : 'w-10'} bg-gray-50 border-l shadow-sm h-full`}>
      <div className="flex justify-end p-2">
        <button
          className="text-sm text-gray-600 hover:text-brand"
          onClick={() => setOpen(prev => !prev)}
        >
          {open ? '→' : '←'}
        </button>
      </div>

      {open && (
        <div className="p-4 text-sm space-y-6 font-sans text-gray-700">
          <section>
            <h3 className="font-semibold text-gray-800 mb-2">📌 최근 쓴 글</h3>
            <ul className="list-disc ml-5 space-y-1">
              <li>
                <Link href="/my/posts" className="hover:text-brand">『1984』 감상문</Link>
              </li>
              <li>
                <Link href="/groups/abc123/posts" className="hover:text-brand">자본주의와 인간성</Link>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-gray-800 mb-2">👥 참여 중인 그룹</h3>
            <ul className="list-disc ml-5 space-y-1">
              <li><Link href="/groups/abc123" className="hover:text-brand">문학토론클럽</Link></li>
              <li><Link href="/groups/xyz789" className="hover:text-brand">심리학 스터디</Link></li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-gray-800 mb-2">📍 고정글</h3>
            <ul className="list-disc ml-5 space-y-1">
              <li>『죽음에 관하여』 요약</li>
            </ul>
          </section>
        </div>
      )}
    </aside>
  )
}


