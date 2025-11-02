import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface CountryMapProps {
  coordinates: [number, number];
  countryName: string;
}

export default function CountryMap({ coordinates, countryName }: CountryMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapRef.current).setView(coordinates, 5);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    const customIcon = L.divIcon({
      className: "custom-marker",
      html: `<div class="w-8 h-8 bg-primary rounded-full border-4 border-primary-foreground shadow-lg flex items-center justify-center">
        <div class="w-3 h-3 bg-primary-foreground rounded-full"></div>
      </div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    L.marker(coordinates, { icon: customIcon })
      .addTo(map)
      .bindPopup(`<strong>${countryName}</strong>`)
      .openPopup();

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [coordinates, countryName]);

  return (
    <div
      ref={mapRef}
      className="w-full h-96 md:h-[500px]"
      data-testid="map-country"
    />
  );
}
