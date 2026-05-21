"use client";

import { CldUploadWidget } from 'next-cloudinary';

export default function CloudinaryUpload() {
  return (
    <CldUploadWidget signatureEndpoint="/api/sign-cloudinary-params"
      options={{
        uploadPreset: 'digital-garden-upload',
      }}
      onSuccess={(results) => {console.log(results)}}
    >
      {({ open }) => {
        return (
          <button onClick={() => open()}>
            Upload an Image
          </button>
        );
      }}

    </CldUploadWidget>
  );
}