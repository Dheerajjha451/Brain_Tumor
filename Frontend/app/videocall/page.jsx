"use client"
import { useState } from 'react';
import io from 'socket.io-client';
import { useRouter } from 'next/navigation';

const VideoCallPage = () => {
    const [roomName, setRoomName] = useState('');
    const [isJoining, setIsJoining] = useState(false);
    const router = useRouter();

    const handleJoinClick = () => {
        setIsJoining(true);
    };

    const handleCreateClick = () => {
        const socket = io();
        socket.emit('createRoom');
        router.push('/room');
    };

    const handleRoomNameChange = (event) => {
        setRoomName(event.target.value);
    };

    const handleJoinRoom = () => {
        if (roomName.trim() !== '') {
            const socket = io();
            socket.emit('joinRoom', roomName.trim());
            router.push('/room');
        }
    };

    const handleBackToDashboard = () => {
        router.push('/dashboard');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="mb-4 text-3xl font-semibold">Video Call</h1>
            {!isJoining && (
                <div className="mb-4">
                    <button onClick={handleJoinClick} className="p-2 text-2xl bg-transparent border border-gray-600 rounded-md text-gray-600 hover:text-gray-800">Join Meeting</button>
                </div>
            )}
            {isJoining && (
                <div className="mb-4">
                    <input 
                        type="text"
                        value={roomName}
                        onChange={handleRoomNameChange}
                        placeholder="Enter room name"
                        className="mr-2 p-2 border border-gray-400 rounded-md"
                    />
                    <button onClick={handleJoinRoom} className="p-2 text-2xl bg-transparent border border-gray-600 rounded-md text-gray-600 hover:text-gray-800">Join</button>
                </div>
            )}
            <button onClick={handleBackToDashboard} className="p-2 text-2xl bg-transparent border border-gray-600 rounded-md text-gray-600 hover:text-gray-800">Back to Home</button>
        </div>
    );
};

export default VideoCallPage;
