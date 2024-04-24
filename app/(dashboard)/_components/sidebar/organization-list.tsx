'use client'

import { useOrganizationList } from '@clerk/nextjs'
import OrganizationItem from './organization-item'

export default function OrganizationList() {
	const { userMemberships } = useOrganizationList({
		userMemberships: {
			infinite: true,
		},
	})

	if (!userMemberships.data?.length) return null

	return (
		<ul className='space-y-4'>
			{userMemberships.data.map((mem) => (
				<OrganizationItem
					key={mem.organization.id}
					id={mem.organization.id}
					name={mem.organization.name}
					imageUrl={mem.organization.imageUrl}
				/>
			))}
		</ul>
	)
}
