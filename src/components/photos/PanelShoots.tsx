"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image"; // Import next/image
import { Card, CardContent, CardFooter } from "../ui/card";
import { Camera, Grid2x2, Sparkles } from "lucide-react";

export function PanelShoots({ addPhoto, photoCount, maxPhotos }: { addPhoto: (photo: string) => void; photoCount: number; maxPhotos: number; }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const openCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };
    openCamera();
  }, []);

  const handleTakePhoto = () => {
    if (photoCount >= maxPhotos) return; // Batasi hanya 3 foto

    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;

        context.translate(canvasRef.current.width, 0);
        context.scale(-1, 1);
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        context.setTransform(1, 0, 0, 1, 0, 0);

        const imageData = canvasRef.current.toDataURL("image/png");
        addPhoto(imageData);
      }
    }
  };

  return (
    <Card className="relative h-[500px] border-0 max-w-2xl w-full flex flex-col overflow-hidden p-0">
      <CardContent className="flex-grow relative">
        <video ref={videoRef} className="absolute top-0 left-0 w-full h-full object-cover rounded-lg" autoPlay playsInline style={{ transform: "scaleX(-1)" }} />
      </CardContent>
      <CardFooter className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-4">
        <button className="w-14 h-14 border flex shadow bg-white hover:bg-gray-50 transition-all items-center justify-center rounded-full">
          <Grid2x2 className="w-6 h-6"/>
        </button>
        <button 
          onClick={handleTakePhoto} 
          disabled={photoCount >= maxPhotos}
          className={`w-16 h-16 border flex shadow items-center justify-center rounded-full 
            ${photoCount >= maxPhotos ? "bg-gray-300 cursor-not-allowed" : "bg-white hover:bg-gray-50 transition-all"}`}
        >
          <Camera className="w-8 h-8" />
        </button>
        <button className="w-14 h-14 border flex shadow bg-white hover:bg-gray-50 transition-all items-center justify-center rounded-full">
          <Sparkles className="w-6 h-6" />
        </button>
      </CardFooter>
      <canvas ref={canvasRef} className="hidden" />
    </Card>
  );
}
