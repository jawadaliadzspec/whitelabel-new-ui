import { prisma } from "@@/server/utils/prisma";
function serializeBigInt(obj:any) {
    return JSON.parse(JSON.stringify(obj, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
    ));
}

export default defineEventHandler(async (event) => {
    try {
        const categories = await prisma.categories.findMany({
            where: {
                status: true,
            },
            select: {
                id: true,
                name: true,
                // image: true,
                _count: {
                    select: { offers: true }
                }
            },
            orderBy: {
                name: 'asc'
            },
        })
        return serializeBigInt(categories)
    } catch (err:any) {
        return {
            error: true,
            message: err.message,
            statusCode: 500,
        }
    }
})
