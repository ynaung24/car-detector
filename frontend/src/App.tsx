import { useState } from 'react'
import ImageUploader from './components/ImageUploader'
import PredictionCanvas from './components/PredictionCanvas'
import MetricsPanel from './components/MetricsPanel'
import './App.css'

function App() {
  const [image, setImage] = useState<File | null>(null)
  const [predictions, setPredictions] = useState<any>(null)

  return (
    <div className="App">
      <header>
        <h1>🚗 Car Detector Frontend Initialized</h1>
      </header>
      <main>
        <ImageUploader onImageSelect={setImage} />
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

