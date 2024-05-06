import { Camera, Color, Layer, Point, Side, XYWH } from '@/types'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

const COLORS = [
	'#FF0000',
	'#00FF00',
	'#0000FF',
	'#FFFF00',
	'#FF00FF',
	'#00FFFF',
	'#FFA500',
	'#800080',
]

export function connectionIdToColor(connectionId: number): string {
	return COLORS[connectionId % COLORS.length]
}

export function pointerEventToCanvasPoint(
	e: React.PointerEvent,
	camera: Camera
) {
	return {
		x: Math.round(e.clientX - camera.x),
		y: Math.round(e.clientY - camera.y),
	}
}

export function colorToHex(color: Color) {
	return `#${color.r.toString(16).padStart(2, '0')}${color.g.toString(16).padStart(2, '0')}${color.b.toString(16).padStart(2, '0')}`
}

export function resizeBounds(bounds: XYWH, corner: Side, point: Point): XYWH {
	const result = {
		x: bounds.x,
		y: bounds.y,
		width: bounds.width,
		height: bounds.height,
	}

	if ((corner & Side.Left) === Side.Left) {
		result.x = Math.min(bounds.x + bounds.width, point.x)
		result.width = Math.abs(bounds.x + bounds.width - point.x)
	}

	if ((corner & Side.Right) === Side.Right) {
		result.x = Math.min(bounds.x, point.x)
		result.width = Math.abs(bounds.x - point.x)
	}

	if ((corner & Side.Top) === Side.Top) {
		result.y = Math.min(bounds.y + bounds.height, point.y)
		result.height = Math.abs(bounds.y + bounds.height - point.y)
	}

	if ((corner & Side.Bottom) === Side.Bottom) {
		result.y = Math.min(bounds.y, point.y)
		result.height = Math.abs(bounds.y - point.y)
	}

	return result
}

export function findIntersectingLayersWithRect(
	layerIds: readonly string[],
	layers: ReadonlyMap<string, Layer>,
	a: Point,
	b: Point
) {
	const rect = {
		x: Math.min(a.x, b.x),
		y: Math.min(a.y, b.y),
		width: Math.abs(a.x - b.x),
		height: Math.abs(a.y - b.y),
	}

	const ids = []
	for (const layerId of layerIds) {
		const layer = layers.get(layerId)
		if (layer == null) {
			continue
		}

		const { x, y, height, width } = layer

		if (
			rect.x + rect.width > x &&
			rect.x < x + width &&
			rect.y + rect.height > y &&
			rect.y < y + height
		) {
			ids.push(layerId)
		}
	}
	return ids
}

export function getConstrastingTextColor(color: Color) {
	const luminance = 0.299 * color.r + 0.587 * color.g + 0.114 * color.b
	return luminance > 182 ? '#000' : '#fff'
}
