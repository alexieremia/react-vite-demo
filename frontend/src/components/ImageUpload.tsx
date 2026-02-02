import { useRef, useState, useCallback, type ChangeEvent } from "react";
import { CameraIcon, CloseIcon } from "./Icons";

interface ImageUploadProps {
  label: string;
  onImageSelect: (file: File | null) => void;
  error?: string;
  accept?: string;
  maxSizeMB?: number;
}

export function ImageUpload({
  label,
  onImageSelect,
  error,
  accept = "image/*",
  maxSizeMB = 5,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (file.size > maxSizeMB * 1024 * 1024) {
        setLocalError(`File size must be less than ${maxSizeMB}MB`);
        return;
      }

      setLocalError(null);
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onImageSelect(file);
    },
    [maxSizeMB, onImageSelect]
  );

  const handleRemove = useCallback(() => {
    setPreview(null);
    setLocalError(null);
    onImageSelect(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [onImageSelect]);

  const displayError = error || localError;

  return (
    <div className="w-full">
      <span className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </span>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="sr-only"
        id="image-upload"
        aria-describedby={displayError ? "image-upload-error" : undefined}
      />

      {preview ? (
        <div className="relative rounded-lg overflow-hidden">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 bg-black/50 rounded-full text-white hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Remove image"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label
          htmlFor="image-upload"
          className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-amber-500 hover:bg-amber-50/50 transition-colors"
        >
          <CameraIcon className="h-10 w-10 text-gray-400" />
          <span className="mt-2 text-sm text-gray-500">
            Click to upload your burger photo
          </span>
          <span className="mt-1 text-xs text-gray-400">
            PNG, JPG up to {maxSizeMB}MB
          </span>
        </label>
      )}

      {displayError && (
        <p id="image-upload-error" className="mt-1 text-sm text-red-600">
          {displayError}
        </p>
      )}
    </div>
  );
}
