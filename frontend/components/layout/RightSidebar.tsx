'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function RightSidebar() {
  const [open, setOpen] = useState(true)

  return (
    <div
      className={`transition-all duration-300 ease-in-out ${
        open ? 'w-72' : 'w-12'
      } bg-white border-l shadow-md h-full overflow-hidden`}
    >
      <div className="flex justify-end p-2">
        <button
          className="text-gray-600 text-sm"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? '→' : '←'}
        </button>
      </div>

      {open && (
        <div className="p-4 text-sm space-y-6">
          <div>
            <h4 className="font-semibold mb-2 text-gray-800">최근 쓴 글</h4>
            <ul className="list-disc ml-4 text-gray-600 space-y-1">
              <li>
                <Link href="/my/posts">『1984』에 대하여</Link>
              </li>
              <li>
                <Link href="/groups/abc123/posts">자본주의와 인간성</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-gray-800">참여 중인 그룹</h4>
            <ul className="list-disc ml-4 text-gray-600 space-y-1">
              <li>
                <Link href="/groups/abc123">문학토론클럽</Link>
              </li>
              <li>
                <Link href="/groups/xyz789">심리학 스터디</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-gray-800">고정글</h4>
            <ul className="list-disc ml-4 text-gray-600 space-y-1">
              <li>『죽음에 관하여』 요약</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
