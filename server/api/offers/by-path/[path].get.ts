import { prisma } from "@@/server/utils/prisma";
function serializeBigInt(obj:any) {
    return JSON.parse(JSON.stringify(obj, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
    ));
}

export default defineEventHandler(async (event) => {
    const { path } = event.context.params as { path: string }
    try {
        const offer = await prisma.offers.findFirst({
            where: { path },
            include: { stores: true },
        })
        if (!offer) {
            return { error: true, message: 'Offer not found', statusCode: 404 }
        }
        return serializeBigInt(offer)
    } catch (err:any) {
        return {
            error: true,
            message: err.message,
            statusCode: 500,
        }
    }
})
