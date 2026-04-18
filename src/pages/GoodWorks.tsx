import { useState } from 'react'
import { Reveal } from '../components/Reveal'
import { SiteFooter } from '../components/SiteFooter'

type StoryCategory = 'Blood Drives' | 'Fundraisers' | 'Volunteering' | 'Milestones'
type FilterCat = 'All' | StoryCategory

interface Story {
  id: number
  category: StoryCategory
  emoji: string
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
    text: '352 units collected at our Tirupati birthday drive! 400+ donors showed up',
    author: '', org: 'Mega Star Fans Tirupati', date: '2 days ago', likes: 234,
    gradient: GRADIENTS[0], coverH: COVER_HEIGHTS[2],
  },
  {
    id: 2, category: 'Blood Drives', emoji: '🩸',
    text: 'Campus drive at JNTU reached 200 donors for the first time!',
    author: '', org: 'JNTU Blood Drive Team', date: '5 days ago', likes: 189,
    gradient: GRADIENTS[3], coverH: COVER_HEIGHTS[0],
  },
  {
    id: 3, category: 'Fundraisers', emoji: '💛',
    text: 'Surgery funded in 72 hours! Thanks to 47 donors',
    author: 'Dr Anand', org: 'Guntur Hospital', date: '1 week ago', likes: 412,
    gradient: GRADIENTS[1], coverH: COVER_HEIGHTS[1],
  },
  {
    id: 4, category: 'Volunteering', emoji: '🌱',
    text: '15 first-time donors at our Kakinada chapter event',
    author: '', org: 'CCT Kakinada Chapter', date: '3 days ago', likes: 98,
    gradient: GRADIENTS[2], coverH: COVER_HEIGHTS[0],
  },
  {
    id: 5, category: 'Milestones', emoji: '🏅',
    text: '\u20B95 lakh raised for platelet separator in just 10 days',
    author: '', org: 'NIMS Hyderabad', date: '2 weeks ago', likes: 567,
    gradient: GRADIENTS[0], coverH: COVER_HEIGHTS[2],
  },
  {
    id: 6, category: 'Volunteering', emoji: '🌱',
    text: 'Blood type awareness camp at Warangal school',
    author: '', org: 'Warangal Youth Club', date: '4 days ago', likes: 76,
    gradient: GRADIENTS[2], coverH: COVER_HEIGHTS[1],
  },
  {
    id: 7, category: 'Milestones', emoji: '🏅',
    text: 'Our 100th blood drive! Grateful to every single donor',
    author: '', org: 'CCT Vijayawada', date: '1 week ago', likes: 321,
    gradient: GRADIENTS[1], coverH: COVER_HEIGHTS[0],
  },
  {
    id: 8, category: 'Blood Drives', emoji: '🩸',
    text: 'Emergency O- arranged within 2 hours through CCT platform',
    author: 'Sunita K', org: 'Hyderabad', date: '6 days ago', likes: 445,
    gradient: GRADIENTS[3], coverH: COVER_HEIGHTS[2],
  },
  // Extra stories for Load More
  {
    id: 9, category: 'Volunteering', emoji: '🌱',
    text: 'Trained 25 new blood drive coordinators this month across 8 districts',
    author: '', org: 'CCT Training Wing', date: '10 days ago', likes: 142,
    gradient: GRADIENTS[0], coverH: COVER_HEIGHTS[1],
  },
  {
    id: 10, category: 'Milestones', emoji: '🏅',
    text: 'Crossed 500 members in our Hyderabad volunteer network!',
    author: '', org: 'CCT Hyderabad', date: '2 weeks ago', likes: 289,
    gradient: GRADIENTS[3], coverH: COVER_HEIGHTS[2],
  },
  {
    id: 11, category: 'Blood Drives', emoji: '🩸',
    text: 'Railway employees\u2019 blood drive collected 180 units in a single day',
    author: '', org: 'SCR Employees\u2019 Union', date: '3 weeks ago', likes: 167,
    gradient: GRADIENTS[1], coverH: COVER_HEIGHTS[0],
  },
  {
    id: 12, category: 'Fundraisers', emoji: '💛',
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

export default function GoodWorks() {
  const [filter, setFilter] = useState<FilterCat>('All')
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set())
  const [visibleCount, setVisibleCount] = useState(6)
  const [showModal, setShowModal] = useState(false)
  const [modalForm, setModalForm] = useState({ name: '', org: '', text: '' })
  const [modalSubmitted, setModalSubmitted] = useState(false)
  const [pulsingId, setPulsingId] = useState<number | null>(null)

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

  const handleModalSubmit = () => {
    if (modalForm.name && modalForm.text.length >= 10) {
      setModalSubmitted(true)
      setTimeout(() => {
        setShowModal(false)
        setModalSubmitted(false)
        setModalForm({ name: '', org: '', text: '' })
      }, 3000)
    }
  }

  return (
    <div className="gw-page" style={{ paddingTop: 'var(--nav-h)' }}>
      {/* Header */}
      <header className="gw-header">
        <Reveal>
          <span className="gw-eyebrow">Community</span>
          <h1 className="gw-heading">Stories</h1>
          <p className="gw-subtitle">Stories of impact from the CCT community</p>
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
            onClick={() => { setFilter(f.value); setVisibleCount(6) }}
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
          return (
            <Reveal key={story.id} delayClass={(['d1', 'd2', 'd3'] as const)[i % 3]}>
              <div className="gw-card">
                <div
                  className="gw-card-cover"
                  style={{ background: story.gradient, height: story.coverH }}
                >
                  <span className="gw-card-cover-emoji">{story.emoji}</span>
                </div>
                <div className="gw-card-body">
                  <span className="gw-verified-badge">&#10003; Verified</span>
                  <p className="gw-card-text">{story.text}</p>
                  <div className="gw-card-divider" />
                  <div className="gw-card-author">
                    <span className="gw-card-name">
                      {story.author ? `${story.author}, ` : ''}{story.org}
                    </span>
                    <span className="gw-card-date">{story.date}</span>
                  </div>
                  <div className="gw-card-actions">
                    <button
                      className={`gw-like-btn ${liked ? 'liked' : ''} ${pulsing ? 'pulse' : ''}`}
                      onClick={() => toggleLike(story.id)}
                    >
                      {liked ? '❤️' : '🤍'} {likeCount.toLocaleString('en-IN')}
                    </button>
                    <button className="gw-share-icon" title="Share">
                      ↗
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
                <p className="gw-modal-note">No account needed</p>
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
                  <div className="gw-upload-placeholder">
                    📷 Add a photo
                  </div>
                  <button
                    className="gw-modal-submit"
                    onClick={handleModalSubmit}
                    disabled={!modalForm.name || modalForm.text.length < 10}
                  >
                    Submit for Review &rarr;
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  )
}
