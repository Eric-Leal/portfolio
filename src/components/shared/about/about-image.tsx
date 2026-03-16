'use client'

import Image from 'next/image'

export function AboutImage() {
  return (
    <div className="order-1 flex justify-center lg:order-2 lg:col-span-2 lg:justify-end">
      <div className="border-border bg-card relative aspect-3/4 w-full max-w-xs overflow-hidden rounded-3xl border shadow-sm">
        <Image
          src="/images/Eric.jpg"
          alt="foto perfil"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 80vw, (max-width: 1024px) 40vw, 320px"
        />
      </div>
    </div>
  )
}
