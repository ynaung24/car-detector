import { useState } from 'react'
import ImageUploader from './components/ImageUploader'
import PredictionCanvas from './components/PredictionCanvas'
import MetricsPanel from './components/MetricsPanel'
import { predictCar, PredictionResponse } from './api/predict'
import './App.css'

function App() {
  const [image, setImage] = useState<File | null>(null)
  const [predictions, setPredictions] = useState<PredictionResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageSelect = async (file: File) => {
    setImage(file)
    setPredictions(null)
    setError(null)
    setLoading(true)

    try {
      const result = await predictCar(file)
      console.log('Prediction result:', result)
      setPredictions(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to detect cars')
      console.error('Prediction error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="App">
      <header>
        <h1>🚗 Car Detector</h1>
        <p>Upload an image to detect cars using YOLO</p>
      </header>
      <main>
        <ImageUploader onImageSelect={handleImageSelect} />
        {loading && <div className="loading">Processing image...</div>}
        {error && <div className="error">Error: {error}</div>}
        {image && (
          <>
            <PredictionCanvas image={image} predictions={predictions} />
            <MetricsPanel predictions={predictions} />
          </>
        )}
      </main>
    </div>
  )
}

export default App

