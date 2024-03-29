"use client"
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Home() {
  const router = useRouter()
  const [roomName, setRoomName] = useState('')

  const joinRoom = () => {
    router.push(`/room/${roomName || Math.random().toString(36).slice(2)}`)
  }

  return (
    <div>
      <h1>Lets join a room!</h1>
      <input onChange={(e) => setRoomName(e.target.value)} value={roomName} />
      <button onClick={joinRoom} type="button">Join Room</button>
    </div>
  )
}
