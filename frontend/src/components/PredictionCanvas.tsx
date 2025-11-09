import { useEffect, useRef } from 'react'
import { PredictionResponse } from '../api/predict'

interface PredictionCanvasProps {
  image: File
  predictions: PredictionResponse | null
}

function PredictionCanvas({ image, predictions }: PredictionCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)

      // Draw bounding boxes when predictions are available
      if (predictions?.boxes && predictions.boxes.length > 0) {
        predictions.boxes.forEach((box, index) => {
          // Draw bounding box
          ctx.strokeStyle = '#00ff00'
          ctx.lineWidth = 3
          ctx.strokeRect(box.x1, box.y1, box.x2 - box.x1, box.y2 - box.y1)
          
          // Draw label with confidence
          ctx.fillStyle = '#00ff00'
          ctx.font = '16px Arial'
          ctx.fillText(
            `Car ${index + 1}: ${(box.confidence * 100).toFixed(1)}%`,
            box.x1,
            box.y1 - 5
          )
        })
      }
    }

    img.src = URL.createObjectURL(image)
  }, [image, predictions])

  return (
    <div className="prediction-canvas">
      <canvas ref={canvasRef} style={{ maxWidth: '100%', height: 'auto' }} />
    </div>
  )
}

export default PredictionCanvas

