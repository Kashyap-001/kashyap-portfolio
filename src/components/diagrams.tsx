function ArrowMarker({ id }: { id: string }) {
  return (
    <defs>
      <marker id={id} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6" className="diagram-line" />
      </marker>
    </defs>
  )
}

export function AICallCenterDiagram() {
  return (
    <svg
      viewBox="0 0 300 340"
      role="img"
      aria-label="Diagram: WhatsApp and Live Chat messages flow through a knowledge base and LLM to produce a quotation or ticket"
    >
      <rect className="diagram-node-fill diagram-node-stroke" x="90" y="15" width="120" height="60" rx="8" strokeWidth="1.5" />
      <text className="diagram-text" x="150" y="40" textAnchor="middle" style={{ fontSize: 15 }}>WhatsApp /</text>
      <text className="diagram-text" x="150" y="58" textAnchor="middle" style={{ fontSize: 15 }}>Live Chat</text>

      <rect className="diagram-node-fill diagram-accent-stroke" x="45" y="115" width="105" height="70" rx="8" strokeWidth="2" />
      <text className="diagram-text" x="97" y="145" textAnchor="middle" style={{ fontSize: 14 }}>Knowledge</text>
      <text className="diagram-text" x="97" y="161" textAnchor="middle" style={{ fontSize: 14 }}>Base</text>

      <rect className="diagram-node-fill diagram-accent-stroke" x="150" y="115" width="105" height="70" rx="8" strokeWidth="2" />
      <text className="diagram-text" x="202" y="145" textAnchor="middle" style={{ fontSize: 14 }}>LLM</text>
      <text className="diagram-text-dim" x="202" y="163" textAnchor="middle">async + cron</text>

      <rect className="diagram-node-fill diagram-node-stroke" x="90" y="255" width="120" height="65" rx="8" strokeWidth="1.5" />
      <text className="diagram-text" x="150" y="280" textAnchor="middle" style={{ fontSize: 15 }}>Quotation /</text>
      <text className="diagram-text" x="150" y="298" textAnchor="middle" style={{ fontSize: 15 }}>Ticket</text>

      <path className="diagram-line" d="M135 75 L100 115" markerEnd="url(#arrow-call-center)" />
      <path className="diagram-line" d="M165 75 L200 115" markerEnd="url(#arrow-call-center)" />
      <path className="diagram-line" d="M100 185 L135 255" markerEnd="url(#arrow-call-center)" />
      <path className="diagram-line" d="M200 185 L165 255" markerEnd="url(#arrow-call-center)" />
      <ArrowMarker id="arrow-call-center" />
    </svg>
  )
}

export function AISecondBrainDiagram() {
  return (
    <svg
      viewBox="0 0 300 340"
      role="img"
      aria-label="Diagram: a circular self-healing loop of error, fix, log, retry"
    >
      <rect className="diagram-node-fill diagram-accent-stroke" x="105" y="20" width="90" height="55" rx="8" strokeWidth="2" />
      <text className="diagram-text" x="150" y="53" textAnchor="middle" style={{ fontSize: 15 }}>Error</text>

      <rect className="diagram-node-fill diagram-node-stroke" x="210" y="140" width="85" height="55" rx="8" strokeWidth="1.5" />
      <text className="diagram-text" x="252" y="173" textAnchor="middle" style={{ fontSize: 15 }}>Fix</text>

      <rect className="diagram-node-fill diagram-node-stroke" x="105" y="265" width="90" height="55" rx="8" strokeWidth="1.5" />
      <text className="diagram-text" x="150" y="298" textAnchor="middle" style={{ fontSize: 15 }}>Log</text>

      <rect className="diagram-node-fill diagram-node-stroke" x="5" y="140" width="85" height="55" rx="8" strokeWidth="1.5" />
      <text className="diagram-text" x="47" y="173" textAnchor="middle" style={{ fontSize: 15 }}>Retry</text>

      <path className="diagram-line" d="M195 60 Q260 85 252 140" markerEnd="url(#arrow-second-brain)" />
      <path className="diagram-line" d="M252 195 Q220 250 195 275" markerEnd="url(#arrow-second-brain)" />
      <path className="diagram-line" d="M105 285 Q60 250 47 195" markerEnd="url(#arrow-second-brain)" />
      <path className="diagram-line" d="M47 140 Q60 85 105 65" markerEnd="url(#arrow-second-brain)" />
      <ArrowMarker id="arrow-second-brain" />
    </svg>
  )
}

export function JarvisDiagram() {
  return (
    <svg
      viewBox="0 0 300 340"
      role="img"
      aria-label="Diagram: a voice waveform feeding into wake-word detection, then either command routing or an LLM fallback"
    >
      <path
        className="diagram-accent-stroke"
        fill="none"
        strokeWidth="2"
        d="M110 55 L110 35 M130 55 L130 15 M150 55 L150 70 M170 55 L170 25 M190 55 L190 75"
        strokeLinecap="round"
      />

      <rect className="diagram-node-fill diagram-node-stroke" x="90" y="100" width="120" height="55" rx="8" strokeWidth="1.5" />
      <text className="diagram-text" x="150" y="125" textAnchor="middle" style={{ fontSize: 15 }}>Wake word +</text>
      <text className="diagram-text" x="150" y="143" textAnchor="middle" style={{ fontSize: 15 }}>STT</text>

      <rect className="diagram-node-fill diagram-node-stroke" x="15" y="220" width="120" height="60" rx="8" strokeWidth="1.5" />
      <text className="diagram-text" x="75" y="256" textAnchor="middle" style={{ fontSize: 14 }}>Command router</text>

      <rect className="diagram-node-fill diagram-accent-stroke" x="165" y="220" width="120" height="60" rx="8" strokeWidth="2" />
      <text className="diagram-text" x="225" y="248" textAnchor="middle" style={{ fontSize: 14 }}>Groq / Llama</text>
      <text className="diagram-text-dim" x="225" y="266" textAnchor="middle">3.3 70B</text>

      <path className="diagram-line" d="M150 90 V100" markerEnd="url(#arrow-jarvis)" />
      <path className="diagram-line" d="M125 155 L90 220" markerEnd="url(#arrow-jarvis)" />
      <path className="diagram-line" d="M175 155 L215 220" markerEnd="url(#arrow-jarvis)" />
      <ArrowMarker id="arrow-jarvis" />
    </svg>
  )
}

export function TorchitDiagram() {
  return (
    <svg
      viewBox="0 0 300 340"
      role="img"
      aria-label="Diagram: a phone scanning for a nearby BLE device via expanding signal arcs"
    >
      <rect className="diagram-node-fill diagram-node-stroke" x="120" y="15" width="60" height="90" rx="10" strokeWidth="1.5" />
      <rect className="diagram-node-fill diagram-node-stroke" x="132" y="27" width="36" height="55" rx="2" strokeWidth="1" />

      <path className="diagram-accent-stroke" fill="none" strokeWidth="1.5" d="M115 130 a 20 20 0 0 0 70 0" opacity="0.9" />
      <path className="diagram-accent-stroke" fill="none" strokeWidth="1.5" d="M95 150 a 55 40 0 0 0 110 0" opacity="0.6" />
      <path className="diagram-accent-stroke" fill="none" strokeWidth="1.5" d="M75 170 a 75 55 0 0 0 150 0" opacity="0.35" />

      <rect className="diagram-node-fill diagram-accent-stroke" x="75" y="255" width="150" height="65" rx="8" strokeWidth="2" />
      <text className="diagram-text" x="150" y="280" textAnchor="middle" style={{ fontSize: 14 }}>Saarthi Smart</text>
      <text className="diagram-text" x="150" y="298" textAnchor="middle" style={{ fontSize: 14 }}>Cane (BLE)</text>

      <path className="diagram-line" d="M150 215 V255" markerEnd="url(#arrow-torchit)" />
      <ArrowMarker id="arrow-torchit" />
    </svg>
  )
}
