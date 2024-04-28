'use client'

import { RoomProvider } from '@/liveblocks.config'
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
			}}
		>
			<ClientSideSuspense fallback={fallback}>
				{() => children}
			</ClientSideSuspense>
		</RoomProvider>
	)
}
