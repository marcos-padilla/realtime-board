'use client'

import { Plus } from 'lucide-react'
import { CreateOrganization } from '@clerk/nextjs'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

export default function NewButton() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className='aspect-square'>
					<button className='bg-white/25 size-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition'>
						<Plus className='text-white' />
					</button>
				</div>
			</DialogTrigger>
			<DialogContent
				className='p-0 bg-transparent border-none shadow-none max-w-[480px]'
				showX={false}
			>
				<CreateOrganization routing='hash' />
			</DialogContent>
		</Dialog>
	)
}
