import React, { useEffect, useState } from 'react';

const WebRTC = () => {
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string>('');
  const [isStreaming, setIsStreaming] = useState<boolean>(false);

  const getConnectedDevices = async (type: MediaDeviceKind) => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter((device) => device.kind === type);
  };

  const updateCameraList = async () => {
    const videoCameras = await getConnectedDevices('videoinput');
    setCameras(videoCameras);
    if (videoCameras.length > 0 && !selectedCamera) {
      setSelectedCamera(videoCameras[0].deviceId);
    }
  };

  const openCamera = async (cameraId: string) => {
    const constraints = {
      video: {
        deviceId: cameraId ? { exact: cameraId } : undefined,
        width: { ideal: 1280 },
        height: { ideal: 720 },
      },
      audio: { echoCancellation: true },
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setVideoStream(stream);
      setIsStreaming(true);
    } catch (error: any) {
      console.error('Error accessing media devices:', error.name, error.message);
      if (error.name === 'OverconstrainedError') {
        console.warn('The specified camera constraints are too strict. Trying without resolution constraints.');
        fallbackCamera(cameraId);
      }
    }
  };

  const fallbackCamera = async (cameraId: string) => {
    const fallbackConstraints = {
      video: { deviceId: cameraId ? { exact: cameraId } : undefined },
      audio: true,
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(fallbackConstraints);
      setVideoStream(stream);
      setIsStreaming(true);
    } catch (error) {
      console.error('Failed to access camera without constraints:', error);
    }
  };

  const stopCamera = () => {
    if (videoStream) {
      videoStream.getTracks().forEach((track) => track.stop());
      setVideoStream(null);
      setIsStreaming(false);
    }
  };

  useEffect(() => {
    updateCameraList();
    navigator.mediaDevices.addEventListener('devicechange', updateCameraList);
    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', updateCameraList);
    };
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Local Video Chat</h2>

      <video
        id="localVideo"
        autoPlay
        playsInline
        controls={false}
        width="640"
        height="480"
        className="border rounded-lg"
        ref={(videoElement) => {
          if (videoElement && videoStream) {
            videoElement.srcObject = videoStream;
          }
        }}
      />

      <div className="mt-4 flex flex-col space-y-2">
        <label htmlFor="availableCameras" className="block font-medium">
          اختر الكاميرا:
        </label>
        <select
          id="availableCameras"
          value={selectedCamera}
          onChange={(e) => setSelectedCamera(e.target.value)}
          className="p-2 border rounded"
        >
          {cameras.map((camera) => (
            <option key={camera.deviceId} value={camera.deviceId}>
              {camera.label || `Camera ${camera.deviceId}`}
            </option>
          ))}
        </select>

        {!isStreaming ? (
          <button
            onClick={() => openCamera(selectedCamera)}
            className="mt-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            بدء الدردشة
          </button>
        ) : (
          <button
            onClick={stopCamera}
            className="mt-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            إيقاف الدردشة
          </button>
        )}
      </div>
    </div>
  );
};

export default WebRTC;
