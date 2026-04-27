const DATA = {
  scenarios: {
    lower: { label: "Lower bound", description: "A short disruption where inventories, alternative suppliers and policy support absorb much of the shock.", global: { ureaExposure: "12%", ammoniaTradeAtRisk: "9%", yieldPressure: "3–8%", foodPriceRisk: "Low–Medium", populationExposed: "420M" } },
    base: { label: "Base case", description: "A sustained 3–6 month squeeze where fertiliser and fuel prices stay elevated through key planting windows.", global: { ureaExposure: "24%", ammoniaTradeAtRisk: "18%", yieldPressure: "7–18%", foodPriceRisk: "Medium–High", populationExposed: "870M" } },
    upper: { label: "Upper bound", description: "A prolonged 6–12 month disruption with tighter shipping, weaker substitution and sharper affordability pressure.", global: { ureaExposure: "41%", ammoniaTradeAtRisk: "31%", yieldPressure: "14–34%", foodPriceRisk: "High", populationExposed: "1.6B" } }
  },
  regions: [
    { id: "punjab-india", name: "Punjab", country: "India", lat: 31.1, lon: 75.3, crops: ["wheat", "rice"], driver: "Urea-heavy wheat/rice rotations and high fertiliser demand.", why: "Punjab’s rice-wheat system is highly exposed to nitrogen availability, so a fertiliser affordability shock can quickly become a harvest-risk problem.", pathway: "Urea exposure → rice/wheat application pressure → yield risk", lower: { nutrientShortfall: 8, yieldAtRisk: 6, foodStress: 48, productionRiskMt: 1.4 }, base: { nutrientShortfall: 21, yieldAtRisk: 15, foodStress: 74, productionRiskMt: 3.8 }, upper: { nutrientShortfall: 37, yieldAtRisk: 28, foodStress: 91, productionRiskMt: 7.0 } },
    { id: "mato-grosso", name: "Mato Grosso", country: "Brazil", lat: -12.6, lon: -55.7, crops: ["soy", "maize", "cotton"], driver: "High import dependence and second-crop maize exposure.", why: "Mato Grosso links fertiliser import dependency to global grain, oilseed and feed markets, making local margin pressure internationally significant.", pathway: "Imported inputs → maize/cotton pressure → export-market inflation", lower: { nutrientShortfall: 6, yieldAtRisk: 4, foodStress: 35, productionRiskMt: 1.1 }, base: { nutrientShortfall: 18, yieldAtRisk: 11, foodStress: 58, productionRiskMt: 3.6 }, upper: { nutrientShortfall: 31, yieldAtRisk: 21, foodStress: 78, productionRiskMt: 7.2 } },
    { id: "western-australia", name: "Western Australia Wheatbelt", country: "Australia", lat: -31.8, lon: 117.1, crops: ["wheat", "barley", "canola"], driver: "High import reliance for nitrogen/potash and export-market sensitivity.", why: "Western Australia is a major export grain region, so lower fertiliser access can tighten global wheat, barley and oilseed supply rather than only local food availability.", pathway: "Input import shock → wheat/canola yield pressure → export supply risk", lower: { nutrientShortfall: 7, yieldAtRisk: 5, foodStress: 24, productionRiskMt: 0.7 }, base: { nutrientShortfall: 20, yieldAtRisk: 14, foodStress: 46, productionRiskMt: 2.1 }, upper: { nutrientShortfall: 36, yieldAtRisk: 27, foodStress: 66, productionRiskMt: 4.3 } },
    { id: "oromia", name: "Oromia", country: "Ethiopia", lat: 7.9, lon: 39.4, crops: ["maize", "wheat", "teff"], driver: "Lower purchasing power, import exposure and food-security vulnerability.", why: "Oromia shows how modest input disruption can become severe when household food stress and farmer purchasing power are already fragile.", pathway: "Affordability squeeze → maize/wheat yield pressure → household food stress", lower: { nutrientShortfall: 6, yieldAtRisk: 7, foodStress: 56, productionRiskMt: 0.4 }, base: { nutrientShortfall: 19, yieldAtRisk: 18, foodStress: 82, productionRiskMt: 1.2 }, upper: { nutrientShortfall: 33, yieldAtRisk: 32, foodStress: 96, productionRiskMt: 2.5 } },
    { id: "east-anglia", name: "East Anglia", country: "United Kingdom", lat: 52.4, lon: 0.8, crops: ["wheat", "barley", "oilseed rape"], driver: "Gas-linked nitrogen costs and margin pressure for cereal farms.", why: "East Anglia is less humanitarian-risk exposed, but it demonstrates how gas-linked fertiliser prices can still squeeze cereal margins and domestic food costs.", pathway: "Gas costs → nitrogen price pressure → cereal margin squeeze", lower: { nutrientShortfall: 3, yieldAtRisk: 2, foodStress: 18, productionRiskMt: 0.1 }, base: { nutrientShortfall: 9, yieldAtRisk: 7, foodStress: 37, productionRiskMt: 0.35 }, upper: { nutrientShortfall: 18, yieldAtRisk: 15, foodStress: 59, productionRiskMt: 0.7 } },
    { id: "iowa", name: "Iowa", country: "United States", lat: 42.0, lon: -93.5, crops: ["maize", "soy"], driver: "Nitrogen-heavy corn economics, but stronger domestic resilience.", why: "Iowa is more supply-resilient than many regions, but corn’s nitrogen dependence can transmit input shocks into feed, ethanol, meat and dairy chains.", pathway: "Nitrogen costs → corn margin pressure → feed-price transmission", lower: { nutrientShortfall: 3, yieldAtRisk: 2, foodStress: 15, productionRiskMt: 0.5 }, base: { nutrientShortfall: 10, yieldAtRisk: 7, foodStress: 34, productionRiskMt: 1.8 }, upper: { nutrientShortfall: 22, yieldAtRisk: 16, foodStress: 55, productionRiskMt: 4.1 } },
    { id: "ukraine-odesa", name: "Odesa Oblast", country: "Ukraine", lat: 46.5, lon: 30.7, crops: ["wheat", "sunflower", "maize"], driver: "Compounded Black Sea, fertiliser, diesel and war-risk freight exposure.", why: "Odesa combines fertiliser exposure with existing Black Sea logistics risk, making crop and export disruption mutually reinforcing.", pathway: "Fertiliser + freight risk → wheat/sunflower pressure → export disruption", lower: { nutrientShortfall: 5, yieldAtRisk: 5, foodStress: 42, productionRiskMt: 0.3 }, base: { nutrientShortfall: 16, yieldAtRisk: 14, foodStress: 70, productionRiskMt: 0.9 }, upper: { nutrientShortfall: 31, yieldAtRisk: 29, foodStress: 90, productionRiskMt: 1.8 } },
    { id: "sindh", name: "Sindh", country: "Pakistan", lat: 26.1, lon: 68.7, crops: ["rice", "wheat", "cotton", "sugarcane"], driver: "Irrigated, nitrogen-sensitive crops with currency and affordability exposure.", why: "Sindh combines nitrogen-sensitive crops, irrigation dependence and high food-stress exposure, making fertiliser affordability a direct food-security concern.", pathway: "Urea affordability → rice/wheat yield pressure → food-stress risk", lower: { nutrientShortfall: 8, yieldAtRisk: 6, foodStress: 53, productionRiskMt: 0.6 }, base: { nutrientShortfall: 22, yieldAtRisk: 17, foodStress: 80, productionRiskMt: 1.8 }, upper: { nutrientShortfall: 39, yieldAtRisk: 31, foodStress: 95, productionRiskMt: 3.4 } }
  ],
  timeline: [{ month: "Jan", urea: 100, dap: 100, diesel: 100 }, { month: "Feb", urea: 112, dap: 106, diesel: 118 }, { month: "Mar", urea: 139, dap: 121, diesel: 141 }, { month: "Apr", urea: 162, dap: 138, diesel: 155 }, { month: "May", urea: 178, dap: 151, diesel: 164 }, { month: "Jun", urea: 191, dap: 166, diesel: 171 }],
  cropExposure: [{ crop: "Maize", nitrogen: 44, phosphate: 18, potash: 13, energy: 25 }, { crop: "Wheat", nitrogen: 39, phosphate: 22, potash: 10, energy: 29 }, { crop: "Rice", nitrogen: 41, phosphate: 16, potash: 12, energy: 31 }, { crop: "Canola", nitrogen: 46, phosphate: 20, potash: 12, energy: 22 }, { crop: "Soy", nitrogen: 8, phosphate: 26, potash: 32, energy: 34 }],
  cascade: [{ label: "Hormuz disruption", detail: "Energy, shipping and Gulf fertiliser flows are constrained." }, { label: "Gas / sulphur / ammonia shock", detail: "Core inputs for nitrogen and phosphate fertiliser tighten." }, { label: "Fertiliser shortage + affordability", detail: "Supply and price stress reduce farmer access." }, { label: "Reduced application", detail: "Farmers cut rates, delay purchases or switch crops." }, { label: "Crop yield pressure", detail: "Losses emerge through planting and harvest cycles." }, { label: "Food price pressure", detail: "Commodity, feed, meat, dairy and retail costs transmit." }],
  sources: [{ name: "IFPRI — Iran war impacts on fertiliser markets", url: "https://www.ifpri.org/blog/the-iran-wars-impacts-on-global-fertilizer-markets-and-food-production/" }, { name: "IFPRI — Will the Iran crisis lead to food price spikes?", url: "https://www.ifpri.org/blog/will-the-iran-crisis-lead-to-another-round-of-food-price-spikes/" }, { name: "EIA — Hormuz closure and production outages", url: "https://www.eia.gov/pressroom/releases/press586.php" }, { name: "FAOSTAT — Fertilisers by nutrient", url: "https://www.fao.org/statistics/events/events-detail/fertilizers-by-nutrient.-july-2025-update/en" }, { name: "NPKGRIDS — global crop fertiliser application rates", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11526156/" }, { name: "MapSPAM — spatial crop production allocation model", url: "https://www.mapspam.info/" }]
};

let activeScenario = "base";
let selectedRegionId = "sindh";
const scenarioRank = { lower: 38, base: 62, upper: 92 };
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const riskColor = score => score >= 85 ? "#ef4444" : score >= 65 ? "#f97316" : score >= 40 ? "#fbbf24" : "#22c55e";
const composite = (region, scenario = activeScenario) => Math.round((region[scenario].nutrientShortfall * .34) + (region[scenario].yieldAtRisk * .36) + (region[scenario].foodStress * .30));
const setText = (id, text) => { const node = document.getElementById(id); if (node) node.textContent = text; };
const setFirst = (selector, text) => { const node = document.querySelector(selector); if (node) node.textContent = text; };
const getSelectedRegion = () => DATA.regions.find(r => r.id === selectedRegionId) || DATA.regions[0];

function applyPublicCopy() {
  setFirst("nav a[href='#model']", "Method");
  setFirst(".hero .lede", "The chain from power to plate, traced in one place. When geopolitical escalation hits the Strait of Hormuz, the shock can move through energy markets, fertiliser supply, farm decisions and food prices — revealing who carries the cost, where, and why.");
  setFirst(".hero .method-note", "Follow the evidence chain: sourced signals, scenario ranges, regional exposure and the communities most at risk.");
  setFirst(".hero-actions .button.secondary", "How it is calculated");
  setFirst(".panel-topline span", "Scenario lens");
  const metricSmall = document.querySelectorAll(".metric-card small");
  if (metricSmall[2]) metricSmall[2].textContent = "Estimated range across exposed farming regions";
  if (metricSmall[3]) metricSmall[3].textContent = "Commodity, feed and retail pass-through";
  if (metricSmall[4]) metricSmall[4].textContent = "People living in elevated-risk regions";
  const mapText = document.querySelector("#map .section-heading p:not(.eyebrow)");
  if (mapText) mapText.textContent = "Each region’s score combines supply exposure, crop sensitivity and food-stress pressure into a single comparable index.";
}

function addSeverityLabels(panel) {
  const meter = panel.querySelector(".shock-meter");
  if (!meter || meter.nextElementSibling?.classList.contains("severity-labels")) return;
  const labels = document.createElement("div");
  labels.className = "severity-labels";
  labels.innerHTML = "<span>Lower pressure</span><span>Critical pressure</span>";
  meter.insertAdjacentElement("afterend", labels);
}

function initScenarioDock() {
  const original = document.querySelector(".hero-panel");
  if (!original) return;
  addSeverityLabels(original);
  const floating = original.cloneNode(true);
  floating.className = "scenario-float";
  floating.setAttribute("aria-label", "Floating scenario configurator");
  floating.querySelector(".mini-brief")?.remove();
  document.body.appendChild(floating);
  floating.querySelectorAll(".scenario-button").forEach(button => button.addEventListener("click", () => updateScenario(button.dataset.scenario)));
  const updateDock = () => {
    const isDesktop = window.matchMedia("(min-width: 1081px)").matches;
    const hasPassedOriginal = original.getBoundingClientRect().bottom < 96;
    floating.classList.toggle("is-visible", isDesktop && hasPassedOriginal);
  };
  window.addEventListener("scroll", updateDock, { passive: true });
  window.addEventListener("resize", updateDock);
  updateDock();
}

function updateScenario(scenario) {
  activeScenario = scenario;
  const scenarioData = DATA.scenarios[scenario];
  document.querySelectorAll(".scenario-button").forEach(btn => btn.classList.toggle("active", btn.dataset.scenario === scenario));
  document.querySelectorAll("#scenario-label, .scenario-float .panel-topline strong").forEach(node => { node.textContent = scenarioData.label; });
  document.querySelectorAll("#scenario-description, .scenario-float .scenario-description").forEach(node => { node.textContent = scenarioData.description; });
  document.querySelectorAll(".shock-meter span").forEach(meter => { meter.style.width = `${scenarioRank[scenario]}%`; });
  setText("metric-urea", scenarioData.global.ureaExposure);
  setText("metric-ammonia", scenarioData.global.ammoniaTradeAtRisk);
  setText("metric-yield", scenarioData.global.yieldPressure);
  setText("metric-price", scenarioData.global.foodPriceRisk);
  setText("metric-population", scenarioData.global.populationExposed);
  renderMap();
  renderTable();
  renderRegionDetail(getSelectedRegion());
}

function renderCascade() {
  const mount = document.getElementById("cascade");
  if (!mount) return;
  mount.innerHTML = DATA.cascade.map((item, index) => `<article class="cascade-step"><span class="cascade-index">${String(index + 1).padStart(2, "0")}</span><h3>${item.label}</h3><p>${item.detail}</p></article>`).join("");
}

const project = (lon, lat, width, height) => ({ x: ((lon + 180) / 360) * width, y: ((90 - lat) / 180) * height });
function polyPath(points, width, height) { return points.map((p, i) => { const xy = project(p[0], p[1], width, height); return `${i === 0 ? "M" : "L"}${xy.x.toFixed(1)},${xy.y.toFixed(1)}`; }).join(" ") + " Z"; }
function productionRadius(mt) { return clamp(7 + Math.sqrt(Math.max(mt, 0.1)) * 5.2, 9, 23); }

function renderMap() {
  const mount = document.getElementById("risk-map");
  if (!mount) return;
  const width = 1000, height = 540, graticule = [];
  for (let lon = -120; lon <= 120; lon += 60) { const p1 = project(lon, -72, width, height), p2 = project(lon, 72, width, height); graticule.push(`<line class="graticule" x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}"></line>`); }
  for (let lat = -60; lat <= 60; lat += 30) { const p1 = project(-175, lat, width, height), p2 = project(175, lat, width, height); graticule.push(`<line class="graticule" x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}"></line>`); }
  const continents = [
    [[-168,70],[-135,72],[-105,60],[-82,52],[-60,46],[-68,20],[-92,15],[-108,25],[-125,45],[-150,58]],
    [[-82,12],[-70,-5],[-76,-22],[-66,-55],[-48,-38],[-36,-10],[-52,6],[-65,12]],
    [[-18,35],[-5,58],[25,70],[60,62],[105,72],[150,58],[160,25],[112,10],[70,22],[38,8],[15,36]],
    [[-18,32],[12,36],[38,12],[48,-22],[30,-35],[12,-35],[-5,-22],[-15,4]],
    [[112,-12],[153,-12],[154,-37],[134,-44],[114,-32]],
    [[-52,72],[-30,75],[-18,66],[-40,58],[-56,62]],
    [[68,24],[78,30],[90,22],[82,8],[72,6]],
    [[138,38],[146,43],[143,33]]
  ].map(points => `<path class="continent" d="${polyPath(points, width, height)}"></path>`).join("");
  const points = DATA.regions.map(region => {
    const { x, y } = project(region.lon, region.lat, width, height), score = composite(region), r = region[activeScenario], radius = productionRadius(r.productionRiskMt), selected = region.id === selectedRegionId;
    return `<g data-region="${region.id}" class="map-region ${selected ? "selected" : ""}" tabindex="0" role="button" aria-label="${region.name}, ${region.country}"><circle class="risk-point" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${radius.toFixed(1)}" fill="${riskColor(score)}" opacity="0.9"></circle><circle class="risk-ring" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(radius + 5).toFixed(1)}"></circle><text class="risk-label" x="${(x + radius + 7).toFixed(1)}" y="${(y - radius - 7).toFixed(1)}">${region.name}</text></g>`;
  }).join("");
  mount.innerHTML = `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet">${graticule.join("")}<g class="continent-layer">${continents}</g>${points}</svg>`;
  mount.querySelectorAll("[data-region]").forEach(node => {
    const region = DATA.regions.find(r => r.id === node.dataset.region);
    const select = () => { selectedRegionId = region.id; renderMap(); renderRegionDetail(region); };
    node.addEventListener("click", select);
    node.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") select(); });
  });
  const legend = document.querySelector(".map-legend");
  if (legend) legend.innerHTML = `<span><i class="low"></i> Low composite exposure</span><span><i class="medium"></i> Medium</span><span><i class="high"></i> High</span><span><i class="critical"></i> Critical</span><span class="legend-note">Circle size indicates production-at-risk.</span>`;
}

function renderRegionDetail(region) {
  const mount = document.getElementById("region-detail");
  if (!mount || !region) return;
  const r = region[activeScenario], score = composite(region);
  mount.innerHTML = `<p class="eyebrow">Selected region</p><h3>${region.name}, ${region.country}</h3><div class="big-score" style="color:${riskColor(score)}">${score}<span>/100</span></div><p><strong>Composite exposure index</strong> under the ${DATA.scenarios[activeScenario].label.toLowerCase()} scenario.</p><div class="crop-pills">${region.crops.map(crop => `<span>${crop}</span>`).join("")}</div><div class="detail-grid"><div class="detail-row"><span>Nutrient shortfall</span><strong>${r.nutrientShortfall}%</strong></div><div class="detail-row"><span>Yield-at-risk</span><strong>${r.yieldAtRisk}%</strong></div><div class="detail-row"><span>Production at risk</span><strong>${r.productionRiskMt} Mt</strong></div><div class="detail-row"><span>Food-stress index</span><strong>${r.foodStress} / 100</strong></div></div><div class="pathway-line">${region.pathway}</div><p><strong>Why this matters</strong><br>${region.why}</p><p>${region.driver}</p>`;
}

function renderTable() {
  const mount = document.getElementById("regions-table");
  if (!mount) return;
  mount.innerHTML = [...DATA.regions].sort((a, b) => composite(b) - composite(a)).map((region, index) => { const r = region[activeScenario], score = composite(region); return `<tr><td><span class="score-pill" style="color:${riskColor(score)}">#${index + 1}</span></td><td><strong>${region.name}</strong><span>${region.country}</span></td><td>${region.crops.join(", ")}</td><td>${r.nutrientShortfall}%</td><td>${r.yieldAtRisk}%</td><td>${r.productionRiskMt} Mt</td><td><span class="score-pill" style="background:${riskColor(score)}22;color:${riskColor(score)}">${r.foodStress} / 100</span></td></tr>`; }).join("");
}

function linePath(values, width, height, pad, key) { const max = Math.max(...DATA.timeline.flatMap(d => [d.urea, d.dap, d.diesel])); return values.map((d, i) => { const x = pad + (i * ((width - pad * 2) / (values.length - 1))), y = height - pad - (((d[key] - 90) / (max - 90)) * (height - pad * 2)); return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`; }).join(" "); }
function renderPriceChart() { const mount = document.getElementById("price-chart"); if (!mount) return; const width = 600, height = 380, pad = 48; const monthLabels = DATA.timeline.map((d, i) => `<text class="axis" x="${pad + (i * ((width - pad * 2) / (DATA.timeline.length - 1)))}" y="${height - 18}" text-anchor="middle">${d.month}</text>`).join(""); mount.innerHTML = `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none"><text class="chart-label" x="${pad}" y="26">Index, Jan = 100</text><path class="line-urea" d="${linePath(DATA.timeline, width, height, pad, "urea")}"></path><path class="line-dap" d="${linePath(DATA.timeline, width, height, pad, "dap")}"></path><path class="line-diesel" d="${linePath(DATA.timeline, width, height, pad, "diesel")}"></path>${monthLabels}<text class="chart-label" x="${width - 170}" y="38" fill="#ef4444">Urea</text><text class="chart-label" x="${width - 170}" y="60" fill="#f97316">DAP</text><text class="chart-label" x="${width - 170}" y="82" fill="#fbbf24">Diesel</text></svg>`; }
function renderCropChart() { const mount = document.getElementById("crop-chart"); if (!mount) return; const width = 600, height = 380, pad = 50, barHeight = 34, gap = 28, colors = { nitrogen: "#ef4444", phosphate: "#f97316", potash: "#fbbf24", energy: "#38bdf8" }; const bars = DATA.cropExposure.map((crop, i) => { let x = pad + 90; const y = 70 + i * (barHeight + gap); const segments = ["nitrogen", "phosphate", "potash", "energy"].map(key => { const w = crop[key] * 3.3; const rect = `<rect x="${x}" y="${y}" width="${w}" height="${barHeight}" rx="8" fill="${colors[key]}"></rect>`; x += w; return rect; }).join(""); return `<text class="axis" x="${pad}" y="${y + 22}">${crop.crop}</text>${segments}`; }).join(""); mount.innerHTML = `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none"><text class="chart-label" x="${pad}" y="30">Exposure share by pathway</text>${bars}<circle cx="330" cy="30" r="5" fill="${colors.nitrogen}"></circle><text class="axis" x="340" y="34">N</text><circle cx="375" cy="30" r="5" fill="${colors.phosphate}"></circle><text class="axis" x="385" y="34">P₂O₅</text><circle cx="445" cy="30" r="5" fill="${colors.potash}"></circle><text class="axis" x="455" y="34">K₂O</text><circle cx="515" cy="30" r="5" fill="${colors.energy}"></circle><text class="axis" x="525" y="34">Energy</text></svg>`; }
function renderSources() { const mount = document.getElementById("source-list"); if (!mount) return; mount.innerHTML = DATA.sources.map(source => `<a class="source-link" href="${source.url}" target="_blank" rel="noreferrer"><strong>${source.name}</strong><span>↗</span></a>`).join(""); }

document.addEventListener("DOMContentLoaded", () => { applyPublicCopy(); renderCascade(); renderPriceChart(); renderCropChart(); renderSources(); document.querySelectorAll(".scenario-button").forEach(button => button.addEventListener("click", () => updateScenario(button.dataset.scenario))); updateScenario(activeScenario); initScenarioDock(); });
