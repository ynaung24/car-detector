import { PredictionResponse } from '../api/predict'

interface MetricsPanelProps {
  predictions: PredictionResponse | null
}

function MetricsPanel({ predictions }: MetricsPanelProps) {
  if (!predictions) {
    return (
      <div className="metrics-panel">
        <div className="metrics-panel-empty">
          <p>No predictions yet. Upload an image to get started.</p>
        </div>
      </div>
    )
  }

  const boxCount = predictions.boxes?.length || 0

  return (
    <div className="metrics-panel">
      <div className="metrics-panel-header">
        <h3>Detection Metrics</h3>
        <div className="metrics-panel-count">
          <span className="count-number">{boxCount}</span>
          <span className="count-label">Car{boxCount !== 1 ? 's' : ''} Detected</span>
        </div>
      </div>

      {boxCount === 0 ? (
        <div className="metrics-panel-empty">
          <p>No cars detected in this image. Try a different image with visible cars.</p>
        </div>
      ) : (
        <div className="metrics-panel-detections">
          {predictions.boxes?.map((box, index: number) => (
            <div key={index} className="detection-item">
              <div className="detection-header">
                <span className="detection-number">Car {index + 1}</span>
                <span className="detection-confidence">
                  {(box.confidence * 100).toFixed(1)}% confidence
                </span>
              </div>
              <div className="detection-details">
                <span className="detail-label">Bounding Box:</span>
                <span className="detail-value">
                  ({box.x1.toFixed(0)}, {box.y1.toFixed(0)}) → ({box.x2.toFixed(0)}, {box.y2.toFixed(0)})
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {predictions.image_width && predictions.image_height && (
        <div className="metrics-panel-footer">
          <span className="image-size">
            Image: {predictions.image_width} × {predictions.image_height} px
          </span>
        </div>
      )}
    </div>
  )
}

export default MetricsPanel

