const DATA = {
  scenarios: {
    lower: { label: "Lower bound", description: "A shorter disruption where inventories, alternative suppliers and policy support absorb part of the shock.", global: { ureaExposure: "12%", ammoniaTradeAtRisk: "9%", yieldPressure: "3–8%", foodPriceRisk: "Low–Medium", populationExposed: "420M" } },
    base: { label: "Base case", description: "A sustained 3–6 month squeeze where fertiliser and fuel prices stay elevated through key planting windows.", global: { ureaExposure: "24%", ammoniaTradeAtRisk: "18%", yieldPressure: "7–18%", foodPriceRisk: "Medium–High", populationExposed: "870M" } },
    upper: { label: "Upper bound", description: "A prolonged 6–12 month disruption with tighter shipping, weaker substitution and sharper affordability pressure.", global: { ureaExposure: "41%", ammoniaTradeAtRisk: "31%", yieldPressure: "14–34%", foodPriceRisk: "High", populationExposed: "1.6B" } }
  },
  regions: [
    { id: "punjab-india", name: "Punjab", country: "India", lat: 31.1, lon: 75.3, crops: ["wheat", "rice"], driver: "Urea-heavy wheat/rice rotations and high fertiliser demand.", lower: { nutrientShortfall: 8, yieldAtRisk: 6, foodStress: 48, productionRiskMt: 1.4 }, base: { nutrientShortfall: 21, yieldAtRisk: 15, foodStress: 74, productionRiskMt: 3.8 }, upper: { nutrientShortfall: 37, yieldAtRisk: 28, foodStress: 91, productionRiskMt: 7.0 } },
    { id: "mato-grosso", name: "Mato Grosso", country: "Brazil", lat: -12.6, lon: -55.7, crops: ["soy", "maize", "cotton"], driver: "High import dependence and second-crop maize exposure.", lower: { nutrientShortfall: 6, yieldAtRisk: 4, foodStress: 35, productionRiskMt: 1.1 }, base: { nutrientShortfall: 18, yieldAtRisk: 11, foodStress: 58, productionRiskMt: 3.6 }, upper: { nutrientShortfall: 31, yieldAtRisk: 21, foodStress: 78, productionRiskMt: 7.2 } },
    { id: "western-australia", name: "Western Australia Wheatbelt", country: "Australia", lat: -31.8, lon: 117.1, crops: ["wheat", "barley", "canola"], driver: "High import reliance for nitrogen/potash and export-market sensitivity.", lower: { nutrientShortfall: 7, yieldAtRisk: 5, foodStress: 24, productionRiskMt: 0.7 }, base: { nutrientShortfall: 20, yieldAtRisk: 14, foodStress: 46, productionRiskMt: 2.1 }, upper: { nutrientShortfall: 36, yieldAtRisk: 27, foodStress: 66, productionRiskMt: 4.3 } },
    { id: "oromia", name: "Oromia", country: "Ethiopia", lat: 7.9, lon: 39.4, crops: ["maize", "wheat", "teff"], driver: "Lower purchasing power, import exposure and food-security vulnerability.", lower: { nutrientShortfall: 6, yieldAtRisk: 7, foodStress: 56, productionRiskMt: 0.4 }, base: { nutrientShortfall: 19, yieldAtRisk: 18, foodStress: 82, productionRiskMt: 1.2 }, upper: { nutrientShortfall: 33, yieldAtRisk: 32, foodStress: 96, productionRiskMt: 2.5 } },
    { id: "east-anglia", name: "East Anglia", country: "United Kingdom", lat: 52.4, lon: 0.8, crops: ["wheat", "barley", "oilseed rape"], driver: "Gas-linked nitrogen costs and margin pressure for cereal farms.", lower: { nutrientShortfall: 3, yieldAtRisk: 2, foodStress: 18, productionRiskMt: 0.1 }, base: { nutrientShortfall: 9, yieldAtRisk: 7, foodStress: 37, productionRiskMt: 0.35 }, upper: { nutrientShortfall: 18, yieldAtRisk: 15, foodStress: 59, productionRiskMt: 0.7 } },
    { id: "iowa", name: "Iowa", country: "United States", lat: 42.0, lon: -93.5, crops: ["maize", "soy"], driver: "Nitrogen-heavy corn economics, but stronger domestic resilience.", lower: { nutrientShortfall: 3, yieldAtRisk: 2, foodStress: 15, productionRiskMt: 0.5 }, base: { nutrientShortfall: 10, yieldAtRisk: 7, foodStress: 34, productionRiskMt: 1.8 }, upper: { nutrientShortfall: 22, yieldAtRisk: 16, foodStress: 55, productionRiskMt: 4.1 } },
    { id: "ukraine-odesa", name: "Odesa Oblast", country: "Ukraine", lat: 46.5, lon: 30.7, crops: ["wheat", "sunflower", "maize"], driver: "Compounded Black Sea, fertiliser, diesel and war-risk freight exposure.", lower: { nutrientShortfall: 5, yieldAtRisk: 5, foodStress: 42, productionRiskMt: 0.3 }, base: { nutrientShortfall: 16, yieldAtRisk: 14, foodStress: 70, productionRiskMt: 0.9 }, upper: { nutrientShortfall: 31, yieldAtRisk: 29, foodStress: 90, productionRiskMt: 1.8 } },
    { id: "sindh", name: "Sindh", country: "Pakistan", lat: 26.1, lon: 68.7, crops: ["rice", "wheat", "cotton", "sugarcane"], driver: "Irrigated, nitrogen-sensitive crops with currency and affordability exposure.", lower: { nutrientShortfall: 8, yieldAtRisk: 6, foodStress: 53, productionRiskMt: 0.6 }, base: { nutrientShortfall: 22, yieldAtRisk: 17, foodStress: 80, productionRiskMt: 1.8 }, upper: { nutrientShortfall: 39, yieldAtRisk: 31, foodStress: 95, productionRiskMt: 3.4 } }
  ],
  timeline: [{ month: "Jan", urea: 100, dap: 100, diesel: 100 }, { month: "Feb", urea: 112, dap: 106, diesel: 118 }, { month: "Mar", urea: 139, dap: 121, diesel: 141 }, { month: "Apr", urea: 162, dap: 138, diesel: 155 }, { month: "May", urea: 178, dap: 151, diesel: 164 }, { month: "Jun", urea: 191, dap: 166, diesel: 171 }],
  cropExposure: [{ crop: "Maize", nitrogen: 44, phosphate: 18, potash: 13, energy: 25 }, { crop: "Wheat", nitrogen: 39, phosphate: 22, potash: 10, energy: 29 }, { crop: "Rice", nitrogen: 41, phosphate: 16, potash: 12, energy: 31 }, { crop: "Canola", nitrogen: 46, phosphate: 20, potash: 12, energy: 22 }, { crop: "Soy", nitrogen: 8, phosphate: 26, potash: 32, energy: 34 }],
  cascade: [{ label: "Hormuz disruption", detail: "Energy, shipping and Gulf fertiliser flows are constrained." }, { label: "Gas / sulphur / ammonia shock", detail: "Core inputs for nitrogen and phosphate fertiliser tighten." }, { label: "Fertiliser shortage + affordability", detail: "Supply and price stress reduce farmer access." }, { label: "Reduced application", detail: "Farmers cut rates, delay purchases or switch crops." }, { label: "Crop yield pressure", detail: "Losses emerge through planting and harvest cycles." }, { label: "Food price pressure", detail: "Commodity, feed, meat, dairy and retail costs transmit." }],
  sources: [{ name: "IFPRI — Iran war impacts on fertiliser markets", url: "https://www.ifpri.org/blog/the-iran-wars-impacts-on-global-fertilizer-markets-and-food-production/" }, { name: "IFPRI — Will the Iran crisis lead to food price spikes?", url: "https://www.ifpri.org/blog/will-the-iran-crisis-lead-to-another-round-of-food-price-spikes/" }, { name: "EIA — Hormuz closure and production outages", url: "https://www.eia.gov/pressroom/releases/press586.php" }, { name: "FAOSTAT — Fertilisers by nutrient", url: "https://www.fao.org/statistics/events/events-detail/fertilizers-by-nutrient.-july-2025-update/en" }, { name: "NPKGRIDS — global crop fertiliser application rates", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11526156/" }, { name: "MapSPAM — spatial crop production allocation model", url: "https://www.mapspam.info/" }]
};

let activeScenario = "base";
const scenarioRank = { lower: 38, base: 62, upper: 92 };
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const riskColor = score => score >= 85 ? "#ef4444" : score >= 65 ? "#f97316" : score >= 40 ? "#fbbf24" : "#22c55e";
const composite = (region, scenario = activeScenario) => Math.round((region[scenario].nutrientShortfall * .34) + (region[scenario].yieldAtRisk * .36) + (region[scenario].foodStress * .30));
const setText = (id, text) => { const node = document.getElementById(id); if (node) node.textContent = text; };
const setFirst = (selector, text) => { const node = document.querySelector(selector); if (node) node.textContent = text; };

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
  document.querySelectorAll(".section-heading p").forEach(node => {
    node.textContent = node.textContent.replace("The model tracks", "This page tracks").replace("The table ranks regions by a composite score using nutrient shortfall, yield-at-risk and food-stress values.", "The table ranks regions by nutrient shortfall, yield-at-risk and food-stress values.");
  });
  const callout = document.querySelector(".callout p:last-child");
  if (callout) callout.textContent = "Price rises are not accidents floating in isolation. They have a chain: decisions made, chokepoints stressed, farming regions exposed, communities left carrying the cost, and evidence that can be followed.";
}

function initScenarioDock() {
  const panel = document.querySelector(".hero-panel");
  const hero = document.querySelector(".hero");
  if (!panel || !hero) return;
  let triggerY = 0;
  const recalc = () => {
    panel.classList.remove("is-docked");
    triggerY = window.scrollY + panel.getBoundingClientRect().top + Math.min(panel.offsetHeight * .35, 220);
    updateDock();
  };
  const updateDock = () => {
    const isDesktop = window.matchMedia("(min-width: 1081px)").matches;
    const shouldDock = isDesktop && window.scrollY > triggerY;
    panel.classList.toggle("is-docked", shouldDock);
    document.body.classList.toggle("has-scenario-dock", shouldDock);
  };
  window.addEventListener("scroll", updateDock, { passive: true });
  window.addEventListener("resize", recalc);
  setTimeout(recalc, 250);
}

function updateScenario(scenario) {
  activeScenario = scenario;
  const scenarioData = DATA.scenarios[scenario];
  document.querySelectorAll(".scenario-button").forEach(btn => btn.classList.toggle("active", btn.dataset.scenario === scenario));
  setText("scenario-label", scenarioData.label);
  setText("scenario-description", scenarioData.description);
  const meter = document.querySelector(".shock-meter span");
  if (meter) meter.style.width = `${scenarioRank[scenario]}%`;
  setText("metric-urea", scenarioData.global.ureaExposure);
  setText("metric-ammonia", scenarioData.global.ammoniaTradeAtRisk);
  setText("metric-yield", scenarioData.global.yieldPressure);
  setText("metric-price", scenarioData.global.foodPriceRisk);
  setText("metric-population", scenarioData.global.populationExposed);
  renderMap();
  renderTable();
  renderRegionDetail([...DATA.regions].sort((a, b) => composite(b) - composite(a))[0]);
}

function renderCascade() {
  const mount = document.getElementById("cascade");
  if (!mount) return;
  mount.innerHTML = DATA.cascade.map((item, index) => `<article class="cascade-step"><span class="cascade-index">${String(index + 1).padStart(2, "0")}</span><h3>${item.label}</h3><p>${item.detail}</p></article>`).join("");
}
const project = (lon, lat, width, height) => ({ x: ((lon + 180) / 360) * width, y: ((90 - lat) / 180) * height });

function renderMap() {
  const mount = document.getElementById("risk-map");
  if (!mount) return;
  const width = 1000, height = 540, graticule = [];
  for (let lon = -120; lon <= 120; lon += 60) { const p1 = project(lon, -72, width, height), p2 = project(lon, 72, width, height); graticule.push(`<line class="graticule" x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}"></line>`); }
  for (let lat = -60; lat <= 60; lat += 30) { const p1 = project(-175, lat, width, height), p2 = project(175, lat, width, height); graticule.push(`<line class="graticule" x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}"></line>`); }
  const land = `<ellipse class="land" cx="210" cy="205" rx="145" ry="105"></ellipse><ellipse class="land" cx="260" cy="342" rx="78" ry="112"></ellipse><ellipse class="land" cx="505" cy="178" rx="68" ry="52"></ellipse><ellipse class="land" cx="520" cy="285" rx="88" ry="118"></ellipse><ellipse class="land" cx="665" cy="210" rx="185" ry="118"></ellipse><ellipse class="land" cx="720" cy="330" rx="95" ry="92"></ellipse><ellipse class="land" cx="820" cy="404" rx="76" ry="42"></ellipse>`;
  const points = DATA.regions.map(region => { const { x, y } = project(region.lon, region.lat, width, height), score = composite(region), radius = clamp(8 + (score / 6), 12, 28); return `<g data-region="${region.id}" tabindex="0" role="button" aria-label="${region.name}, ${region.country}"><circle class="risk-point" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${radius.toFixed(1)}" fill="${riskColor(score)}" opacity="0.86"></circle><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(radius * 1.8).toFixed(1)}" fill="${riskColor(score)}" opacity="0.08"></circle><text class="risk-label" x="${(x + radius + 5).toFixed(1)}" y="${(y - radius - 8).toFixed(1)}">${region.name}</text></g>`; }).join("");
  mount.innerHTML = `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet">${graticule.join("")}${land}${points}</svg>`;
  mount.querySelectorAll("[data-region]").forEach(node => { const region = DATA.regions.find(r => r.id === node.dataset.region); node.addEventListener("click", () => renderRegionDetail(region)); node.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") renderRegionDetail(region); }); });
}

function renderRegionDetail(region) {
  const mount = document.getElementById("region-detail");
  if (!mount || !region) return;
  const r = region[activeScenario], score = composite(region);
  mount.innerHTML = `<p class="eyebrow">Selected region</p><h3>${region.name}, ${region.country}</h3><div class="big-score" style="color:${riskColor(score)}">${score}</div><p><strong>Composite risk score</strong> under the ${DATA.scenarios[activeScenario].label.toLowerCase()} scenario.</p><div class="detail-grid"><div class="detail-row"><span>Nutrient shortfall</span><strong>${r.nutrientShortfall}%</strong></div><div class="detail-row"><span>Yield-at-risk</span><strong>${r.yieldAtRisk}%</strong></div><div class="detail-row"><span>Production risk</span><strong>${r.productionRiskMt} Mt</strong></div><div class="detail-row"><span>Food-stress score</span><strong>${r.foodStress} / 100</strong></div></div><p><strong>Main crops:</strong> ${region.crops.join(", ")}</p><p>${region.driver}</p>`;
}

function renderTable() {
  const mount = document.getElementById("regions-table");
  if (!mount) return;
  mount.innerHTML = [...DATA.regions].sort((a, b) => composite(b) - composite(a)).map((region, index) => { const r = region[activeScenario], score = composite(region); return `<tr><td><span class="score-pill" style="color:${riskColor(score)}">#${index + 1}</span></td><td><strong>${region.name}</strong><span>${region.country}</span></td><td>${region.crops.join(", ")}</td><td>${r.nutrientShortfall}%</td><td>${r.yieldAtRisk}%</td><td>${r.productionRiskMt} Mt</td><td><span class="score-pill" style="background:${riskColor(score)}22;color:${riskColor(score)}">${r.foodStress}</span></td></tr>`; }).join("");
}

function linePath(values, width, height, pad, key) {
  const max = Math.max(...DATA.timeline.flatMap(d => [d.urea, d.dap, d.diesel]));
  return values.map((d, i) => { const x = pad + (i * ((width - pad * 2) / (values.length - 1))), y = height - pad - (((d[key] - 90) / (max - 90)) * (height - pad * 2)); return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`; }).join(" ");
}
function renderPriceChart() {
  const mount = document.getElementById("price-chart");
  if (!mount) return;
  const width = 600, height = 380, pad = 48;
  const monthLabels = DATA.timeline.map((d, i) => `<text class="axis" x="${pad + (i * ((width - pad * 2) / (DATA.timeline.length - 1)))}" y="${height - 18}" text-anchor="middle">${d.month}</text>`).join("");
  mount.innerHTML = `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none"><text class="chart-label" x="${pad}" y="26">Index, Jan = 100</text><path class="line-urea" d="${linePath(DATA.timeline, width, height, pad, "urea")}"></path><path class="line-dap" d="${linePath(DATA.timeline, width, height, pad, "dap")}"></path><path class="line-diesel" d="${linePath(DATA.timeline, width, height, pad, "diesel")}"></path>${monthLabels}<text class="chart-label" x="${width - 170}" y="38" fill="#ef4444">Urea</text><text class="chart-label" x="${width - 170}" y="60" fill="#f97316">DAP</text><text class="chart-label" x="${width - 170}" y="82" fill="#fbbf24">Diesel</text></svg>`;
}
function renderCropChart() {
  const mount = document.getElementById("crop-chart");
  if (!mount) return;
  const width = 600, height = 380, pad = 50, barHeight = 34, gap = 28, colors = { nitrogen: "#ef4444", phosphate: "#f97316", potash: "#fbbf24", energy: "#38bdf8" };
  const bars = DATA.cropExposure.map((crop, i) => { let x = pad + 90; const y = 70 + i * (barHeight + gap); const segments = ["nitrogen", "phosphate", "potash", "energy"].map(key => { const w = crop[key] * 3.3; const rect = `<rect x="${x}" y="${y}" width="${w}" height="${barHeight}" rx="8" fill="${colors[key]}"></rect>`; x += w; return rect; }).join(""); return `<text class="axis" x="${pad}" y="${y + 22}">${crop.crop}</text>${segments}`; }).join("");
  mount.innerHTML = `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none"><text class="chart-label" x="${pad}" y="30">Exposure share by pathway</text>${bars}<circle cx="330" cy="30" r="5" fill="${colors.nitrogen}"></circle><text class="axis" x="340" y="34">N</text><circle cx="375" cy="30" r="5" fill="${colors.phosphate}"></circle><text class="axis" x="385" y="34">P₂O₅</text><circle cx="445" cy="30" r="5" fill="${colors.potash}"></circle><text class="axis" x="455" y="34">K₂O</text><circle cx="515" cy="30" r="5" fill="${colors.energy}"></circle><text class="axis" x="525" y="34">Energy</text></svg>`;
}
function renderSources() {
  const mount = document.getElementById("source-list");
  if (!mount) return;
  mount.innerHTML = DATA.sources.map(source => `<a class="source-link" href="${source.url}" target="_blank" rel="noreferrer"><strong>${source.name}</strong><span>↗</span></a>`).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  applyPublicCopy();
  renderCascade();
  renderPriceChart();
  renderCropChart();
  renderSources();
  document.querySelectorAll(".scenario-button").forEach(button => button.addEventListener("click", () => updateScenario(button.dataset.scenario)));
  updateScenario(activeScenario);
  initScenarioDock();
});
