import supabase from "@/backend/supabase";
import { useEffect, useRef, useState } from "react";

const config = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
};

const peerConnection = new RTCPeerConnection(config);

function WebRTC() {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    const setupSupabaseChannel = async () => {
      const rtcChannel = supabase.channel("video-chat");

      rtcChannel.on("broadcast", { event: "offer" }, async (payload) => {
        if (!peerConnection.remoteDescription) {
          await peerConnection.setRemoteDescription(new RTCSessionDescription(payload.data));
          const answer = await peerConnection.createAnswer();
          await peerConnection.setLocalDescription(answer);
          rtcChannel.send({ type: "broadcast", event: "answer", data: answer });
        }
      });

      rtcChannel.on("broadcast", { event: "answer" }, async (payload) => {
        if (!peerConnection.currentRemoteDescription) {
          await peerConnection.setRemoteDescription(new RTCSessionDescription(payload.data));
        }
      });

      rtcChannel.on("broadcast", { event: "ice-candidate" }, async (payload) => {
        if (payload.data) {
          await peerConnection.addIceCandidate(new RTCIceCandidate(payload.data));
        }
      });

      await rtcChannel.subscribe();
      setChannel(rtcChannel);
    };

    setupSupabaseChannel();

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        channel?.send({ type: "broadcast", event: "ice-candidate", data: event.candidate });
      }
    };

    peerConnection.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };
  }, [channel]);

  const startCall = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideoRef.current.srcObject = stream;
    stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    channel?.send({ type: "broadcast", event: "offer", data: offer });
  };

  return (
    <div>
      <video ref={localVideoRef} autoPlay playsInline />
      <video ref={remoteVideoRef} autoPlay playsInline />
      <button onClick={startCall}>بدء المكالمة</button>
    </div>
  );
}

export default WebRTC;
