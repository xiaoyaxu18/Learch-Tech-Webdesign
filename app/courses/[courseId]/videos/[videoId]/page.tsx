"use client"

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Video } from '@/app/types/course'
import VideoPlayer from '@/app/components/courses/VideoPlayer'
import { useAuth } from '@/app/contexts/AuthContext'

export default function VideoLecturePage() {
  const { courseId } = useParams() as { courseId: string }
  const { user } = useAuth()
  const isAdmin = user?.role === 'admin'
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [videos, setVideos] = useState<Video[]>([])

  useEffect(() => {
    if (courseId) {
      fetch(`/api/courses/${courseId}/videos`)
        .then(res => res.json())
        .then(data => {
          setVideos(data)
          if (data.length > 0) {
            setSelectedVideo(data[0]) // 默认播放第一个视频
          }
        })
    }
  }, [courseId])

  return (
    <div className="space-y-6 p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold text-white">课程视频</h2>

      {/* 视频播放器区域 */}
      <div className="bg-white/5 rounded-xl overflow-hidden">
        {selectedVideo ? (
          <VideoPlayer url={selectedVideo.url} title={selectedVideo.title} />
        ) : (
          <div className="aspect-video flex items-center justify-center text-gray-400">
            没有可播放的视频
          </div>
        )}
      </div>

      {/* 视频列表区域 */}
      <div className="bg-white/5 rounded-xl p-4">
        <h3 className="text-lg font-medium text-white mb-4">视频列表</h3>
        <div className="space-y-2">
          {videos.map((video) => (
            <button
              key={video._id}
              onClick={() => setSelectedVideo(video)}
              className={`w-full flex items-start gap-3 p-3 rounded-lg transition-colors
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
  )
}