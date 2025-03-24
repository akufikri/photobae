"use client";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter } from "../ui/card";
import { Image } from "lucide-react";

export function NotFound() {
  return (
    <>
      <Image className="w-15 h-15 text-gray-400" />
      <CardDescription>{"No photos taken yet"}</CardDescription>
    </>
  );
}

export function RecentPhotos({ photos }: { photos: string[] }) {
  return (
    <Card className="h-[500px] w-[300px] border-0">
      <CardContent className="flex flex-col items-center justify-start gap-2 h-full w-full overflow-y-auto">
        {photos.length > 0 ? (
          photos.map((photo, index) => (
            <Card key={index} className="w-full h-[200px] border-0 flex items-center justify-center overflow-hidden rounded-lg">
              <CardContent className="p-0">
                <img src={photo} alt={`Captured ${index}`} className="w-full h-full object-cover" />
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full w-full text-gray-400">
            <Image className="w-15 h-15" />
            <CardDescription>{"No photos taken yet"}</CardDescription>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

