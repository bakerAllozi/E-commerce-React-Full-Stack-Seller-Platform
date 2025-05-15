import React, { useEffect, useState } from 'react';

const WebRTC = () => {
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);

  const openMicrophone = async () => {
    const constraints = {
      audio: { echoCancellation: true, noiseSuppression: true },
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setAudioStream(stream);
      setIsStreaming(true);
    } catch (error: any) {
      console.error('Error accessing microphone:', error.name, error.message);
    }
  };

  const stopMicrophone = () => {
    if (audioStream) {
      audioStream.getTracks().forEach((track) => track.stop());
      setAudioStream(null);
      setIsStreaming(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">الدردشة الصوتية</h2>

      {!isStreaming ? (
        <button
          onClick={openMicrophone}
          className="mt-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          بدء الدردشة الصوتية
        </button>
      ) : (
        <button
          onClick={stopMicrophone}
          className="mt-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          إيقاف الدردشة الصوتية
        </button>
      )}
    </div>
  );
};

export default WebRTC;
