import { OrganizationProfile } from '@clerk/nextjs'

import { DialogContent, Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default function InviteButton() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={'outline'}>
					<Plus className='h-4 w-4 mr-2' />
					Invite Members
				</Button>
			</DialogTrigger>
			<DialogContent className='p-0 bg-transparent border-none max-w-[880px]'>
				<OrganizationProfile routing='hash' />
			</DialogContent>
		</Dialog>
	)
}
