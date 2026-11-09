/* Built-in vector illustrations: crisp at any size, a few KB each, zero image downloads. */
import { photos } from '../data/images'

/* ---------- helpers ---------- */
const rand = (seed) => () => ((seed = (seed * 16807) % 2147483647) / 2147483647)

function Bean({ x, y, s = 1, r = 0, tone = '#4A2C19' }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <ellipse rx="9" ry="6" fill={tone} />
      <path d="M-8 0 C-3 -3 3 3 8 0" stroke="#1E0F07" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <ellipse cx="-2.5" cy="-2.2" rx="3.5" ry="1.4" fill="#fff" opacity=".18" />
    </g>
  )
}

function Pile({ cx, base, w, h, n, seed = 7, s = 1 }) {
  const rnd = rand(seed)
  const tones = ['#3B2314', '#4A2C19', '#5B3720', '#43261A']
  return Array.from({ length: n }, (_, i) => {
    const u = rnd() * 2 - 1
    const top = h * (1 - u * u)
    return <Bean key={i} x={cx + (u * w) / 2} y={base - rnd() * top} r={rnd() * 180} s={s} tone={tones[i % 4]} />
  })
}

/** Shows the owner's photo if one is registered in data/images.js, else the illustration. */
export function Picture({ name, alt, fit = 'cover', className = '', children }) {
  const src = photos[name]
  if (src) {
    return <img src={src} alt={alt} loading="lazy" decoding="async" className={`h-full w-full ${fit === 'contain' ? 'object-contain' : 'object-cover'} ${className}`} />
  }
  return (
    <div role="img" aria-label={alt} className={`h-full w-full ${className}`}>
      {children}
    </div>
  )
}

/* ---------- the cup (shared by hero, scenes, menu) ---------- */
export function CupG({ id = 'c', body = ['#DD6C4B', '#B9573A', '#8F3A22', '#6B2A17'], liquid = ['#9A6338', '#5A331C'], art = 'rosetta', saucer = true }) {
  const heart = 'M0 -46 C -52 -96 -98 -28 0 76 C 98 -28 52 -96 0 -46Z'
  return (
    <g>
      <defs>
        <linearGradient id={`${id}b`} x1="0" x2="1">
          <stop offset="0" stopColor={body[0]} /><stop offset=".35" stopColor={body[1]} />
          <stop offset=".75" stopColor={body[2]} /><stop offset="1" stopColor={body[3]} />
        </linearGradient>
        <linearGradient id={`${id}s`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F8ECD5" /><stop offset="1" stopColor="#D8BD90" />
        </linearGradient>
        <radialGradient id={`${id}l`} cx=".5" cy=".35" r=".75">
          <stop offset="0" stopColor={liquid[0]} /><stop offset="1" stopColor={liquid[1]} />
        </radialGradient>
        <clipPath id={`${id}k`}><ellipse cx="240" cy="188" rx="122" ry="30" /></clipPath>
      </defs>
      {saucer && (
        <g>
          <ellipse cx="240" cy="368" rx="206" ry="42" fill="#B8995F" />
          <ellipse cx="240" cy="360" rx="206" ry="42" fill={`url(#${id}s)`} />
          <ellipse cx="240" cy="358" rx="150" ry="27" fill="#E8D3A8" stroke="#C8A96E" strokeWidth="2" />
        </g>
      )}
      <path d="M366 198 C438 184 444 280 358 294" stroke="#7C2D16" strokeWidth="24" fill="none" strokeLinecap="round" />
      <path d="M368 196 C428 188 434 268 360 284" stroke={body[0]} strokeWidth="8" fill="none" strokeLinecap="round" opacity=".7" />
      <path d="M100 184 H380 C380 292 330 352 240 352 C150 352 100 292 100 184Z" fill={`url(#${id}b)`} />
      <path d="M104 216 Q240 250 376 216" stroke="#F3E5CA" strokeWidth="3" fill="none" opacity=".85" />
      <path d="M110 230 Q240 264 370 230" stroke="#F3E5CA" strokeWidth="1.5" fill="none" opacity=".6" />
      <path d="M122 210 C124 272 150 318 196 338" stroke="#fff" opacity=".22" strokeWidth="10" fill="none" strokeLinecap="round" />
      <ellipse cx="240" cy="184" rx="140" ry="36" fill="#F3E5CA" />
      <ellipse cx="240" cy="184" rx="140" ry="36" fill="none" stroke="#C8A96E" opacity=".7" />
      <ellipse cx="240" cy="188" rx="122" ry="30" fill={`url(#${id}l)`} />
      <g clipPath={`url(#${id}k)`}>
        <g transform="translate(240 188) scale(1 .245)">
          {art === 'rosetta' && (
            <>
              <path d={heart} fill="#F6E8CF" />
              <path d={heart} fill="#7A4A28" opacity=".9" transform="translate(0 -4) scale(.78)" />
              <path d={heart} fill="#F6E8CF" transform="translate(0 -6) scale(.6)" />
              <path d={heart} fill="#7A4A28" opacity=".9" transform="translate(0 -6) scale(.42)" />
              <path d={heart} fill="#F6E8CF" transform="translate(0 -6) scale(.26)" />
              <path d="M0 -84 V104" stroke="#5A331C" strokeWidth="4" strokeLinecap="round" />
            </>
          )}
          {art === 'heart' && (
            <>
              <path d={heart} fill="#F6E8CF" transform="scale(.8)" />
              <path d={heart} fill={liquid[0]} transform="translate(0 -4) scale(.45)" />
            </>
          )}
          {art === 'swirl' && (
            <>
              <circle r="76" fill="none" stroke="#F6E8CF" strokeWidth="16" opacity=".9" />
              <circle r="38" fill="none" stroke="#F6E8CF" strokeWidth="14" opacity=".9" />
              <path d="M-100 0 Q0 -60 100 0" stroke="#5A331C" strokeWidth="5" fill="none" />
            </>
          )}
          
        </g>
        {art === 'cocoa' && <ellipse cx="240" cy="188" rx="70" ry="16" fill="#3B2314" opacity=".35" />}
      </g>
      <ellipse cx="240" cy="188" rx="122" ry="30" fill="none" stroke="#B9824F" strokeWidth="4" opacity=".55" />
      <ellipse cx="190" cy="178" rx="26" ry="4" fill="#fff" opacity=".22" />
    </g>
  )
}

/* ---------- HERO: the showpiece cup ---------- */
export function HeroCup({ className = '' }) {
  return (
    <svg viewBox="0 0 480 440" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="steamG" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#F3E5CA" stopOpacity=".8" /><stop offset="1" stopColor="#F3E5CA" stopOpacity="0" />
        </linearGradient>
      </defs>
      <ellipse cx="240" cy="408" rx="200" ry="20" fill="#000" opacity=".4" />
      <CupG id="h" />
      {/* beans resting on the saucer */}
      <Bean x="74" y="358" r="-20" s="1.6" /><Bean x="100" y="378" r="35" s="1.4" />
      <Bean x="404" y="352" r="25" s="1.5" /><Bean x="428" y="372" r="-40" s="1.3" />
      {/* steam */}
      {[[196, 0], [240, 1.3], [284, 2.4]].map(([x, d], i) => (
        <g key={i} transform={`translate(${x} 150)`}>
          <path d="M0 0 C -14 -20 14 -38 0 -58 S -12 -92 0 -112" stroke="url(#steamG)" strokeWidth="8" strokeLinecap="round" fill="none"
            className="animate-steam" style={{ transformBox: 'fill-box', transformOrigin: '50% 100%', animationDelay: `${d}s` }} />
        </g>
      ))}
      {/* sparkles */}
      {[[60, 150, 1], [430, 120, 0.8], [350, 60, 0.6]].map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
          <path d="M0 -12 Q2 -2 12 0 Q2 2 0 12 Q-2 2 -12 0 Q-2 -2 0 -12Z" fill="#F3E5CA" opacity=".85" className="animate-bob" style={{ animationDelay: `${i * 0.8}s` }} />
        </g>
      ))}
    </svg>
  )
}

/* ---------- scene backdrop ---------- */
function Scene({ children, from, to }) {
  const g = `bg${from.slice(1)}${to.slice(1)}`
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="block h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={from} /><stop offset="1" stopColor={to} /></linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${g})`} />
      {children}
    </svg>
  )
}

const Counter = ({ y = 232 }) => (
  <g>
    <rect y={y} width="400" height={300 - y} fill="#633D2A" />
    <rect y={y} width="400" height="6" fill="#7A4A32" />
    {[70, 150, 240, 320].map((x) => <path key={x} d={`M${x} ${y + 6} V300`} stroke="#4A2C1C" strokeWidth="1.5" opacity=".6" />)}
  </g>
)

export function BeansScene() {
  return (
    <Scene from="#E9BE86" to="#C8874C">
      <circle cx="320" cy="70" r="80" fill="#FFE9B8" opacity=".35" />
      <Counter />
      <path d="M40 232 L52 110 Q110 92 168 110 L184 232Z" fill="#CDAA70" />
      <path d="M52 110 Q110 130 168 110" stroke="#9C7B45" strokeWidth="4" fill="none" />
      {[140, 170, 200].map((y) => <path key={y} d={`M56 ${y} Q112 ${y + 12} 176 ${y}`} stroke="#B38D55" strokeWidth="1.5" fill="none" strokeDasharray="5 4" />)}
      <rect x="78" y="150" width="68" height="30" rx="3" fill="#F3E5CA" opacity=".9" />
      <text x="112" y="170" textAnchor="middle" fontFamily="Georgia, serif" fontWeight="700" fontSize="16" fill="#A94F35">AMARO</text>
      <path d="M180 232 C190 190 230 170 290 172 C350 170 380 196 392 232Z" fill="#2A170C" />
      <Pile cx={286} base={236} w={210} h={62} n={70} seed={11} />
      <path d="M232 150 l56 24 l-8 14 l-52 -22z" fill="#8A5A34" /><circle cx="236" cy="152" r="9" fill="#6E4527" />
    </Scene>
  )
}

export function GrindScene() {
  return (
    <Scene from="#DCE0BE" to="#9AA377">
      <circle cx="80" cy="60" r="70" fill="#fff" opacity=".25" />
      <Counter y={240} />
      <path d="M120 36 H280 L250 112 H150Z" fill="#F3E5CA" opacity=".5" stroke="#323B22" strokeWidth="3" />
      <g clipPath="url(#hop)"><Pile cx={200} base={110} w={92} h={60} n={40} seed={5} s={.9} /></g>
      <clipPath id="hop"><path d="M122 38 H278 L249 110 H151Z" /></clipPath>
      <rect x="132" y="108" width="136" height="132" rx="8" fill="#323B22" />
      <rect x="132" y="108" width="136" height="14" fill="#242B17" />
      <circle cx="200" cy="162" r="26" fill="#F3E5CA" /><circle cx="200" cy="162" r="19" fill="none" stroke="#A94F35" strokeWidth="3" />
      <path d="M200 162 L212 150" stroke="#A94F35" strokeWidth="4" strokeLinecap="round" />
      {[...Array(9)].map((_, i) => <circle key={i} cx={200 + 22 * Math.cos((i * 40 * Math.PI) / 180)} cy={162 + 22 * Math.sin((i * 40 * Math.PI) / 180)} r="1.6" fill="#323B22" />)}
      <rect x="170" y="204" width="60" height="10" rx="3" fill="#C8874C" />
      <rect x="176" y="214" width="48" height="8" fill="#B9B2A0" /><rect x="168" y="222" width="64" height="18" rx="4" fill="#8F8878" />
      <path d="M232 226 H300" stroke="#8F8878" strokeWidth="10" strokeLinecap="round" />
      <path d="M150 240 C160 218 190 218 200 240Z" fill="#3B2314" />
    </Scene>
  )
}

export function PourScene() {
  return (
    <Scene from="#B5573B" to="#6E2A17">
      <circle cx="200" cy="150" r="130" fill="#FFB36B" opacity=".18" />
      <defs>
        <linearGradient id="chrome" x1="0" x2="1"><stop offset="0" stopColor="#B9B2A0" /><stop offset=".4" stopColor="#F4EEDF" /><stop offset="1" stopColor="#9C957F" /></linearGradient>
        <linearGradient id="stream" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#E3A050" /><stop offset="1" stopColor="#7A4A28" /></linearGradient>
      </defs>
      <Counter y={246} />
      <rect x="50" y="24" width="300" height="92" rx="10" fill="url(#chrome)" />
      <rect x="50" y="24" width="300" height="12" rx="6" fill="#fff" opacity=".35" />
      <circle cx="104" cy="70" r="28" fill="#F3E5CA" stroke="#633D2A" strokeWidth="3" />
      <path d="M104 70 L120 56" stroke="#A94F35" strokeWidth="3.5" strokeLinecap="round" />
      <text x="104" y="92" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fontWeight="700" fill="#633D2A">9 BAR</text>
      <rect x="268" y="52" width="52" height="30" rx="4" fill="#323B22" /><circle cx="282" cy="67" r="5" fill="#C8874C" /><circle cx="302" cy="67" r="5" fill="#78805B" />
      <rect x="168" y="116" width="64" height="22" rx="4" fill="#8F8878" />
      <rect x="176" y="138" width="48" height="26" rx="5" fill="#3A2A20" />
      <path d="M224 150 H318" stroke="#2A1A12" strokeWidth="12" strokeLinecap="round" />
      <path d="M188 164 V214 M212 164 V214" stroke="url(#stream)" strokeWidth="5" strokeLinecap="round" strokeDasharray="6 4" className="animate-pulse" />
      <path d="M160 206 H240 L232 244 H168Z" fill="#F3E5CA" />
      <ellipse cx="200" cy="206" rx="40" ry="7" fill="#7A4A28" /><ellipse cx="200" cy="205" rx="34" ry="5" fill="#E3A050" opacity=".8" />
    </Scene>
  )
}

export function CupScene() {
  return (
    <Scene from="#F7E9CF" to="#E2C79B">
      <circle cx="200" cy="140" r="120" fill="#fff" opacity=".35" />
      <Counter y={252} />
      <svg x="62" y="16" width="276" height="252" viewBox="0 0 480 440">
        <CupG id="sc" />
        {[196, 240, 284].map((x, i) => <g key={x} transform={`translate(${x} 150)`}><path d="M0 0 C -14 -20 14 -38 0 -58 S -12 -92 0 -112" stroke="#B9824F" strokeOpacity=".5" strokeWidth="8" strokeLinecap="round" fill="none" className="animate-steam" style={{ transformBox: 'fill-box', transformOrigin: '50% 100%', animationDelay: `${i * 1.2}s` }} /></g>)}
      </svg>
    </Scene>
  )
}

export function InteriorScene() {
  return (
    <Scene from="#7C2D16" to="#A94F35">
      {[40, 80, 120, 160, 200, 240, 280, 320, 360].map((x) => <path key={x} d={`M${x} 0 V196`} stroke="#5E200F" strokeWidth="2" opacity=".5" />)}
      {[70, 250].map((x) => (
        <g key={x}>
          <path d={`M${x} 170 V80 a40 40 0 0 1 80 0 V170Z`} fill="#FFD58A" /><path d={`M${x} 170 V80 a40 40 0 0 1 80 0 V170Z`} fill="none" stroke="#3B2314" strokeWidth="6" />
          <path d={`M${x + 40} 40 V170 M${x} 110 H${x + 80}`} stroke="#3B2314" strokeWidth="3" />
        </g>
      ))}
      {[[200, 52], [30, 40], [372, 40]].map(([x, h], i) => (
        <g key={i}><path d={`M${x} 0 V${h}`} stroke="#211B0A" strokeWidth="2" /><circle cx={x} cy={h + 14} r="22" fill="#FFE2A8" opacity=".3" /><circle cx={x} cy={h + 14} r="12" fill="#FFF0CE" /></g>
      ))}
      <rect y="196" width="400" height="104" fill="#4A2C1C" />
      <rect y="196" width="400" height="5" fill="#8A5A3C" />
      <rect x="-10" y="150" width="190" height="86" rx="18" fill="#8F3A22" /><rect x="-10" y="150" width="190" height="26" rx="13" fill="#A94F35" />
      {[30, 70, 110, 150].map((x) => <circle key={x} cx={x} cy="194" r="3" fill="#5E200F" />)}
      <rect x="205" y="214" width="150" height="9" rx="4" fill="#3B2314" /><rect x="272" y="222" width="12" height="60" fill="#3B2314" />
      <ellipse cx="280" cy="214" rx="76" ry="10" fill="#7A4A32" />
      <svg x="210" y="170" width="52" height="48" viewBox="0 0 480 440"><CupG id="i1" /></svg>
      <svg x="300" y="176" width="46" height="42" viewBox="0 0 480 440"><CupG id="i2" body={['#F6E8CF', '#E9D4A8', '#D2B57F', '#B99A62']} /></svg>
    </Scene>
  )
}

export function BaristaScene() {
  return (
    <Scene from="#F4DDB4" to="#D9A66B">
      <circle cx="320" cy="60" r="70" fill="#fff" opacity=".3" />
      <rect x="270" y="70" width="100" height="140" rx="8" fill="#323B22" /><rect x="282" y="84" width="76" height="30" rx="4" fill="#C8874C" />
      <circle cx="320" cy="150" r="16" fill="#F3E5CA" /><rect x="20" y="96" width="120" height="6" fill="#633D2A" />
      {[34, 70, 106].map((x) => <rect key={x} x={x} y="70" width="26" height="26" rx="4" fill="#A94F35" opacity=".85" />)}
      <Counter y={236} />
      <svg x="116" y="150" width="170" height="130" viewBox="0 0 480 440"><CupG id="bz" saucer={false} /></svg>
      <g transform="rotate(-38 118 118)">
        <defs><linearGradient id="steel" x1="0" x2="1"><stop offset="0" stopColor="#B9B2A0" /><stop offset=".5" stopColor="#F4EEDF" /><stop offset="1" stopColor="#8F8878" /></linearGradient></defs>
        <path d="M60 60 H150 L140 140 Q105 150 70 140Z" fill="url(#steel)" /><path d="M60 60 L36 54" stroke="#8F8878" strokeWidth="5" strokeLinecap="round" />
        <path d="M150 74 q36 0 30 36 q-4 20 -30 20" stroke="#323B22" strokeWidth="9" fill="none" strokeLinecap="round" />
      </g>
      <path d="M108 112 C112 150 150 160 196 176" stroke="#FFF6E4" strokeWidth="5" fill="none" strokeLinecap="round" />
    </Scene>
  )
}

export function BoothScene() {
  return (
    <Scene from="#F2C98A" to="#B9573A">
      {[30, 150, 270].map((x) => (
        <g key={x}>
          <path d={`M${x} 190 V90 a50 50 0 0 1 100 0 V190Z`} fill="#FFE2A8" />
          <path d={`M${x} 190 V90 a50 50 0 0 1 100 0 V190Z`} fill="none" stroke="#7C2D16" strokeWidth="8" />
          <path d={`M${x + 50} 40 V190`} stroke="#7C2D16" strokeWidth="3" opacity=".6" />
        </g>
      ))}
      <rect y="190" width="400" height="110" fill="#8F3A22" />
      {[...Array(8)].map((_, i) => <path key={i} d={`M${i * 60 - 20} 300 L${100 + i * 30} 190`} stroke="#6B2A17" strokeWidth="1.5" opacity=".6" />)}
      <rect x="40" y="222" width="150" height="9" rx="4" fill="#3B2314" /><rect x="104" y="230" width="12" height="52" fill="#3B2314" />
      <svg x="62" y="186" width="60" height="54" viewBox="0 0 480 440"><CupG id="b1" /></svg>
      <rect x="222" y="226" width="150" height="46" rx="5" fill="#3B2314" />
      <circle cx="274" cy="248" r="20" fill="#14100A" /><circle cx="274" cy="248" r="6" fill="#C8874C" />
      <path d="M338 232 L300 244" stroke="#E3C79A" strokeWidth="3" strokeLinecap="round" /><circle cx="344" cy="232" r="4" fill="#E3C79A" />
    </Scene>
  )
}

/* ---------- menu drinks ---------- */
export function DrinkArt({ kind, className = '' }) {
  const hot = {
    espresso: { id: 'd1', art: 'crema', body: ['#F6E8CF', '#E9D4A8', '#D2B57F', '#B99A62'], liquid: ['#8A5530', '#3B2314'] },
    cappuccino: { id: 'd2', art: 'rosetta' },
    latte: { id: 'd3', art: 'heart', body: ['#E9A33F', '#C8874C', '#A9692F', '#7F4C1F'], liquid: ['#C9955B', '#8A5530'] },
    mocha: { id: 'd4', art: 'swirl', body: ['#6C4A38', '#4F3223', '#3A2216', '#2A170E'], liquid: ['#6B3E22', '#2E170B'] },
    signature: { id: 'd6', art: 'rosetta', body: ['#8E9770', '#78805B', '#5C6444', '#434A2A'], liquid: ['#B27C45', '#5A331C'] },
  }
  if (kind === 'coldbrew') {
    return (
      <svg viewBox="0 0 200 170" className={className} aria-hidden="true">
        <defs>
          <linearGradient id="cb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#F3E5CA" /><stop offset=".3" stopColor="#D9B27C" /><stop offset=".42" stopColor="#5A331C" /><stop offset="1" stopColor="#2A170C" /></linearGradient>
          <clipPath id="gl"><path d="M64 22 H136 L128 152 Q100 158 72 152Z" /></clipPath>
        </defs>
        <ellipse cx="100" cy="156" rx="52" ry="7" fill="#000" opacity=".25" />
        <path d="M118 8 L106 96" stroke="#A94F35" strokeWidth="7" strokeLinecap="round" /><path d="M118 8 L106 96" stroke="#F3E5CA" strokeWidth="7" strokeDasharray="6 8" />
        <g clipPath="url(#gl)">
          <rect x="60" y="30" width="80" height="130" fill="url(#cb)" />
          <rect x="66" y="26" width="30" height="26" rx="5" fill="#fff" opacity=".5" transform="rotate(-12 80 40)" />
          <rect x="102" y="36" width="28" height="24" rx="5" fill="#fff" opacity=".45" transform="rotate(10 116 48)" />
          <rect x="82" y="66" width="30" height="26" rx="5" fill="#fff" opacity=".28" transform="rotate(-6 96 78)" />
        </g>
        <path d="M64 22 H136 L128 152 Q100 158 72 152Z" fill="none" stroke="#fff" strokeWidth="3" opacity=".7" />
        <path d="M72 34 L77 140" stroke="#fff" strokeWidth="4" opacity=".3" strokeLinecap="round" />
      </svg>
    )
  }
  const p = hot[kind] ?? hot.cappuccino
  return (
    <svg viewBox="40 100 400 310" className={className} aria-hidden="true">
      <ellipse cx="240" cy="404" rx="190" ry="14" fill="#000" opacity=".18" />
      <CupG {...p} />
      {kind === 'signature' && (
        <g>
          <path d="M370 372 q24 -22 46 0 q-20 -10 -46 0z" fill="#E89A3C" /><path d="M376 370 q18 -14 34 0" stroke="#C8741F" strokeWidth="3" fill="none" />
          <ellipse cx="96" cy="372" rx="12" ry="7" fill="#9FB06A" transform="rotate(-20 96 372)" />
        </g>
      )}
      {kind === 'mocha' && [-30, 0, 34].map((x, i) => <circle key={i} cx={240 + x} cy={188 + (i % 2) * 6} r="3.5" fill="#E3C79A" opacity=".8" />)}
    </svg>
  )
}

/* ---------- brand marks ---------- */
export function Monogram({ className = '' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 21h22c0 10-5 16-11 16s-11-6-11-16z" fill="currentColor" />
      <path d="M34 23c6-1 6 8 0 9" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M18 15c-2-3 2-4 0-7M25 15c-2-3 2-4 0-7" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  )
}

/** Circular text stamp that rotates slowly. */
export function Stamp({ top, middle, bottom, className = '', spin = true, id = 'st' }) {
  return (
    <div className={`relative aspect-square [container-type:inline-size] ${className}`}>
      <svg viewBox="0 0 120 120" className={`h-full w-full ${spin ? 'animate-spin-slow' : ''}`} aria-hidden="true">
        <defs><path id={`${id}-p`} d="M60 60 m-47 0 a47 47 0 1 1 94 0 a47 47 0 1 1 -94 0" /></defs>
        <circle cx="60" cy="60" r="57" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 3" />
        <circle cx="60" cy="60" r="36" fill="none" stroke="currentColor" strokeWidth="1" />
        <text fontSize="9.5" fontWeight="700" fill="currentColor" fontFamily="DM Sans Variable, sans-serif">
          <textPath href={`#${id}-p`} textLength="292" lengthAdjust="spacing">{`${top} • ${bottom} • `}</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center font-serif font-bold leading-none" style={{ fontSize: 'clamp(.9rem, 3.4cqw, 1.5rem)' }}>
        {middle}
      </div>
    </div>
  )
}
