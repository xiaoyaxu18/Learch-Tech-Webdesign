"use client"

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { ObjectId } from 'mongodb'
import { Video } from '@/app/types/course'
import VideoPlayer from '@/app/components/courses/VideoPlayer'
import { useAuth } from '@/app/contexts/AuthContext'
import Link from 'next/link'

export default function VideoLecturePage() {
  const params = useParams()
  const courseId = typeof params?.courseId === 'string' ? params.courseId : ''
  const { user } = useAuth()
  const isAdmin = user?.role === 'admin'
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [videos, setVideos] = useState<({ _id: string } & Video)[]>([])

  useEffect(() => {
    if (courseId) {
      fetch(`/api/courses/${courseId}/videos`)
        .then(res => res.json())
        .then(data => {
          const normalized = data.map((v: any) => ({
            ...v,
            _id: typeof v._id === 'object' && '$oid' in v._id ? v._id.$oid : v._id
          }))
          setVideos(normalized)
          if (normalized.length > 0) {
            setSelectedVideo(normalized[0])
          }
        })
    }
  }, [courseId])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-white">Video Lectures</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/5 rounded-xl overflow-hidden">
          {selectedVideo ? (
            <VideoPlayer
              key={selectedVideo._id}
              url={encodeURI(selectedVideo.url)}
              title={selectedVideo.title}
            />
          ) : (
            <div className="aspect-video flex items-center justify-center text-gray-400">
              Select a video to start learning
            </div>
          )}
        </div>
        <div className="bg-white/5 rounded-xl p-4">
          <h3 className="text-lg font-medium text-white mb-4">Course Videos</h3>
          <div className="space-y-2">
            {videos.map((video) => (
              <button
                key={video._id}
                onClick={() => setSelectedVideo(video)}
                className={`block w-full text-left flex items-start gap-3 p-3 rounded-lg transition-colors
                  ${selectedVideo?._id === video._id 
                    ? 'bg-[#2493DF]/20 text-[#2493DF]' 
                    : 'hover:bg-white/5 text-white'
                  }`}
              >
                <div className="flex-1 text-left">
                  <h4 className="font-medium">{video.title}</h4>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}