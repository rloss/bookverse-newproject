'use client'

import { useEffect, useState } from 'react'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    setIsLoggedIn(!!token)
  }, [])

  return (
    <div className="w-full max-w-5xl mx-auto space-y-12">
      {/* 헤드라인 */}
      <section className="space-y-2">
        <h1 className="text-4xl font-extrabold text-blue-700">📚 Bookverse</h1>
        <p className="text-lg text-gray-600">
          독서를 중심으로 연결되는 사람들. 함께 읽고, 나누고, 성장하세요.
        </p>
      </section>

      {/* 인기 글 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">🔥 인기 글</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="p-4 bg-white rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="text-lg font-bold">인기 글 제목 {item}</h3>
              <p className="text-sm text-gray-500 mt-1">간단한 요약이 들어갑니다.</p>
            </div>
          ))}
        </div>
      </section>

      {/* 내가 속한 그룹 글 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">🧑‍🤝‍🧑 내가 속한 그룹 글</h2>
        <div className="bg-white rounded-lg shadow p-4">
          {isLoggedIn ? (
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>『사피엔스』에 대한 토론 정리</li>
              <li>『호모 데우스』 발제 요약</li>
            </ul>
          ) : (
            <p className="text-gray-400 italic">로그인하면 내가 속한 그룹의 게시글을 볼 수 있어요.</p>
          )}
        </div>
      </section>

      {/* 이번 주 일정 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">📅 이번 주 일정</h2>
        <div className="bg-white rounded-lg shadow p-4">
          {isLoggedIn ? (
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>5/11 (토) - 철학 모임: 『죽음이란 무엇인가』</li>
              <li>5/14 (화) - 소설 클럽: 『무진기행』 발표</li>
            </ul>
          ) : (
            <p className="text-gray-400 italic">로그인하면 일정이 여기에 표시됩니다.</p>
          )}
        </div>
      </section>
    </div>
  )
}
