"use client";

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useState } from 'react';

export default function CloudinaryUpload({onImageUpload} : {onImageUpload: (data: {url: string, publicId: string}) => void}) {
  const [image, setImage] = useState<{url: string}[]>([])
  return (
    <CldUploadWidget signatureEndpoint="/api/sign-cloudinary-params"
      options={{
        uploadPreset: 'digital-garden-upload',
      }}
      onSuccess={(result) => {
        const info = result.info as {public_id: string, secure_url:string}
        setImage(prev => [...prev, {url: info.secure_url}])
        onImageUpload({ url: info.secure_url, publicId: info.public_id })
      }}
    >
      {({ open }) => (
        <div className="flex flex-col gap-2">
          <button type="button" onClick={() => { setImage([]); open() }}>
            {image.length > 0 ? 'Replace Image' : 'Upload an Image'}
          </button>
          {image.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {image.map((img, i) => (
                <div key={i} className="relative h-32 rounded overflow-hidden">
                  <Image src={img.url} alt="Uploaded" fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </CldUploadWidget>
  );
}