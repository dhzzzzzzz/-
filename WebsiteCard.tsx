import Link from 'next/link'
import { Website } from '@/lib/supabase'

interface WebsiteCardProps {
  website: Website
}

export default function WebsiteCard({ website }: WebsiteCardProps) {
  return (
    <div className="website-card">
      <div className="card-header">
        <div className="card-icon">{website.icon || '🔗'}</div>
        <h3 className="card-title">{website.name}</h3>
      </div>
      <p className="card-description">{website.description || '暂无描述'}</p>
      <div className="card-footer">
        <span className="card-category">{website.category}</span>
        <Link 
          href={website.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="visit-btn"
        >
          访问 →
        </Link>
      </div>
    </div>
  )
}

