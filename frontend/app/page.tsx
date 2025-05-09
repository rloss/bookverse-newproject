'use client'

import { useEffect, useState } from 'react'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    setIsLoggedIn(!!token)
  }, [])

  return (
    <div className="space-y-12">
      {/* 헤더 영역 */}
      <section className="space-y-2">
        <h1 className="text-4xl font-bold text-blue-700">📚 Bookverse</h1>
        <p className="text-lg text-gray-600">
          모두의 독서 공간, 오늘도 함께 읽어요.
        </p>
      </section>

      {/* 인기 글 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">🔥 인기 글</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold">인기 글 제목 {item}</h3>
              <p className="text-sm text-gray-500 mt-1">간단한 요약이 들어갑니다.</p>
            </div>
          ))}
        </div>
      </section>

      {/* 내가 속한 그룹 글 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">🧑‍🤝‍🧑 내가 속한 그룹 글</h2>
        <div className="bg-white rounded-lg shadow-sm p-4">
          {isLoggedIn ? (
            <p className="text-gray-600">그룹별 최근 게시글이 표시됩니다.</p>
          ) : (
            <p className="text-gray-400 italic">로그인하면 내가 속한 그룹의 글을 볼 수 있어요.</p>
          )}
        </div>
      </section>

      {/* 이번 주 일정 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">📅 이번 주 일정</h2>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-gray-600">그룹 모임이나 독서 마감일 등이 여기에 표시됩니다.</p>
        </div>
      </section>
    </div>
  )
}
