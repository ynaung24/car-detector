interface MetricsPanelProps {
  predictions: any
}

function MetricsPanel({ predictions }: MetricsPanelProps) {
  if (!predictions) {
    return (
      <div className="metrics-panel">
        <p>No predictions yet. Upload an image to get started.</p>
      </div>
    )
  }

  const boxCount = predictions.boxes?.length || 0

  return (
    <div className="metrics-panel">
      <h3>Detection Metrics</h3>
      <div>
        <p>Cars Detected: {boxCount}</p>
        {predictions.boxes?.map((box: any, index: number) => (
          <div key={index}>
            <p>
              Car {index + 1}: Confidence {box.confidence.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MetricsPanel

