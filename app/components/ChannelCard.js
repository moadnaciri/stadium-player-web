'use client'
export default function ChannelCard({ channel, active, isFav, onPlay, onToggleFav }) {
  const initial = (channel.name || '?').trim()[0]?.toUpperCase() || '?'
  return (
    <button
      onClick={onPlay}
      className={`group flex items-center gap-3 rounded-xl border p-2.5 text-left transition hover:border-brand-500/50 ${
        active ? 'border-brand-500 bg-brand-500/10' : 'border-white/10 bg-white/[0.03]'
      }`}
    >
      {channel.logo ? (
        <img src={channel.logo} alt="" className="h-11 w-11 shrink-0 rounded-lg object-cover" loading="lazy" onError={(e) => (e.currentTarget.style.visibility = 'hidden')} />
      ) : (
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500/40 to-brand-700/40 font-bold text-white">
          {initial}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-white">{channel.name}</span>
        {channel.group && <span className="block truncate text-xs text-slate-500">{channel.group}</span>}
      </span>
      <span
        onClick={(e) => {
          e.stopPropagation()
          onToggleFav()
        }}
        className="px-1.5 text-lg"
        role="button"
        aria-label="favorite"
      >
        <span className={isFav ? 'text-gold' : 'text-ink-600 group-hover:text-slate-500'}>{isFav ? '★' : '☆'}</span>
      </span>
    </button>
  )
}
