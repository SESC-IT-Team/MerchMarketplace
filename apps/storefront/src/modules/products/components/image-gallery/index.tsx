"use client"

import { HttpTypes } from "@medusajs/types"
import { Container } from "@modules/common/components/ui"
import Image from "next/image"
import { useState } from "react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [activeImageId, setActiveImageId] = useState(images[0]?.id)
  const activeImage = images.find((image) => image.id === activeImageId) ?? images[0]

  if (!activeImage) {
    return null
  }

  return (
    <div className="flex items-start gap-3 small:gap-5">
      <div className="order-2 flex min-w-0 flex-1">
        <Container
          className="relative aspect-[0.82] w-full overflow-hidden rounded-[5px] bg-white"
          id={activeImage.id}
        >
          {!!activeImage.url && (
            <Image
              src={activeImage.url}
              priority
              className="absolute inset-0 transition duration-500 hover:scale-[1.02]"
              alt="Основное изображение товара"
              fill
              sizes="(max-width: 576px) 80vw, (max-width: 992px) 55vw, 560px"
              style={{ objectFit: "cover" }}
            />
          )}
        </Container>
      </div>
      <div className="order-1 flex w-16 shrink-0 flex-col gap-3 small:w-[117px] small:gap-5">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setActiveImageId(image.id)}
            className={`relative aspect-[0.8] w-full overflow-hidden rounded-[5px] bg-white text-left transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${
              image.id === activeImage.id ? "ring-1 ring-black" : ""
            }`}
            id={`${image.id}-preview`}
            aria-label={`Показать изображение ${index + 1}`}
            aria-pressed={image.id === activeImage.id}
          >
            {!!image.url && (
              <Image
                src={image.url}
                priority={index < 3}
                className="absolute inset-0"
                alt={`Превью изображения ${index + 1}`}
                fill
                sizes="117px"
                style={{ objectFit: "cover" }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ImageGallery
