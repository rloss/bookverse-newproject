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
  const [bookScope, setBookScope] = useState<'private' | 'shared'>('private')
  const [pinned, setPinned] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!title || !content) return setError('제목과 본문은 필수입니다.')

    if (context === 'announcement' && !groupId) {
      return setError('공지 글은 그룹을 선택해야 합니다.')
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
        context,
        type,
        title,
        content,
        group_id: groupId || null,
        book_id: bookId || null,
        book_scope: bookScope, // ✅ 여기가 핵심 수정
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
          <select value={bookScope} onChange={e => setBookScope(e.target.value as 'private' | 'shared')}>
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
