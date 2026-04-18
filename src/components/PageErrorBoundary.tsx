import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = { children: ReactNode }
type State = { error: Error | null }

export class PageErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[CCT] Page crashed:', error.message, info.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <div
          className="dw2-page"
          style={{
            padding: 'calc(var(--nav-h) + 48px) 24px 48px',
            maxWidth: 520,
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <h1 className="dw2-heading" style={{ fontSize: 28, marginBottom: 12 }}>
            Something went wrong
          </h1>
          <p className="dw2-subtitle" style={{ marginBottom: 24 }}>
            {this.state.error.message}
          </p>
          <button
            type="button"
            className="dw2-load-more"
            onClick={() => window.location.reload()}
          >
            Reload page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
