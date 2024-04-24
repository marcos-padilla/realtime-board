'use client'

import Image from 'next/image'

import { useOrganizationList, useOrganization } from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import Hint from '@/components/globals/hint'

interface OrganizationItemProps {
	id: string
	name: string
	imageUrl: string
}

export default function OrganizationItem({
	id,
	imageUrl,
	name,
}: OrganizationItemProps) {
	const { organization } = useOrganization()
	const { setActive } = useOrganizationList()

	const isActive = organization?.id === id

	const onClick = () => {
		if (!setActive) return
		setActive({
			organization: id,
		})
	}

	return (
		<div className='aspect-square relative'>
			<Hint label={name} side='right' align='start' sideOffset={18}>
				<Image
					src={imageUrl}
					alt={name}
					fill
					onClick={onClick}
					className={cn(
						'rounded-md cursor-pointer opacity-75 hover:opacity-100 transition',
						isActive && 'opacity-100'
					)}
				/>
			</Hint>
		</div>
	)
}
