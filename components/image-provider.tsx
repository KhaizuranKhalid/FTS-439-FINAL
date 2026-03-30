"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface ImageContextType {
  baseUrl: string;
}

const ImageContext = createContext<ImageContextType>({ baseUrl: "" });

export const useImageContext = () => useContext(ImageContext);

interface ImageProviderProps {
  children: React.ReactNode;
}

export function ImageProvider({ children }: ImageProviderProps) {
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { protocol, hostname, port } = window.location;

      if (hostname === "localhost" && port === "3000" && protocol === "http:") {
        setBaseUrl("");
      } else if (hostname.includes(".github.dev")) {
        return;
      } else if (protocol === "https:" && hostname !== "localhost") {
        setBaseUrl("https://khaizurankhalid.github.io/FTS-439-Interim");
      } else {
        setBaseUrl("");
      }
    }
  }, []);

  return (
    <ImageContext.Provider value={{ baseUrl }}>
      {children}
    </ImageContext.Provider>
  );
}
