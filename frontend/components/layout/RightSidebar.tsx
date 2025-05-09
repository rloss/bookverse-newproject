'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function RightSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <aside className={`transition-all duration-300 ${open ? 'w-72' : 'w-10'} bg-gray-100 border-l shadow h-full relative`}>
      <button
        onClick={() => setOpen(!open)}
        className="absolute -left-4 top-4 bg-white border rounded-full shadow px-2 py-1 text-sm z-10"
      >
        {open ? '→' : '←'}
      </button>

      {open && (
        <div className="p-4 text-sm space-y-6">
          <section>
            <h3 className="text-md font-bold text-gray-700 mb-2">🕓 최근 활동</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>
                <Link href="/my/posts" className="hover:underline">감상문: 『1984』</Link>
              </li>
              <li>
                <Link href="/groups/abc123/posts" className="hover:underline">토론: 자본주의와 인간성</Link>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-md font-bold text-gray-700 mb-2">👥 참여 그룹</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>
                <Link href="/groups/abc123" className="hover:underline">문학토론클럽</Link>
              </li>
              <li>
                <Link href="/groups/xyz789" className="hover:underline">심리학 스터디</Link>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-md font-bold text-gray-700 mb-2">📌 고정글</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>『죽음에 관하여』 요약</li>
            </ul>
          </section>
        </div>
      )}
    </aside>
  )
}

