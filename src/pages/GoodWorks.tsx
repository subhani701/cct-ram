import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import { Reveal } from '../components/Reveal'
import { Heart, Share2 } from 'lucide-react'

type StoryCategory = 'Blood Drives' | 'Fundraisers' | 'Volunteering' | 'Milestones'
type FilterCat = 'All' | StoryCategory

interface Story {
  id: number
  category: StoryCategory
  emoji: string
  image: string
  text: string
  author: string
  org: string
  date: string
  likes: number
  gradient: string
  coverH: number
}

const GRADIENTS = [
  'linear-gradient(135deg, #FEF3D7, #FFE49A)',
  'linear-gradient(135deg, #FDEEF2, #F5C6D0)',
  'linear-gradient(135deg, #EDFFF4, #C6F0D8)',
  'linear-gradient(135deg, #EFF6FF, #C6D8F5)',
]

const COVER_HEIGHTS = [140, 170, 200]

const ALL_STORIES: Story[] = [
  {
    id: 1, category: 'Blood Drives', emoji: '🩸',
    image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80',
    text: '352 units collected at our Tirupati birthday drive! 400+ donors showed up',
    author: '', org: 'Mega Star Fans Tirupati', date: '2 days ago', likes: 234,
    gradient: GRADIENTS[0], coverH: COVER_HEIGHTS[2],
  },
  {
    id: 2, category: 'Blood Drives', emoji: '🩸',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
    text: 'Campus drive at JNTU reached 200 donors for the first time!',
    author: '', org: 'JNTU Blood Drive Team', date: '5 days ago', likes: 189,
    gradient: GRADIENTS[3], coverH: COVER_HEIGHTS[0],
  },
  {
    id: 3, category: 'Fundraisers', emoji: '💛',
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80',
    text: 'Surgery funded in 72 hours! Thanks to 47 donors',
    author: 'Dr Anand', org: 'Guntur Hospital', date: '1 week ago', likes: 412,
    gradient: GRADIENTS[1], coverH: COVER_HEIGHTS[1],
  },
  {
    id: 4, category: 'Volunteering', emoji: '🌱',
    image: 'https://images.unsplash.com/photo-1593113598332-cd59a93e9f5b?auto=format&fit=crop&w=800&q=80',
    text: '15 first-time donors at our Kakinada chapter event',
    author: '', org: 'CCT Kakinada Chapter', date: '3 days ago', likes: 98,
    gradient: GRADIENTS[2], coverH: COVER_HEIGHTS[0],
  },
  {
    id: 5, category: 'Milestones', emoji: '🏅',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80',
    text: '\u20B95 lakh raised for platelet separator in just 10 days',
    author: '', org: 'NIMS Hyderabad', date: '2 weeks ago', likes: 567,
    gradient: GRADIENTS[0], coverH: COVER_HEIGHTS[2],
  },
  {
    id: 6, category: 'Volunteering', emoji: '🌱',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
    text: 'Blood type awareness camp at Warangal school',
    author: '', org: 'Warangal Youth Club', date: '4 days ago', likes: 76,
    gradient: GRADIENTS[2], coverH: COVER_HEIGHTS[1],
  },
  {
    id: 7, category: 'Milestones', emoji: '🏅',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
    text: 'Our 100th blood drive! Grateful to every single donor',
    author: '', org: 'CCT Vijayawada', date: '1 week ago', likes: 321,
    gradient: GRADIENTS[1], coverH: COVER_HEIGHTS[0],
  },
  {
    id: 8, category: 'Blood Drives', emoji: '🩸',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80',
    text: 'Emergency O- arranged within 2 hours through CCT platform',
    author: 'Sunita K', org: 'Hyderabad', date: '6 days ago', likes: 445,
    gradient: GRADIENTS[3], coverH: COVER_HEIGHTS[2],
  },
  // Extra stories for Load More
  {
    id: 9, category: 'Volunteering', emoji: '🌱',
    image: 'https://images.unsplash.com/photo-1469571486292-b53601010376?auto=format&fit=crop&w=800&q=80',
    text: 'Trained 25 new blood drive coordinators this month across 8 districts',
    author: '', org: 'CCT Training Wing', date: '10 days ago', likes: 142,
    gradient: GRADIENTS[0], coverH: COVER_HEIGHTS[1],
  },
  {
    id: 10, category: 'Milestones', emoji: '🏅',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
    text: 'Crossed 500 members in our Hyderabad volunteer network!',
    author: '', org: 'CCT Hyderabad', date: '2 weeks ago', likes: 289,
    gradient: GRADIENTS[3], coverH: COVER_HEIGHTS[2],
  },
  {
    id: 11, category: 'Blood Drives', emoji: '🩸',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=800&q=80',
    text: 'Railway employees\u2019 blood drive collected 180 units in a single day',
    author: '', org: 'SCR Employees\u2019 Union', date: '3 weeks ago', likes: 167,
    gradient: GRADIENTS[1], coverH: COVER_HEIGHTS[0],
  },
  {
    id: 12, category: 'Fundraisers', emoji: '💛',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80',
    text: 'Corporate matching challenge raised \u20B98 lakh for blood bank refrigeration',
    author: '', org: 'MegaCorp CSR Team', date: '3 weeks ago', likes: 334,
    gradient: GRADIENTS[2], coverH: COVER_HEIGHTS[1],
  },
]

const FILTERS: { label: string; value: FilterCat }[] = [
  { label: 'All', value: 'All' },
  { label: '\u{1FA78} Blood Drives', value: 'Blood Drives' },
  { label: '\u{1F49B} Fundraisers', value: 'Fundraisers' },
  { label: '\u{1F331} Volunteering', value: 'Volunteering' },
  { label: '\u{1F3C5} Milestones', value: 'Milestones' },
]

const FALLBACK_COLORS: Record<StoryCategory, { from: string; to: string }> = {
  'Blood Drives': { from: '#fee2e2', to: '#fecaca' },
  Fundraisers: { from: '#fef3c7', to: '#fde68a' },
  Volunteering: { from: '#dcfce7', to: '#bbf7d0' },
  Milestones: { from: '#dbeafe', to: '#bfdbfe' },
}

const getFallbackImage = (story: Story) => {
  const colors = FALLBACK_COLORS[story.category]
  const safeTitle = story.category.replace(/&/g, '&amp;')
  const safeEmoji = story.emoji.replace(/&/g, '&amp;')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="420" viewBox="0 0 800 420">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${colors.from}" />
        <stop offset="100%" stop-color="${colors.to}" />
      </linearGradient>
    </defs>
    <rect width="800" height="420" fill="url(#bg)" />
    <text x="400" y="170" text-anchor="middle" font-size="72">${safeEmoji}</text>
    <text x="400" y="250" text-anchor="middle" font-size="38" font-family="DM Sans, Arial, sans-serif" fill="#1f2937">${safeTitle}</text>
  </svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

export default function GoodWorks() {
  const [filter, setFilter] = useState<FilterCat>('All')
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set())
  const [failedImageIds, setFailedImageIds] = useState<Set<number>>(new Set())
  const [visibleCount, setVisibleCount] = useState(12)
  const [showModal, setShowModal] = useState(false)
  const [modalForm, setModalForm] = useState({ name: '', org: '', text: '', photoName: '' })
  const [modalSubmitted, setModalSubmitted] = useState(false)
  const [pulsingId, setPulsingId] = useState<number | null>(null)
  const storyPhotoInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (sessionStorage.getItem('cct:open-share') === '1') {
      sessionStorage.removeItem('cct:open-share')
      setShowModal(true)
    }
  }, [])

  const filtered = filter === 'All'
    ? ALL_STORIES
    : ALL_STORIES.filter(s => s.category === filter)

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  const toggleLike = (id: number) => {
    setPulsingId(id)
    setTimeout(() => setPulsingId(null), 300)
    setLikedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const trimmedName = modalForm.name.trim()
  const trimmedStory = modalForm.text.trim()
  const canSubmitStory = trimmedName.length > 0 && trimmedStory.length > 0

  const handleStoryPhotoPick = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    setModalForm(f => ({ ...f, photoName: selectedFile?.name ?? '' }))
  }

  const handleModalSubmit = () => {
    if (canSubmitStory) {
      setModalSubmitted(true)
      setTimeout(() => {
        setShowModal(false)
        setModalSubmitted(false)
        setModalForm({ name: '', org: '', text: '', photoName: '' })
      }, 3000)
    }
  }

  return (
    <div className="gw-page" style={{ paddingTop: 'var(--nav-h)' }}>
      {/* Header */}
      <header className="gw-header">
        <Reveal>
          <h1 className="gw-heading">Stories</h1>
          <p className="gw-subtitle">Stories of impact from the CCT community</p>
          <div className="gw-header-stats">
            <div className="gw-header-stat">
              <span className="gw-header-stat-value">{ALL_STORIES.length}+</span>
              <span className="gw-header-stat-label">verified updates</span>
            </div>
            <div className="gw-header-stat-divider" />
            <div className="gw-header-stat">
              <span className="gw-header-stat-value">50k+</span>
              <span className="gw-header-stat-label">community reactions</span>
            </div>
          </div>
          <button className="gw-share-btn" onClick={() => setShowModal(true)}>
            Share Your Story &rarr;
          </button>
        </Reveal>
      </header>

      {/* Filter Pills */}
      <div className="gw-filters">
        {FILTERS.map(f => (
          <button
            key={f.value}
            className={`gw-filter ${filter === f.value ? 'on' : ''}`}
            onClick={() => { setFilter(f.value); setVisibleCount(12) }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div className="gw-masonry">
        {visible.map((story, i) => {
          const liked = likedIds.has(story.id)
          const likeCount = liked ? story.likes + 1 : story.likes
          const pulsing = pulsingId === story.id && liked
          const isImageFailed = failedImageIds.has(story.id)
          const imageSrc = isImageFailed ? getFallbackImage(story) : story.image
          return (
            <Reveal key={story.id} delayClass={(['d1', 'd2', 'd3'] as const)[i % 3]}>
              <div className="gw-card">
                <div
                  className="gw-card-cover"
                  style={{ background: story.gradient }}
                >
                  <img
                    className="gw-card-cover-img"
                    src={imageSrc}
                    alt={story.category}
                    loading="lazy"
                    onError={() => {
                      setFailedImageIds(prev => {
                        if (prev.has(story.id)) return prev
                        const next = new Set(prev)
                        next.add(story.id)
                        return next
                      })
                    }}
                  />
                  <span className="gw-card-cover-emoji">{story.emoji}</span>
                </div>
                <div className="gw-card-body">
                  <p className="gw-card-text">{story.text}</p>
                  <div className="gw-card-divider" />
                  <div className="gw-card-author">
                    <span className="gw-card-name">
                      {story.author ? `${story.author}, ` : ''}{story.org}
                    </span>
                    <span className="gw-card-date">Published {story.date}</span>
                  </div>
                  <div className="gw-card-actions">
                    <button
                      className={`gw-like-btn ${liked ? 'liked' : ''} ${pulsing ? 'pulse' : ''}`}
                      onClick={() => toggleLike(story.id)}
                    >
                      <Heart className="gw-action-icon" />
                      {likeCount.toLocaleString('en-IN')}
                    </button>
                    <button className="gw-share-icon" title="Share">
                      <Share2 className="gw-action-icon" />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>

      {visible.length === 0 && (
        <div className="gw-empty"><p>No stories match this filter</p></div>
      )}

      {hasMore && (
        <div className="gw-load-more-wrap">
          <button className="gw-load-more" onClick={() => setVisibleCount(c => c + 6)}>
            Load More Stories &darr;
          </button>
        </div>
      )}

      {/* Submission Modal */}
      {showModal && (
        <div className="gw-modal-overlay" onClick={() => { if (!modalSubmitted) setShowModal(false) }}>
          <div className="gw-modal" onClick={e => e.stopPropagation()}>
            <button className="gw-modal-close" onClick={() => setShowModal(false)}>&times;</button>
            {modalSubmitted ? (
              <div className="gw-modal-success">
                <div className="gw-modal-check">&#10003;</div>
                <h3>Thank you!</h3>
                <p>Your story will be reviewed and published within 24 hours</p>
              </div>
            ) : (
              <>
                <h2 className="gw-modal-title">Share Your Story</h2>
                <div className="gw-modal-form">
                  <input
                    className="gw-modal-input"
                    placeholder="Name *"
                    value={modalForm.name}
                    onChange={e => setModalForm(f => ({ ...f, name: e.target.value }))}
                  />
                  <input
                    className="gw-modal-input"
                    placeholder="Organization (optional)"
                    value={modalForm.org}
                    onChange={e => setModalForm(f => ({ ...f, org: e.target.value }))}
                  />
                  <div className="gw-textarea-wrap">
                    <textarea
                      className="gw-modal-textarea"
                      placeholder="Tell us your story..."
                      rows={5}
                      maxLength={500}
                      value={modalForm.text}
                      onChange={e => setModalForm(f => ({ ...f, text: e.target.value }))}
                    />
                    <span className="gw-char-count">{modalForm.text.length}/500</span>
                  </div>
                  <input
                    ref={storyPhotoInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    style={{ display: 'none' }}
                    onChange={handleStoryPhotoPick}
                  />
                  <button
                    type="button"
                    className="gw-upload-placeholder"
                    onClick={() => storyPhotoInputRef.current?.click()}
                  >
                    {modalForm.photoName ? `📷 ${modalForm.photoName}` : '📷 Add a photo'}
                  </button>
                 
                  <button
                    className="gw-modal-submit"
                    onClick={handleModalSubmit}
                    disabled={!canSubmitStory}
                  >
                    Share My Story &rarr;
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
