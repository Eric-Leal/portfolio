'use client'

import Image from 'next/image'

export function AboutImage() {
  return (
    <div className="order-1 flex justify-center lg:order-2 lg:col-span-2 lg:justify-end">
      <div className="border-border bg-card relative aspect-3/4 w-full max-w-xs overflow-hidden rounded-3xl border shadow-sm">
        <Image
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
          alt="foto perfil"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 80vw, (max-width: 1024px) 40vw, 320px"
        />
        1
      </div>
    </div>
  )
}
