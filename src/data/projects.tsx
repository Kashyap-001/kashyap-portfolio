import type { ReactNode } from 'react'
import { AICallCenterDiagram, AISecondBrainDiagram, JarvisDiagram, TorchitDiagram } from '@/components/diagrams'

export type Project = {
  id: string
  title: string
  reverse?: boolean
  media:
    | { kind: 'video'; poster: string; src: string }
    | { kind: 'diagram'; node: ReactNode }
  description: ReactNode
  note?: ReactNode
  tags: string[]
  githubUrl: string
}

export const projects: Project[] = [
  {
    id: 'odoo-mcp-gateway',
    title: 'Odoo MCP Gateway',
    media: {
      kind: 'video',
      poster: '/assets/projects/odoo-mcp-gateway/chat-result.png',
      src: '/assets/projects/odoo-mcp-gateway/demo.mp4',
    },
    description: (
      <>
        An Odoo 18 module implementing a real <strong>Model Context Protocol (MCP) server and client</strong>:
        a JSON-RPC 2.0 endpoint (<code>tools/list</code>, <code>tools/call</code>) that exposes Odoo's own tools
        to AI clients, plus the ability to connect outward to external MCP servers (WhatsApp, YouTube, etc.).
        A 6-provider LLM integration layer (Anthropic, OpenAI, Gemini, Ollama, Grok/xAI, OpenCode) calls each
        provider via plain HTTPS with zero extra dependencies, backed by rate-limited access control and a
        session cost/token audit trail. A dedicated in-Odoo chat interface (built with OWL 3) renders interactive
        charts inline via a separate, tightly-coupled chart-generation tool.
      </>
    ),
    note: (
      <>
        The MCP protocol endpoint is real and functional. The daily-use interface I've actually built and
        demonstrated is the in-Odoo chat widget, not a shown external client connection like Claude Desktop.
      </>
    ),
    tags: ['Python', 'Odoo 18', 'MCP / JSON-RPC 2.0', 'OWL 3', 'ECharts'],
    githubUrl: 'https://github.com/Kashyap-001/Odoo_MCP',
  },
  {
    id: 'ai-call-center',
    title: 'AI Call Center',
    reverse: true,
    media: { kind: 'diagram', node: <AICallCenterDiagram /> },
    description: (
      <>
        An Odoo 19 module giving Odoo a real AI customer-service/sales agent for WhatsApp and Live Chat,
        answering from a self-built knowledge base and automatically drafting Sales Quotations or Helpdesk
        Tickets. Documents are chunked and embedded via a local ONNX model or an external embedding API,
        stored directly in Odoo's own PostgreSQL database (no external vector-database service, since Odoo.sh
        doesn't allow that kind of dependency), and matched with custom cosine-similarity search blended with
        keyword scoring. An asynchronous queue-and-cron pipeline keeps LLM calls off the web request thread,
        with confidence-based escalation and WhatsApp 24-hour-window handling. Backed by a 30+ file automated
        test suite.
      </>
    ),
    tags: ['Python', 'Odoo 19', 'PostgreSQL', 'Semantic Search', 'WhatsApp API'],
    githubUrl: 'https://github.com/Kashyap-001/Ai_CallCenter',
  },
  {
    id: 'ai-second-brain',
    title: 'AI Second Brain',
    media: { kind: 'diagram', node: <AISecondBrainDiagram /> },
    description: (
      <>
        A portable "second brain" framework for AI coding agents (Claude Code, Cursor), built in Node.js:
        a self-healing error-fix-log-retry loop, SAFe-style dev-loop agent roles wired to custom slash commands,
        a reusable 14+ skill library, and persistent cross-session memory. Published as a sanitized, MIT-licensed
        public template distributed via a zero-dependency <code>npx</code> setup script that runs identically on
        Linux, macOS, and Windows, with GitHub Actions CI smoke-testing the setup script across all three
        platforms on every push. I used this framework's dev loop to build the Odoo MCP Gateway and AI Call
        Center projects above: real, working proof of the framework, not just a standalone template.
      </>
    ),
    tags: ['Node.js', 'CLI', 'GitHub Actions CI', 'Agent Engineering'],
    githubUrl: 'https://github.com/Kashyap-001/second-brain-template',
  },
  {
    id: 'jarvis-voice-assistant',
    title: 'Jarvis Voice Assistant',
    reverse: true,
    media: { kind: 'diagram', node: <JarvisDiagram /> },
    description: (
      <>
        A Python voice assistant with wake-word detection, speech-to-text, and text-to-speech (gTTS + pygame),
        falling back to an LLM (Groq API, Llama 3.3 70B) for open-ended questions when a command doesn't match
        a known action. Includes command routing for opening websites, playing music from a library module, and
        reading live news headlines via the NewsAPI.
      </>
    ),
    tags: ['Python', 'Speech Recognition', 'Groq / Llama 3.3', 'NewsAPI'],
    githubUrl: 'https://github.com/Kashyap-001/Jarvis-voice-assistant',
  },
  {
    id: 'torchit-navscan',
    title: 'Torchit NavScan (BLE Prototype)',
    media: { kind: 'diagram', node: <TorchitDiagram /> },
    description: (
      <>
        An Android app in Java using Android BLE APIs (BluetoothLeScanner, ScanCallback) that scans for and
        lists nearby Bluetooth Low Energy assistive hardware (e.g. Torchit's Saarthi Smart Cane) in real time,
        as a hardware diagnostic companion tool. Handles Android 12+ BLE runtime permissions and adds full
        TalkBack accessibility support on every interactive view, with a simulated-device fallback so the app
        is testable without physical hardware nearby.
      </>
    ),
    tags: ['Java', 'Android', 'BLE APIs', 'Accessibility (TalkBack)'],
    githubUrl: 'https://github.com/Kashyap-001/Torchit-NavScan',
  },
]
