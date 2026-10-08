/**
 * Client photos plus the remaining temporary template images (see
 * ASSET_REQUIREMENTS.md). Alt texts describe the content only.
 */
export interface Img {
  base: string
  widths: [number, number]
  /** intrinsic ratio w/h of the source, for width/height attributes */
  ratio: number
}

const d = (slug: string, widths: [number, number], ratio: number): Img => ({
  base: `${import.meta.env.BASE_URL}assets/img/${slug}`,
  widths,
  ratio,
})

const PORTRAIT = 1122 / 1402

export const IMG = {
  // client photos (images/ → scripts/prepare-client-photos.py)
  hero: d('hero-steam-window', [640, 768], 1145 / 1374),
  productChandelier: d('product-chandelier', [480, 768], 4 / 3),
  productRenovationTeam: d('product-renovation-team', [480, 900], 4 / 3),
  productEntrance: d('product-entrance', [480, 768], 4 / 3),
  productMattressSteam: d('product-mattress-steam', [480, 900], 4 / 3),
  productCleanRoom: d('product-clean-room', [480, 900], 4 / 3),
  productWindowsDuo: d('product-windows-duo', [480, 768], 4 / 3),
  productDirtyWindow: d('product-dirty-window', [480, 900], 4 / 3),
  productMirrorWipe: d('product-mirror-wipe', [480, 900], 4 / 3),
  scopeKitchenOven: d('scope-kitchen-oven', [480, 900], 4 / 3),
  scopeBathroom: d('scope-bathroom', [480, 900], 4 / 3),
  scopeFloorVacuum: d('scope-floor-vacuum', [480, 900], 4 / 3),
  scopeKitchenHood: d('scope-kitchen-hood', [480, 900], 4 / 3),
  scopeRenovationCeiling: d('scope-renovation-ceiling', [480, 900], 1),
  scopeKitchenHoodPanel: d('scope-kitchen-hood-panel', [480, 900], 1),
  scopeBathroomPanel: d('scope-bathroom-panel', [480, 900], 1),
  approachWoodCornice: d('approach-wood-cornice', [480, 900], 1),
  // temporary template images — real evidence still required (ASSET_REQUIREMENTS.md A1, A2)
  vacuumWindowCase: d('vacuum-window-case', [480, 900], 4 / 3),
  roomYellowChairCase: d('room-yellow-chair-case', [480, 900], PORTRAIT),
  kitchenWipeCase: d('kitchen-wipe-case', [480, 900], 1.5),
  kitchenCounterCase: d('kitchen-counter-case', [480, 900], PORTRAIT),
  vacuumSofaCase: d('vacuum-sofa-case', [480, 900], 4 / 3),
  livingNeutral: d('living-neutral', [480, 900], PORTRAIT),
  team1: d('team-1', [400, 700], 1),
  team2: d('team-2', [400, 700], 1),
  team3: d('team-3', [400, 700], 1),
  team4: d('team-4', [400, 700], 1),
} satisfies Record<string, Img>
