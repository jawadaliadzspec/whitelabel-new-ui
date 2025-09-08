import { prisma } from "@@/server/utils/prisma";

function serializeBigInt(obj:any) {
    return JSON.parse(JSON.stringify(obj, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
    ))
}

export default defineEventHandler(async (event) => {
    try {
        const companyId = 1
        if (!companyId) {
            return {
                error: true,
                message: 'COMPANY_ID is not defined in .env',
                statusCode: 500,
            }
        }
        const categories = await prisma.categories.findMany({
            where: {
                company_id: BigInt(companyId),
                status: true,
                offers: { some: { status: true } },
            },
            orderBy: { name: 'asc' },
            select: {
                id: true,
                name: true,
            },
        })

        return serializeBigInt(categories)
    } catch (error:any) {
        console.error(error)
        return {
            error: true,
            message: error.message,
            statusCode: 500,
        }
    }
})
