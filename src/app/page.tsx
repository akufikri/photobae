"use client"

import { useState } from "react";
import { PanelShoots } from "@/components/photos/PanelShoots";
import { RecentPhotos } from "@/components/photos/RecentPhotos";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const [photos, setPhotos] = useState<string[]>([]);
  const maxPhotos = 3; // Batas maksimal foto

  const addPhoto = (photo: string) => {
    if (photos.length < maxPhotos) {
      setPhotos((prev) => [photo, ...prev]); // Tambahkan foto baru
    }
  };

  return (
    <main className="h-screen p-5 bg-cover bg-center" style={{ backgroundImage: "var(--bg-image)" }}>
      <Card className="h-full w-full bg-white-600 rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <CardContent className="flex items-center justify-center gap-4 w-full h-full">
          <PanelShoots addPhoto={addPhoto} photoCount={photos.length} maxPhotos={maxPhotos} />
          <RecentPhotos photos={photos} />
        </CardContent>
      </Card>
    </main>
  );
}
