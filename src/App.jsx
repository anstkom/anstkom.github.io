import React from "react";
import InteractiveBookTimeline from "./InteractiveBookTimeline.jsx";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 24, fontFamily: "sans-serif", color: "#7f1d1d" }}>
          <h1 style={{ margin: "0 0 12px", fontSize: 24 }}>Ошибка предпросмотра</h1>
          <pre style={{ whiteSpace: "pre-wrap" }}>{this.state.error.message}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <InteractiveBookTimeline />
    </ErrorBoundary>
  );
}
