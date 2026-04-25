# Methodology: bounded admin-area food-system shock model

This model estimates how a Hormuz-linked energy/fertiliser disruption could affect farming regions globally.

It is designed to produce lower/base/upper estimates at Admin-1 level, with Admin-2 refinement where data is strong.

## Core chain

```text
Crop area
× fertiliser application rate
× import dependency
× product/chokepoint exposure
× disruption severity
× substitution and inventory constraints
× affordability response
× crop nutrient sensitivity
= yield and production risk
```

## Key metrics

For each administrative area:

- baseline nitrogen demand
- baseline P2O5 demand
- baseline K2O demand
- fertiliser import dependency score
- Hormuz exposure score
- effective nutrient shortfall, lower/base/upper
- fertiliser affordability shock, lower/base/upper
- crop-weighted yield-at-risk, lower/base/upper
- production-at-risk in tonnes
- calories-at-risk
- farmer margin risk
- consumer food-price pressure
- humanitarian food-stress score

## Formula skeleton

### 1. Nutrient demand

```text
D[a,c,n] = A[a,c] × R[a,c,n]
```

Where:

- `a` = administrative area
- `c` = crop
- `n` = nutrient: N, P2O5 or K2O
- `A` = crop area
- `R` = nutrient application rate

### 2. Country/product import dependency

```text
ImportDependency[k,p] =
max(0, Imports[k,p] - Exports[k,p]) / DomesticAgriculturalUse[k,p]
```

Clamp to `[0, 1]`.

### 3. Chokepoint exposure

```text
ChokepointExposure[k,p] =
GulfOriginShare[k,p] × HormuzTransitShare[p]
```

### 4. Effective shortfall

```text
EffectiveShortfall[k,p,s] =
ImportDependency[k,p]
× ChokepointExposure[k,p]
× DisruptionSeverity[p,s]
× (1 - SubstitutionCapacity[k,p,s])
× (1 - InventoryCover[k,p,s])
```

### 5. Nutrient shortfall by admin area

```text
NutrientShortfall[a,n,s] =
Σp ProductMix[a,p,n] × EffectiveShortfall[k,p,s]
```

### 6. Affordability reduction

```text
AffordabilityReduction[a,c,n,s] =
PriceElasticity[c,n,k]
× max(0, FertiliserPriceIncrease[p,s] - SubsidyAbsorption[k,p,s])
× CreditConstraint[a]
```

### 7. Total application reduction

```text
TotalApplicationReduction[a,c,n,s] =
1 - (1 - PhysicalShortfall[a,n,s]) × (1 - AffordabilityReduction[a,c,n,s])
```

### 8. Yield-at-risk

```text
YieldLoss[a,c,s] =
Σn Sensitivity[c,n] × TotalApplicationReduction[a,c,n,s] × TimingFactor[a,c,s]
```

Bound by crop-specific maximum loss assumptions.

### 9. Production-at-risk

```text
ProductionAtRisk[a,c,s] =
BaselineProduction[a,c] × YieldLoss[a,c,s]
```

### 10. Humanitarian food-stress score

```text
FoodStress[a,s] =
FoodPricePressure[a,s]
× FoodExpenditureShare[a]
× PovertyRate[a]
× ImportReliance[a]
× ConflictFragility[a]
```

## Data sources to connect

- FAO GAUL or GADM for boundaries
- MapSPAM/SPAM for crop area and production grids
- NPKGRIDS for N, P2O5 and K2O application rates
- FAOSTAT fertilisers by nutrient for production, trade and use
- World Bank commodity price data for fertiliser and energy indices
- IFPRI/IFA/trade matrix assumptions for Gulf/Hormuz product exposure
- WFP/IPC/World Bank/WorldPop for humanitarian exposure
