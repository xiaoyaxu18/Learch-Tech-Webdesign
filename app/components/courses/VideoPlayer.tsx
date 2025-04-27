"use client"

import React from 'react'

interface VideoPlayerProps {
  url: string
  title: string
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, title }) => {
  return (
    <div>
      <video controls width="100%">
        <source src={url} type="video/mp4" />
        您的浏览器不支持 HTML5 视频。
      </video>
      <h3>{title}</h3>
    </div>
  )
}

export default VideoPlayer 