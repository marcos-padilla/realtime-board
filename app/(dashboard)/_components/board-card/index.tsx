'use client'

import { Id } from '@/convex/_generated/dataModel'
import Image from 'next/image'
import Link from 'next/link'
import BoardOverlay from './board-overlay'
import { formatDistanceToNow } from 'date-fns'
import { useAuth } from '@clerk/nextjs'
import BoardCardFooter from './board-card-footer'
import { Skeleton } from '@/components/ui/skeleton'
import Actions from '@/components/actions'
import { MoreHorizontal } from 'lucide-react'
import { useApiMutation } from '@/hooks/use-api-mutations'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'

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

	const { mutate: onFavorite, pending: pendingFavorite } = useApiMutation(
		api.board.favorite
	)
	const { mutate: onUnfavorite, pending: pendingUnfavorite } =
		useApiMutation(api.board.unfavorite)

	const toggleFavorite = () => {
		if (isFavorite) {
			onUnfavorite({ id: _id }).catch(() =>
				toast.error('Failed to unfavorite')
			)
		} else {
			onFavorite({ id: _id, orgId }).catch(() =>
				toast.error('Failed to favorite')
			)
		}
	}

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
					<Actions id={_id} title={title} side='right'>
						<button className='absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none'>
							<MoreHorizontal className='text-white opacity-75 hover:opacity-100 transition-opacity' />
						</button>
					</Actions>
				</div>
				<BoardCardFooter
					title={title}
					isFavorite={isFavorite}
					authorLabel={authorLabel}
					createdAtLabel={createdAtLabel}
					onClick={toggleFavorite}
					disabled={pendingFavorite || pendingUnfavorite}
				/>
			</div>
		</Link>
	)
}

BoardCard.Skeleton = function BoardCardSkeleton() {
	return (
		<div className='aspect-[100/127] rounded-lg overflow-hidden'>
			<Skeleton className='size-full' />
		</div>
	)
}
