'use client'

import { Id } from '@/convex/_generated/dataModel'
import Image from 'next/image'
import Link from 'next/link'
import BoardOverlay from './board-overlay'
import { formatDistanceToNow } from 'date-fns'
import { useAuth } from '@clerk/nextjs'
import BoardCardFooter from './board-card-footer'

interface BoardCardProps {
	_id: Id<'boards'>
	_creationTime: number
	orgId: string
	title: string
	authorId: string
	authorName: string
	imageUrl: string
	isFavorite: boolean
}

export default function BoardCard({
	_id,
	_creationTime,
	authorId,
	authorName,
	imageUrl,
	orgId,
	title,
	isFavorite,
}: BoardCardProps) {
	const { userId } = useAuth()
	const authorLabel = userId === authorId ? 'You' : authorName
	const createdAtLabel = formatDistanceToNow(_creationTime, {
		addSuffix: true,
	})
	return (
		<Link href={`/board/${_id}`}>
			<div className='group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden'>
				<div className='relative flex-1 bg-indigo-50'>
					<Image
						src={imageUrl}
						alt={title}
						fill
						className='object-fit'
					/>
					<BoardOverlay />
				</div>
				<BoardCardFooter
					title={title}
					isFavorite={isFavorite}
					authorLabel={authorLabel}
					createdAtLabel={createdAtLabel}
					onClick={() => {}}
					disabled={false}
				/>
			</div>
		</Link>
	)
}
