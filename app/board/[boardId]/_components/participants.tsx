import { Skeleton } from '@/components/ui/skeleton'

export default function Participants() {
	return (
		<div className='absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md'>
			Participants
		</div>
	)
}

Participants.Skeleton = function ParticipantsSkeleton() {
	return (
		<Skeleton className='absolute h-12 w-[150px] top-2 right-2 bg-white rounded-md p-3 shadow-md' />
	)
}
