'use client'

import { useRef, useEffect } from 'react'

export function HeroVideo({ videoSrc }: { videoSrc?: string }) {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.75 // Slightly slower for elegance
        }
    }, [])

    return (
        <div className="relative w-full h-[600px] md:h-full rounded-2xl overflow-hidden shadow-2xl">
            <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                poster="https://images.unsplash.com/photo-1505691938895-1cd58ab3b2b8?q=80&w=2070&auto=format&fit=crop"
            >
                <source
                    src={videoSrc || "https://assets.mixkit.co/videos/preview/mixkit-ceiling-of-a-room-with-modern-lighting-42410-large.mp4"}
                    type="video/mp4"
                />
                Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-black/20" />
        </div>
    )
}
