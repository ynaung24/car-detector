import { useEffect, useRef } from 'react'

interface PredictionCanvasProps {
  image: File
  predictions: any
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

      // TODO: Draw bounding boxes when predictions are available
      if (predictions?.boxes) {
        predictions.boxes.forEach((box: any) => {
          ctx.strokeStyle = 'red'
          ctx.lineWidth = 2
          ctx.strokeRect(box.x1, box.y1, box.x2 - box.x1, box.y2 - box.y1)
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

