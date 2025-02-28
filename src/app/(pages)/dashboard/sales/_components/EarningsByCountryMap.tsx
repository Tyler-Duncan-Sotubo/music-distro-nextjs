// src/StreamsByCountryMap.tsx
import React from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import { scaleLinear } from "d3-scale";
import {
  type FeatureCollection,
  type Feature,
  type GeometryObject,
} from "geojson";
import "leaflet/dist/leaflet.css";
import type L from "leaflet";
import { type ICountryReport } from "../_types/sales.types";

interface StreamsByCountryMapProps {
  data: ICountryReport[] | undefined;
  geography: FeatureCollection<GeometryObject>;
}

const EarningsByCountryMap: React.FC<StreamsByCountryMapProps> = ({
  data,
  geography,
}) => {
  const maxStreams = Math.max(...(data ?? []).map((d) => d.earnings));
  const colorScale = scaleLinear<string>()
    .domain([0, maxStreams])
    .range(["#e0f7fr", "#00796b"]);

  // Use the L.Path type for layer
  const onEachCountry = (feature: Feature<GeometryObject>, layer: L.Path) => {
    const countryData = data?.find((d) => d.id === feature.id);
    // Set style for the country feature
    layer.setStyle({
      fillColor: countryData ? colorScale(countryData.earnings) : "#e0f7fr",
      fillOpacity: 0.7,
      color: "#FFF",
      weight: 1,
    });

    // Add tooltip with stream details
    if (countryData) {
      const tooltipContentHtml = `
      <strong>${countryData?.name}</strong>
      <br/>
      Royalty: $${countryData?.earnings.toLocaleString()}
      <br/>
      Streams: ${countryData?.streams.toLocaleString()}
      `;
      const tooltipContent = tooltipContentHtml;
      layer.bindTooltip(tooltipContent, {
        permanent: false,
        direction: "auto",
        className: "custom-tooltip",
      });
    } else {
      layer.bindTooltip("No data available", {
        permanent: false,
        direction: "auto",
        className: "custom-tooltip",
      });
    }
  };

  return (
    <div className="mx-auto w-full max-w-[900px]">
      <MapContainer
        style={{
          width: "100%",
          height: "auto",
          aspectRatio: "16/9",
          backgroundColor: "#fff",
        }}
        zoom={1}
        center={[20, 0]}
        scrollWheelZoom={false}
        zoomControl={false}
        dragging={false}
        doubleClickZoom={false}
        touchZoom={false}
        attributionControl={false}
      >
        <GeoJSON data={geography} onEachFeature={onEachCountry} />
      </MapContainer>
    </div>
  );
};

export default EarningsByCountryMap;
