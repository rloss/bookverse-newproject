'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function RightSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <div className={`transition-all duration-300 ${open ? 'w-64' : 'w-10'} bg-gray-50 border-l shadow h-full`}>
      <div className="flex justify-end p-2">
        <button
          className="text-sm text-gray-600"
          onClick={() => setOpen(prev => !prev)}
        >
          {open ? '→' : '←'}
        </button>
      </div>

      {open && (
        <div className="p-4 text-sm space-y-4">
          <h3 className="text-md font-semibold mb-2">최근 활동</h3>
          
          <div>
            <h4 className="font-medium">최근 쓴 글</h4>
            <ul className="list-disc ml-4 text-gray-700">
              <li>
                <Link href="/my/posts">감상문: 『1984』에 대하여</Link>
              </li>
              <li>
                <Link href="/groups/abc123/posts">토론: 자본주의와 인간성</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium">참여 중인 그룹</h4>
            <ul className="list-disc ml-4 text-gray-700">
              <li><Link href="/groups/abc123">문학토론클럽</Link></li>
              <li><Link href="/groups/xyz789">심리학 스터디</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium">고정글</h4>
            <ul className="list-disc ml-4 text-gray-700">
              <li>『죽음에 관하여』 요약</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
