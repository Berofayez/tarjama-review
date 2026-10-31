import { useEffect, useState } from 'react'
import './App.css'

type ApiState = 'checking' | 'connected' | 'unavailable'

function App() {
  const [apiState, setApiState] = useState<ApiState>('checking')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    fetch('/api/health', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Health check failed')
        }

        return response.json() as Promise<{ status: string }>
      })
      .then((result) => {
        setApiState(result.status === 'ok' ? 'connected' : 'unavailable')
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setApiState('unavailable')
        }
      })

    return () => controller.abort()
  }, [attempt])

  const statusLabel = {
    checking: 'Checking connection',
    connected: 'API connected',
    unavailable: 'API unavailable',
  }[apiState]

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Tarjama Review home">
          <span className="brand-mark" aria-hidden="true">T</span>
          <span>Tarjama Review</span>
        </a>
        <span className="environment-label">Development</span>
      </header>

      <main className="workspace">
        <section className="intro" aria-labelledby="page-title">
          <p className="eyebrow">First build checkpoint</p>
          <h1 id="page-title">The review workspace starts here.</h1>
          <p className="intro-copy">
            This starter confirms the web app can communicate with its API. The next slice will load and save a sample paragraph.
          </p>
        </section>

        <section className="connection" aria-labelledby="connection-title">
          <div className="connection-copy">
            <p className="eyebrow">Service check</p>
            <h2 id="connection-title">Application API</h2>
            <p className="connection-detail" aria-live="polite">{statusLabel}</p>
          </div>
          <span className={`status-indicator ${apiState}`} aria-hidden="true" />
          <button
            className="retry-button"
            type="button"
            onClick={() => {
              setApiState('checking')
              setAttempt((current) => current + 1)
            }}
            disabled={apiState === 'checking'}
          >
            Check again
          </button>
        </section>

        <footer className="workspace-footer">
          <span>Tarjama Review</span>
          <span>Arabic source · English review</span>
        </footer>
      </main>
    </div>
  )
}

export default App
