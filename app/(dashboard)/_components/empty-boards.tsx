'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useOrganization } from '@clerk/nextjs'

export default function EmptyBoards() {
	const create = useMutation(api.board.create)
	const { organization } = useOrganization()
	const onClick = async () => {
		if (!organization) return
		create({
			title: 'Untitled',
			orgId: organization.id,
		})
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
				<Button size={'lg'} onClick={onClick}>
					Creat board
				</Button>
			</div>
		</div>
	)
}
