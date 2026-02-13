'use client'

import { useRef, useEffect, useState } from 'react'

export function HeroVideo({ videoSrc }: { videoSrc?: string }) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        if (!isMounted) return
        
        const video = videoRef.current
        if (video) {
            video.playbackRate = 0.75
            
            const playVideo = async () => {
                try {
                    await video.play()
                } catch (error) {
                    console.error('Autoplay failed:', error)
                }
            }
            
            if (video.paused) {
                playVideo()
            }
            
            video.addEventListener('loadeddata', playVideo)
            
            return () => {
                video.removeEventListener('loadeddata', playVideo)
            }
        }
    }, [videoSrc, isMounted])

    return (
        <div className="relative w-full h-[600px] md:h-full rounded-2xl overflow-hidden shadow-2xl">
            <video
                key={videoSrc}
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
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
