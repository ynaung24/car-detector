import { useRef } from 'react'

interface ImageUploaderProps {
  onImageSelect: (file: File) => void
}

function ImageUploader({ onImageSelect }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file)
    }
  }

  return (
    <div className="image-uploader">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <button onClick={() => fileInputRef.current?.click()}>
        Upload Image
      </button>
    </div>
  )
}

export default ImageUploader

