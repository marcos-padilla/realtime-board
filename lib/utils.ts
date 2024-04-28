import { Camera } from '@/types'
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
