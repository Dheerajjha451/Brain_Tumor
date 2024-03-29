"use client"
import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPhoneSlash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const RoomPage = () => {
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoPaused, setIsVideoPaused] = useState(false);
    const [stream, setStream] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const socket = io();

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(mediaStream => {
                setStream(mediaStream);
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = mediaStream;
                }

                const roomName = localStorage.getItem('roomName');
                socket.emit('joinRoom', roomName);

                mediaStream.getTracks().forEach(track => {
                    socket.emit('addTrack', track, mediaStream.id);
                });

                socket.on('addRemoteTrack', ({ track, streamId }) => {
                    const mediaStream = new MediaStream();
                    mediaStream.addTrack(track);
                    remoteVideoRef.current.srcObject = mediaStream;
                });
            })
            .catch(err => {
                console.error('Error accessing media devices:', err);
            });

        return () => {
            socket.disconnect();
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const toggleMute = () => {
        if (stream) {
            stream.getAudioTracks().forEach(track => {
                track.enabled = !isMuted;
            });
            setIsMuted(!isMuted);
        }
    };

    const toggleVideo = () => {
        if (stream) {
            stream.getVideoTracks().forEach(track => {
                track.enabled = !isVideoPaused;
            });
            setIsVideoPaused(!isVideoPaused);
        }
    };

    const leaveCall = () => {
        router.push('/'); 
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="mb-4 text-3xl font-semibold">Room</h1>
            <div className="mb-4">
                <button className="mr-2 p-2 text-2xl bg-transparent border-none rounded-full text-gray-600 hover:text-gray-800" onClick={toggleMute}>{isMuted ? <FaMicrophone /> : <FaMicrophoneSlash />}</button>
                <button className="mr-2 p-2 text-2xl bg-transparent border-none rounded-full text-gray-600 hover:text-gray-800" onClick={toggleVideo}>{isVideoPaused ? <FaVideo /> : <FaVideoSlash />}</button>
                <button className="p-2 text-2xl bg-transparent border-none rounded-full text-red-600 hover:text-red-800" onClick={leaveCall}><FaPhoneSlash /></button>
            </div>
            <div className="flex justify-center">
                <video ref={localVideoRef} autoPlay muted playsInline className="w-64 h-48 mr-4 border border-gray-400 rounded-md"></video>
                <video ref={remoteVideoRef} autoPlay playsInline className="w-64 h-48 border border-gray-400 rounded-md"></video>
            </div>
        </div>
    );
};

export default RoomPage;
