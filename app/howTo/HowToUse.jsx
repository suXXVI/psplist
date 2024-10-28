"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

export default function HowToUse() {
  const route = useRouter();
  return (
    <div className='p-5'>
      <h1 className='text-3xl font-bold mb-10'>How To Use</h1>

      <div className='flex flex-col gap-5'>
        <p>1. Create a <span className='text-sky-600'>Library</span> folder inside <span className='text-sky-600'>/MUSIC/</span></p>
        <p>2. Copy all your audio files into <span className='text-sky-600'>/MUSIC/Library/</span></p>
        <p>3. After copying your audio files to <span className='text-sky-600'>/MUSIC/Library/</span>, copy the names of the songs (without the extension, the app will handle that) and add them to the webapp.</p>
        <p>4. Make sure to select the correct extension of your audio files <span className='text-sky-600'>(.mp3, .m4a)</span> before pressing &apos;Add Song&apos;.</p>
        <p>5. After downloading the .m3u8 file, rename it to anything you want and place it under <span className='text-sky-600'>/PSP/Playlist/MUSIC/</span></p>
        <p>6. You can also drag and drop an existing <span className='text-sky-600'>.m3u8</span> file to update it with new tracks.</p>
      </div>

      <button
        onClick={() => route.back()}
        className='py-2 px-5  bg-sky-400 active:bg-sky-700 rounded-md mt-8'>Go Back</button>
    </div>
  )
}
