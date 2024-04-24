'use client'

import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { useApiMutation } from '@/hooks/use-api-mutations'
import { useOrganization } from '@clerk/nextjs'
import Image from 'next/image'
import { toast } from 'sonner'

export default function EmptyBoards() {
	const { mutate, pending } = useApiMutation(api.board.create)
	const { organization } = useOrganization()
	const onClick = async () => {
		if (!organization) return
		mutate({
			title: 'Untitled',
			orgId: organization.id,
		})
			.then((id) => {
				toast.success('Board created successfully')
				// TODO: Redirect to board/[id]
			})
			.catch(() => toast.error('Failed to create board'))
	}
	return (
		<div className='h-full flex flex-col items-center justify-center'>
			<Image
				src={'/empty-board.png'}
				height={140}
				width={140}
				alt='Empty boards'
			/>
			<h2 className='text-2xl font-semibold mt-6'>
				Create your first board
			</h2>
			<p className='text-muted-foreground text-sm mt-2'>
				Start by creating a board for your organization
			</p>
			<div className='mt-6'>
				<Button disabled={pending} size={'lg'} onClick={onClick}>
					Create board
				</Button>
			</div>
		</div>
	)
}
