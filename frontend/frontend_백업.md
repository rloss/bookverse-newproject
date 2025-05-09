# 📁 프로젝트 구조

```
├── 📄 .env.production
├── 📁 app
│   ├── 📁 books
│   │   ├── 📁 [bookId]
│   │   │   └── 📄 page.tsx
│   │   └── 📄 page.tsx
│   ├── 📁 error
│   │   └── 📄 not-found.tsx
│   ├── 📁 groups
│   │   ├── 📁 [groupId]
│   │   │   ├── 📁 books
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 calendar
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 community
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 members
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 my
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📄 page.tsx
│   │   │   ├── 📁 posts
│   │   │   │   └── 📄 page.tsx
│   │   │   └── 📁 settings
│   │   │       └── 📄 page.tsx
│   │   └── 📄 page.tsx
│   ├── 📄 layout.tsx
│   ├── 📁 login
│   │   └── 📄 page.tsx
│   ├── 📁 my
│   │   ├── 📁 books
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 groups
│   │   │   └── 📄 page.tsx
│   │   ├── 📄 page.tsx
│   │   ├── 📁 posts
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 settings
│   │   │   └── 📄 page.tsx
│   │   └── 📁 stats
│   │       └── 📄 page.tsx
│   ├── 📄 page.tsx
│   ├── 📁 signup
│   │   └── 📄 page.tsx
│   └── 📁 write
│       └── 📄 page.tsx
├── 📁 components
│   ├── 📁 auth
│   ├── 📁 book
│   ├── 📁 group
│   ├── 📁 layout
│   │   ├── 📄 Sidebar.tsx
│   │   └── 📄 Topbar.tsx
│   ├── 📁 post
│   └── 📁 ui
├── 📄 frontend_백업.md
├── 📁 lib
│   ├── 📁 api
│   │   ├── 📄 books.ts
│   │   ├── 📄 groups.ts
│   │   ├── 📄 posts.ts
│   │   └── 📄 users.ts
│   ├── 📄 auth.ts
│   └── 📄 utils.ts
├── 📄 next.config.js
├── 📄 package.json
├── 📄 postcss.config.js
├── 📁 public
│   └── 📄 logo.svg
├── 📁 styles
│   └── 📄 globals.css
├── 📄 tailwind.config.ts
└── 📄 tsconfig.json
```

## 📄 `.env.production`

```
NEXT_PUBLIC_API_URL=https://bookverse-backend.onrender.com
NODE_VERSION=18.17.1
PORT=3000
```

## 📄 `frontend_백업.md`

```markdown

```

## 📄 `next.config.js`

```javascript
module.exports = { reactStrictMode: true };
```

## 📄 `package.json`

```json
{
  "name": "bookverse-frontend",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start -p $PORT"
  },
  "dependencies": {
    "next": "14.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "axios": "^1.6.8"
  },
  "devDependencies": {
    "@types/node": "22.15.14",
    "@types/react": "19.1.3",
    "autoprefixer": "^10.4.13",
    "postcss": "^8.4.21",
    "tailwindcss": "^3.3.2",
    "typescript": "^5.0.0"
  }
}

```

## 📄 `postcss.config.js`

```javascript
module.exports = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  };
  
```

## 📄 `tailwind.config.ts`

```typescript
// Tailwind config
```

## 📄 `tsconfig.json`

```json
{ "compilerOptions": { "target": "esnext" } }
```

## 📄 `app\layout.tsx`

```
import './globals.css'
import Topbar from '../components/layout/Topbar'
import RightSidebar from '../components/layout/RightSidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="flex flex-col h-screen">
        <Topbar />
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
          <RightSidebar />
        </div>
      </body>
    </html>
  )
}


```

## 📄 `app\page.tsx`

```
'use client'

import { useEffect, useState } from 'react'
import RightSidebar from '../components/layout/RightSidebar'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    setIsLoggedIn(!!token)
  }, [])

  return (
    <div className="flex w-full h-full bg-gray-50 text-gray-800">
      <main className="flex-1 p-10 space-y-10 max-w-5xl mx-auto">
        <section className="space-y-2">
          <h1 className="text-4xl font-bold text-blue-700">📚 Bookverse</h1>
          <p className="text-lg text-gray-600">
            모두의 독서 공간, 오늘도 함께 읽어요.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">🔥 인기 글</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="p-4 bg-white rounded shadow hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold">인기 글 제목 {item}</h3>
                <p className="text-sm text-gray-500 mt-1">간단한 요약이 들어갑니다.</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">🧑‍🤝‍🧑 내가 속한 그룹 글</h2>
          <div className="bg-white rounded shadow p-4">
            {isLoggedIn ? (
              <p className="text-gray-600">그룹별 최근 게시글이 표시됩니다.</p>
            ) : (
              <p className="text-gray-400 italic">로그인하면 내가 속한 그룹의 글을 볼 수 있어요.</p>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">📅 이번 주 일정</h2>
          <div className="bg-white rounded shadow p-4">
            <p className="text-gray-600">그룹 모임이나 독서 마감일 등이 여기에 표시됩니다.</p>
          </div>
        </section>
      </main>

      <RightSidebar />
    </div>
  )
}

```

## 📄 `app\books\page.tsx`

```

```

## 📄 `app\books\[bookId]\page.tsx`

```

```

## 📄 `app\error\not-found.tsx`

```

```

## 📄 `app\groups\page.tsx`

```

```

## 📄 `app\groups\[groupId]\page.tsx`

```

```

## 📄 `app\groups\[groupId]\books\page.tsx`

```

```

## 📄 `app\groups\[groupId]\calendar\page.tsx`

```

```

## 📄 `app\groups\[groupId]\community\page.tsx`

```

```

## 📄 `app\groups\[groupId]\members\page.tsx`

```

```

## 📄 `app\groups\[groupId]\my\page.tsx`

```

```

## 📄 `app\groups\[groupId]\posts\page.tsx`

```

```

## 📄 `app\groups\[groupId]\settings\page.tsx`

```

```

## 📄 `app\login\page.tsx`

```

```

## 📄 `app\my\page.tsx`

```

```

## 📄 `app\my\books\page.tsx`

```

```

## 📄 `app\my\groups\page.tsx`

```

```

## 📄 `app\my\posts\page.tsx`

```

```

## 📄 `app\my\settings\page.tsx`

```

```

## 📄 `app\my\stats\page.tsx`

```

```

## 📄 `app\signup\page.tsx`

```

```

## 📄 `app\write\page.tsx`

```
'use client'
import { useState } from 'react'
import axios from 'axios'

export default function WritePage() {
  const [context, setContext] = useState('review')
  const [type, setType] = useState('note')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [groupId, setGroupId] = useState('')
  const [bookId, setBookId] = useState('')
  const [bookScope, setBookScope] = useState('private')
  const [pinned, setPinned] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!title || !content) return setError('제목과 본문은 필수입니다.')

    if (context === 'announcement' && !groupId) {
      return setError('공지 글은 그룹을 선택해야 합니다.')
    }

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
        context,
        type,
        title,
        content,
        group_id: groupId || null,
        book_id: bookId || null,
        book_scope,
        pinned
      })
      alert('글이 작성되었습니다!')
      window.location.href = `/groups/${groupId || 'my'}/posts`
    } catch (err: any) {
      setError(err.response?.data?.detail || '에러가 발생했습니다.')
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">글쓰기</h1>

      <div className="space-y-2">
        <label>카테고리</label>
        <select value={context} onChange={e => setContext(e.target.value)}>
          <option value="review">감상문</option>
          <option value="community">커뮤니티</option>
          <option value="announcement">공지</option>
        </select>
      </div>

      <div className="space-y-2">
        <label>글 유형</label>
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="note">노트</option>
          <option value="quote">인용</option>
          <option value="discussion">토론</option>
          <option value="free">자유</option>
        </select>
      </div>

      {context !== 'review' && (
        <div className="space-y-2">
          <label>그룹 ID</label>
          <input value={groupId} onChange={e => setGroupId(e.target.value)} />
        </div>
      )}

      {context === 'review' && (
        <div className="space-y-2">
          <label>도서 ID</label>
          <input value={bookId} onChange={e => setBookId(e.target.value)} />
          <select value={bookScope} onChange={e => setBookScope(e.target.value)}>
            <option value="private">개인 도서</option>
            <option value="shared">공통 도서</option>
          </select>
        </div>
      )}

      <div className="space-y-2">
        <label>제목</label>
        <input value={title} onChange={e => setTitle(e.target.value)} />
      </div>

      <div className="space-y-2">
        <label>본문</label>
        <textarea value={content} onChange={e => setContent(e.target.value)} />
      </div>

      <div className="flex items-center space-x-2">
        <label>고정글</label>
        <input type="checkbox" checked={pinned} onChange={e => setPinned(e.target.checked)} />
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">
        작성하기
      </button>
    </div>
  )
}

```

## 📄 `components\layout\Sidebar.tsx`

```
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

```

## 📄 `components\layout\Topbar.tsx`

```
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

```

## 📄 `lib\auth.ts`

```typescript

```

## 📄 `lib\utils.ts`

```typescript

```

## 📄 `lib\api\books.ts`

```typescript

```

## 📄 `lib\api\groups.ts`

```typescript

```

## 📄 `lib\api\posts.ts`

```typescript

```

## 📄 `lib\api\users.ts`

```typescript

```

## 📄 `public\logo.svg`

```

```

## 📄 `styles\globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

