import React, { useState } from 'react';
import { UploadCloud } from 'lucide-react';

interface ImageDropzoneProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export function ImageDropzone({ value, onChange, label = "Arraste e solte uma imagem" }: ImageDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processFile(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      onChange(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-3">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl transition-colors cursor-pointer overflow-hidden ${
          isDragging ? 'border-primary bg-primary-light/50' : 'border-gray-300 hover:border-primary/50 hover:bg-gray-50'
        }`}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        {value ? (
          <div className="flex flex-col items-center gap-4">
            <img src={value} alt="Preview" className="max-h-32 object-contain rounded-lg shadow-sm" />
            <span className="text-xs text-gray-500 font-medium bg-white px-2 py-1 rounded-md shadow-sm">
              Clique ou arraste nova imagem
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <div className="p-3 bg-gray-100 rounded-full">
              <UploadCloud className="w-6 h-6 text-gray-400" />
            </div>
            <div className="text-sm font-medium text-gray-700 text-center">
              {label}
            </div>
            <p className="text-xs text-gray-400">SVG, PNG, JPG ou GIF</p>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400 font-medium uppercase whitespace-nowrap">Ou cole a URL</span>
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
          className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-ring"
        />
      </div>
    </div>
  );
}
