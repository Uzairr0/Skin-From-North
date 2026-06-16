import type { PlaceOrderResult } from './placeOrder'

type PlacementRecord =
  | { status: 'pending'; startedAt: number }
  | ({ status: 'done' } & PlaceOrderResult)
  | { status: 'failed'; message: string }

const PREFIX = 'sfn-placement:'

function key(placementId: string) {
  return `${PREFIX}${placementId}`
}

export function readPlacement(placementId: string): PlacementRecord | null {
  try {
    const raw = sessionStorage.getItem(key(placementId))
    if (!raw) return null
    return JSON.parse(raw) as PlacementRecord
  } catch {
    return null
  }
}

export function writePlacement(placementId: string, record: PlacementRecord) {
  sessionStorage.setItem(key(placementId), JSON.stringify(record))
}
