"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

export function SafeImage(props: ImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
        <span className="text-gray-500 text-sm font-semibold text-center px-4">
          {String(props.src).split("/").pop()}
        </span>
      </div>
    );
  }

  return <Image {...props} onError={() => setError(true)} />;
}
