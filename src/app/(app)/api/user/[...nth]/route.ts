import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const GET = async (
    req: Request,
    { params }: { params: { nth: string[] } }
) => {
    try {
        const index = parseInt(params.nth[0], 10);
        
        if (isNaN(index)) {
            return Response.json({ error: 'Invalid index parameter' }, { status: 400 });
        }

        const payload = await getPayload({
            config: configPromise,
        })

        const data = await payload.find({ 
            collection: 'users',
            sort: ['createdAt']
        })

        if (!data.docs[index]) {
            return Response.json({ error: 'User not found' }, { status: 404 });
        }

        return Response.json(data.docs[index]);
    } catch (error) {
        console.error(error);
        return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
}