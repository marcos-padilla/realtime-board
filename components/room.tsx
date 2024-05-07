'use client'

import { RoomProvider } from '@/liveblocks.config'
import { Layer } from '@/types'
import { LiveList, LiveMap, LiveObject } from '@liveblocks/client'
import { ClientSideSuspense } from '@liveblocks/react'

export default function Room({
	children,
	roomId,
	fallback,
}: {
	children: React.ReactNode
	roomId: string
	fallback: NonNullable<React.ReactNode> | null
}) {
	return (
		<RoomProvider
			id={roomId}
			initialPresence={{
				cursor: null,
				selection: [],
				pencilColor: null,
				pencilDraft: null,
			}}
			initialStorage={{
				layers: new LiveMap<string, LiveObject<Layer>>(),
				layerIds: new LiveList<string>(),
			}}
		>
			<ClientSideSuspense fallback={fallback}>
				{() => children}
			</ClientSideSuspense>
		</RoomProvider>
	)
}
