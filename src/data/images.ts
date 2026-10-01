/**
 * Temporary preview images (see ASSET_REQUIREMENTS.md). Rendered silently —
 * alt texts describe the content only.
 */
export interface Img {
  base: string
  widths: [number, number]
  /** intrinsic ratio w/h of the source, for width/height attributes */
  ratio: number
}

const d = (slug: string, widths: [number, number], ratio: number): Img => ({
  base: `/assets/img/${slug}`,
  widths,
  ratio,
})

const PORTRAIT = 1122 / 1402

export const IMG = {
  hero: d('hero-cleaner', [640, 1070], 1145 / 1374),
  kitchenWipe: d('kitchen-wipe', [480, 900], 1.5),
  vacuumWindow: d('vacuum-window', [480, 900], 4 / 3),
  mopLiving: d('mop-living', [480, 900], 4 / 3),
  vacuumSofa: d('vacuum-sofa', [480, 900], 4 / 3),
  roomYellowChair: d('room-yellow-chair', [480, 900], PORTRAIT),
  kitchenCounter: d('kitchen-counter', [480, 900], PORTRAIT),
  windowWipe: d('window-wipe', [480, 900], PORTRAIT),
  tableWipe: d('table-wipe', [480, 900], 4 / 3),
  bathroomSink: d('bathroom-sink', [480, 900], 4 / 3),
  livingNeutral: d('living-neutral', [480, 900], PORTRAIT),
  kitchenIsland: d('kitchen-island', [480, 900], 4 / 3),
  bathtub: d('bathtub', [480, 900], PORTRAIT),
  team1: d('team-1', [400, 700], 1),
  team2: d('team-2', [400, 700], 1),
  team3: d('team-3', [400, 700], 1),
  team4: d('team-4', [400, 700], 1),
} satisfies Record<string, Img>
