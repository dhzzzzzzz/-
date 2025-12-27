'use client'

import { useState, useEffect } from 'react'
import { Website } from '@/lib/supabase'
import Link from 'next/link'

export default function AdminPage() {
  const [websites, setWebsites] = useState<Website[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Website | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    category: '',
    description: '',
    icon: '',
  })

  useEffect(() => {
    fetchWebsites()
  }, [])

  async function fetchWebsites() {
    try {
      const response = await fetch('/api/websites')
      const data = await response.json()
      setWebsites(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching websites:', error)
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      const url = editing ? `/api/websites/${editing.id}` : '/api/websites'
      const method = editing ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        await fetchWebsites()
        setEditing(null)
        setFormData({ name: '', url: '', category: '', description: '', icon: '' })
        // 同步到Meilisearch
        await fetch('/api/sync-meilisearch', { method: 'POST' })
      }
    } catch (error) {
      console.error('Error saving website:', error)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('确定要删除这个网站吗？')) return

    try {
      const response = await fetch(`/api/websites/${id}`, { method: 'DELETE' })
      if (response.ok) {
        await fetchWebsites()
        // 同步到Meilisearch
        await fetch('/api/sync-meilisearch', { method: 'POST' })
      }
    } catch (error) {
      console.error('Error deleting website:', error)
    }
  }

  function startEdit(website: Website) {
    setEditing(website)
    setFormData({
      name: website.name,
      url: website.url,
      category: website.category,
      description: website.description || '',
      icon: website.icon || '',
    })
  }

  if (loading) return <div className="container">加载中...</div>

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>后台管理</h1>
        <Link href="/" className="admin-link">返回首页</Link>
      </div>

      <div className="admin-layout">
        <div className="admin-form">
          <h2>{editing ? '编辑网站' : '添加新网站'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>名称</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>URL</label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>分类</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>描述</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="form-group">
              <label>图标 (Emoji)</label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="🛠️"
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editing ? '更新' : '添加'}
              </button>
              {editing && (
                <button type="button" onClick={() => setEditing(null)} className="btn-secondary">
                  取消
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="admin-list">
          <h2>网站列表 ({websites.length})</h2>
          <div className="admin-table">
            <table>
              <thead>
                <tr>
                  <th>图标</th>
                  <th>名称</th>
                  <th>分类</th>
                  <th>URL</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {websites.map((website) => (
                  <tr key={website.id}>
                    <td>{website.icon || '🔗'}</td>
                    <td>{website.name}</td>
                    <td>{website.category}</td>
                    <td>
                      <a href={website.url} target="_blank" rel="noopener noreferrer">
                        {website.url}
                      </a>
                    </td>
                    <td>
                      <button onClick={() => startEdit(website)} className="btn-edit">
                        编辑
                      </button>
                      <button onClick={() => handleDelete(website.id!)} className="btn-delete">
                        删除
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  )
}

