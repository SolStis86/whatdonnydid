// Leaflet map renderer patch: avoid custom divIcon label markers, which can conflict with Leaflet/CSS and render as broken tile-like blocks.
renderMap = function renderMap() {
  const mount = document.getElementById("risk-map");
  if (!mount) return;

  if (!window.L) {
    mount.innerHTML = "<p style='padding:1rem;color:#afa8a0'>Interactive map could not load. Check the map package connection.</p>";
    return;
  }

  if (!riskMapInstance) {
    riskMapInstance = L.map(mount, {
      zoomControl: true,
      scrollWheelZoom: false,
      worldCopyJump: true,
      attributionControl: true,
      maxBounds: [[-70, -180], [82, 180]],
      maxBoundsViscosity: 0.6
    }).setView([16, 35], 2);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 8,
      minZoom: 2,
      attribution: "&copy; OpenStreetMap &copy; CARTO"
    }).addTo(riskMapInstance);

    riskMarkerLayer = L.layerGroup().addTo(riskMapInstance);
    setTimeout(() => riskMapInstance.invalidateSize(), 120);
  }

  riskMarkerLayer.clearLayers();
  riskMarkers.clear();

  DATA.regions.forEach(region => {
    const score = composite(region);
    const regionScenario = region[activeScenario];
    const radius = productionRadius(regionScenario.productionRiskMt);
    const selected = region.id === selectedRegionId;

    const marker = L.circleMarker([region.lat, region.lon], {
      radius,
      color: selected ? "#f5efe7" : "rgba(255,255,255,.74)",
      weight: selected ? 3 : 1.4,
      fillColor: riskColor(score),
      fillOpacity: 0.9,
      opacity: 1
    }).addTo(riskMarkerLayer);

    marker.bindTooltip(region.name, {
      permanent: true,
      direction: "right",
      offset: [radius + 8, -radius - 4],
      className: "risk-marker-label"
    });

    marker.on("mouseover", () => {
      marker.setStyle({ weight: 3, color: "#f5efe7" });
    });

    marker.on("mouseout", () => {
      marker.setStyle({ weight: selected ? 3 : 1.4, color: selected ? "#f5efe7" : "rgba(255,255,255,.74)" });
    });

    marker.on("click", () => {
      selectedRegionId = region.id;
      renderMap();
      renderRegionDetail(region);
    });

    riskMarkers.set(region.id, marker);
  });

  const legend = document.querySelector(".map-legend");
  if (legend) {
    legend.innerHTML = `<span><i class="low"></i> Low composite exposure</span><span><i class="medium"></i> Medium</span><span><i class="high"></i> High</span><span><i class="critical"></i> Critical</span><span class="legend-note">Circle size indicates production-at-risk.</span>`;
  }
};
