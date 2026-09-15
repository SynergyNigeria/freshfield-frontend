import Link from 'next/link'

type Props = {
  code?: string | number
  title?: string
  message?: string
}

export default function ErrorPage({ code = '503', title = 'Service Unavailable', message = 'The server is currently unable to handle your request. Please try again later.' }: Props) {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-12">
      <div className="max-w-3xl text-center">
        <div className="flex items-center justify-center">
          <svg width="160" height="160" viewBox="0 0 120 120" className="-mt-6">
            <defs>
              <linearGradient id="g" x1="0" x2="1">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#FFB84D" />
              </linearGradient>
            </defs>

            {/* Head */}
            <circle cx="60" cy="60" r="50" fill="url(#g)" opacity="0.12" />

            {/* Frustrated eyes (animated X) */}
            <g stroke="#FFD700" strokeWidth="4" strokeLinecap="round">
              <line x1="38" y1="46" x2="50" y2="58">
                <animate attributeName="x1" dur="1.2s" values="36;38;36" repeatCount="indefinite" />
                <animate attributeName="x2" dur="1.2s" values="52;50;52" repeatCount="indefinite" />
              </line>
              <line x1="50" y1="46" x2="38" y2="58">
                <animate attributeName="y1" dur="1.2s" values="44;46;44" repeatCount="indefinite" />
                <animate attributeName="y2" dur="1.2s" values="56;58;56" repeatCount="indefinite" />
              </line>

              <line x1="82" y1="46" x2="70" y2="58">
                <animate attributeName="x1" dur="1.2s" values="84;82;84" repeatCount="indefinite" />
                <animate attributeName="x2" dur="1.2s" values="68;70;68" repeatCount="indefinite" />
              </line>
              <line x1="70" y1="46" x2="82" y2="58">
                <animate attributeName="y1" dur="1.2s" values="44;46;44" repeatCount="indefinite" />
                <animate attributeName="y2" dur="1.2s" values="56;58;56" repeatCount="indefinite" />
              </line>
            </g>

            {/* Mouth (shaky) */}
            <path d="M42 80 Q60 90 78 80" stroke="#FFD700" strokeWidth="3" fill="none" strokeLinecap="round">
              <animate attributeName="d" dur="1s" values="M42 80 Q60 90 78 80; M42 78 Q60 92 78 78; M42 80 Q60 90 78 80" repeatCount="indefinite" />
            </path>

            {/* Sweat drop (floating) */}
            <g fill="#FFB84D" opacity="0.9">
              <path d="M92 30 C92 24 86 20 82 24 C78 28 78 34 82 38 C86 42 92 36 92 30" transform="translate(0,0)">
                <animateTransform attributeName="transform" type="translate" values="0 0; 0 -4; 0 0" dur="1.5s" repeatCount="indefinite" />
              </path>
            </g>
          </svg>
        </div>

        <div className="text-7xl sm:text-8xl font-extrabold tracking-tight text-accent mt-2">{code}</div>
        <h1 className="mt-6 text-3xl sm:text-4xl font-bold">{title}</h1>
        <p className="mt-4 text-medium-gray">{message}</p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={() => location.reload()} className="rounded-full bg-accent px-6 py-3 font-semibold text-black hover:brightness-105 transition">Retry</button>
          <Link href="/" className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold hover:border-accent/50">Home</Link>
        </div>

        <p className="mt-6 text-xs text-medium-gray">If the problem persists, contact support at support@freshfield.com</p>
      </div>
    </main>
  )
}
