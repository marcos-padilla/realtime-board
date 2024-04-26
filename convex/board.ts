import { v } from 'convex/values'
import { mutation } from './_generated/server'
import { title } from 'process'

const images = [
	'/placeholders/01.svg',
	'/placeholders/02.svg',
	'/placeholders/03.svg',
	'/placeholders/04.svg',
	'/placeholders/05.svg',
	'/placeholders/06.svg',
	'/placeholders/07.svg',
	'/placeholders/08.svg',
	'/placeholders/09.svg',
	'/placeholders/10.svg',
	'/placeholders/11.svg',
]

export const create = mutation({
	args: {
		orgId: v.string(),
		title: v.string(),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity()
		if (!identity) throw new Error('Unauthorized')

		const randomImage = images[Math.floor(Math.random() * images.length)]
		const board = await ctx.db.insert('boards', {
			title: args.title,
			orgId: args.orgId,
			authorId: identity.subject,
			authorName: identity.name!,
			imageUrl: randomImage,
		})

		return board
	},
})

export const remove = mutation({
	args: { id: v.id('boards') },
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity()
		if (!identity) throw new Error('Unauthorized')

		//TODO: Check to delete facorite relation as well

		await ctx.db.delete(args.id)
	},
})

export const update = mutation({
	args: { id: v.id('boards'), title: v.string() },
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity()
		if (!identity) throw new Error('Unauthorized')
		const title = args.title.trim()
		if (!title) throw new Error('Title is required')

		if (title.length > 60)
			throw new Error('Title cannot be longer than 60 characters')
		const board = await ctx.db.patch(args.id, { title })
		return board
	},
})
