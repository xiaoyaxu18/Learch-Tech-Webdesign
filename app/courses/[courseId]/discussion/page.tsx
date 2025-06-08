// app/courses/[courseId]/discussion/page.tsx

'use client'

export default function DiscussionPage() {
    return (
      <div className="flex flex-col items-center justify-center h-full mt-20">
        <h1 className="text-2xl font-bold text-white mb-4">Course Discussion</h1>
        <p className="text-gray-300 mb-8">This is the placeholder for discussion content.</p>
        <a
          href="https://discord.gg/你的Discord邀请码" // 替换为你的 Discord 链接
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#5865F2] text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-[#4752c4] transition"
        >
          Join our Discord Community
        </a>
      </div>
    )
  }