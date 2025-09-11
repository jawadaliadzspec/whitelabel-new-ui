import { prisma } from "@@/server/utils/prisma";

function serializeBigInt(obj:any) {
    return JSON.parse(JSON.stringify(obj, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
    ))
}

export default defineEventHandler(async (event) => {
    try {
        const config = useRuntimeConfig();
        const companyId =config.companyId;
        if (!companyId) {
            return {
                error: true,
                message: 'COMPANY_ID is not defined in .env',
                statusCode: 500,
            }
        }
        const stores = await prisma.stores.findMany({
            where: {
                company_id: BigInt(companyId),
                status: 1,
                offers: {
                    some: { status: true } // or status: 1 if integer
                }
            },
            orderBy: { name: 'asc' },
            // You can add select: {} if you want to limit returned fields
        })
        return serializeBigInt(stores)
    } catch (error:any) {
        console.error(error)
        return {
            error: true,
            message: error.message,
            statusCode: 500,
        }
    }
})
