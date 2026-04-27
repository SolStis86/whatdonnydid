// MapLibre GL risk map renderer: heatmap + circles from the regional risk model.
// Labels are rendered as HTML markers to avoid external glyph/font dependencies.
let mapLibreInstance = null;
let mapLibreLoaded = false;
let mapLibreLabelMarkers = [];

function buildRiskGeoJson() {
  return {
    type: "FeatureCollection",
    features: DATA.regions.map(region => {
      const scenario = region[activeScenario];
      const score = composite(region);
      return {
        type: "Feature",
        id: region.id,
        geometry: {
          type: "Point",
          coordinates: [region.lon, region.lat]
        },
        properties: {
          id: region.id,
          name: region.name,
          country: region.country,
          score,
          productionRiskMt: scenario.productionRiskMt,
          foodStress: scenario.foodStress,
          nutrientShortfall: scenario.nutrientShortfall,
          yieldAtRisk: scenario.yieldAtRisk,
          selected: region.id === selectedRegionId ? 1 : 0
        }
      };
    })
  };
}

function mapLibreStyle() {
  return {
    version: 8,
    sources: {
      cartoDark: {
        type: "raster",
        tiles: [
          "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
          "https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
          "https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
        ],
        tileSize: 256,
        attribution: "© OpenStreetMap contributors © CARTO"
      }
    },
    layers: [
      {
        id: "background",
        type: "background",
        paint: { "background-color": "#070a0f" }
      },
      {
        id: "carto-dark",
        type: "raster",
        source: "cartoDark",
        paint: {
          "raster-opacity": 0.72,
          "raster-saturation": -0.25,
          "raster-contrast": 0.1,
          "raster-brightness-min": 0,
          "raster-brightness-max": 0.74
        }
      }
    ]
  };
}

function scoreColorExpression() {
  return [
    "step",
    ["get", "score"],
    "#22c55e",
    40,
    "#fbbf24",
    65,
    "#f97316",
    85,
    "#ef4444"
  ];
}

function clearMapLibreLabels() {
  mapLibreLabelMarkers.forEach(marker => marker.remove());
  mapLibreLabelMarkers = [];
}

function renderMapLibreLabels() {
  if (!mapLibreInstance) return;
  clearMapLibreLabels();

  DATA.regions.forEach(region => {
    const label = document.createElement("button");
    label.type = "button";
    label.className = `maplibre-risk-label${region.id === selectedRegionId ? " is-selected" : ""}`;
    label.textContent = region.name;
    label.setAttribute("aria-label", `Select ${region.name}, ${region.country}`);
    label.addEventListener("click", event => {
      event.stopPropagation();
      selectedRegionId = region.id;
      updateRiskSource();
      renderRegionDetail(region);
      renderMapLibreLabels();
    });

    const marker = new maplibregl.Marker({ element: label, anchor: "left", offset: [12, -12] })
      .setLngLat([region.lon, region.lat])
      .addTo(mapLibreInstance);

    mapLibreLabelMarkers.push(marker);
  });
}

renderMap = function renderMap() {
  const mount = document.getElementById("risk-map");
  if (!mount) return;

  if (!window.maplibregl) {
    mount.innerHTML = "<p style='padding:1rem;color:#afa8a0'>Interactive map could not load. Check the MapLibre package connection.</p>";
    return;
  }

  const data = buildRiskGeoJson();

  if (!mapLibreInstance) {
    mount.innerHTML = "";
    mapLibreInstance = new maplibregl.Map({
      container: mount,
      style: mapLibreStyle(),
      center: [35, 16],
      zoom: 1.45,
      minZoom: 1.2,
      maxZoom: 5.5,
      attributionControl: true,
      renderWorldCopies: false,
      dragRotate: false,
      pitchWithRotate: false
    });

    mapLibreInstance.scrollZoom.disable();
    mapLibreInstance.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-left");

    mapLibreInstance.on("load", () => {
      mapLibreLoaded = true;
      mapLibreInstance.addSource("risk-regions", { type: "geojson", data });

      mapLibreInstance.addLayer({
        id: "risk-heat",
        type: "heatmap",
        source: "risk-regions",
        maxzoom: 5.5,
        paint: {
          "heatmap-weight": ["interpolate", ["linear"], ["get", "score"], 0, 0.3, 40, 0.6, 100, 1],
          "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 1, 2.5, 5.5, 6],
          "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 1, 180, 5.5, 500],
          "heatmap-opacity": 0.84,
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0,
            "rgba(0,0,0,0)",
            0.08,
            "rgba(34,197,94,0.55)",
            0.3,
            "rgba(251,191,36,0.75)",
            0.55,
            "rgba(249,115,22,0.88)",
            0.8,
            "rgba(239,68,68,0.95)",
            1,
            "rgba(200,30,30,1)"
          ]
        }
      });

      mapLibreInstance.addLayer({
        id: "risk-points",
        type: "circle",
        source: "risk-regions",
        paint: {
          "circle-radius": [
            "interpolate",
            ["linear"],
            ["get", "productionRiskMt"],
            0,
            7,
            1,
            10,
            3,
            15,
            7,
            23
          ],
          "circle-color": scoreColorExpression(),
          "circle-opacity": 0.96,
          "circle-stroke-color": ["case", ["==", ["get", "selected"], 1], "#f5efe7", "rgba(255,255,255,0.78)"],
          "circle-stroke-width": ["case", ["==", ["get", "selected"], 1], 3.2, 1.4]
        }
      });

      mapLibreInstance.on("click", "risk-points", event => {
        const feature = event.features && event.features[0];
        if (!feature) return;
        selectedRegionId = feature.properties.id;
        const region = DATA.regions.find(item => item.id === selectedRegionId);
        updateRiskSource();
        renderRegionDetail(region);
        renderMapLibreLabels();
      });

      mapLibreInstance.on("mouseenter", "risk-points", () => {
        mapLibreInstance.getCanvas().style.cursor = "pointer";
      });

      mapLibreInstance.on("mouseleave", "risk-points", () => {
        mapLibreInstance.getCanvas().style.cursor = "";
      });

      loadOceanMask(mapLibreInstance);
      renderMapLibreLabels();
    });
  } else {
    updateRiskSource(data);
    renderMapLibreLabels();
  }

  const legend = document.querySelector(".map-legend");
  if (legend) {
    legend.innerHTML = `<span><i class="low"></i> Low composite exposure</span><span><i class="medium"></i> Medium</span><span><i class="high"></i> High</span><span><i class="critical"></i> Critical</span><span class="legend-note">Circle size indicates production-at-risk. Heat intensity shows clustered pressure.</span>`;
  }
};

function updateRiskSource(data = buildRiskGeoJson()) {
  if (!mapLibreInstance || !mapLibreLoaded) return;
  const source = mapLibreInstance.getSource("risk-regions");
  if (source) source.setData(data);
}

async function loadOceanMask(map) {
  try {
    const res = await fetch("https://cdn.jsdelivr.net/gh/nvkelso/natural-earth-vector@master/geojson/ne_110m_land.geojson");
    if (!res.ok) return;
    const land = await res.json();

    // Build ocean polygon: world bbox (CCW outer ring) with land areas as holes (CW inner rings)
    const outerRing = [[-180, -85], [-180, 85], [180, 85], [180, -85], [-180, -85]];
    const rings = [outerRing];
    land.features.forEach(f => {
      const geom = f.geometry;
      if (geom.type === "Polygon") {
        rings.push([...geom.coordinates[0]].reverse());
      } else if (geom.type === "MultiPolygon") {
        geom.coordinates.forEach(poly => rings.push([...poly[0]].reverse()));
      }
    });

    map.addSource("ocean-mask", {
      type: "geojson",
      data: { type: "Feature", geometry: { type: "Polygon", coordinates: rings } }
    });
    // Insert above heatmap but below the clickable circle points
    map.addLayer({
      id: "ocean-fill",
      type: "fill",
      source: "ocean-mask",
      paint: { "fill-color": "#070a0f", "fill-opacity": 0.96 }
    }, "risk-points");
  } catch (_) {
    // silently degrade — map still works without the land mask
  }
}
