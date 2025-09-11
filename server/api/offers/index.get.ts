import { prisma } from "@@/server/utils/prisma";

function serializeBigInt(obj:any) {
    return JSON.parse(JSON.stringify(obj, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
    ))
}

export default defineEventHandler(async (event) => {
    const query:any = getQuery(event)
    const page = parseInt(query.page) > 0 ? parseInt(query.page) : 1
    const perPage = parseInt(query.limit) > 0 ? parseInt(query.limit) : 10 // Default: 10 offers per page
    const categories = query.categories
        ? query.categories.split(',').map((id:number) => Number(id)).filter(Boolean)
        : []
    const stores = query.stores
        ? query.stores.split(',').map((id:number) => Number(id)).filter(Boolean)
        : []

    const config = useRuntimeConfig();
    const companyId =config.companyId;
    if (!companyId) {
        return {
            error: true,
            message: 'COMPANY_ID is not defined in .env',
            statusCode: 500,
        }
    }

    try {
        // 1. Get total count for meta
        const total = await prisma.offers.count({
            where: {
                company_id: BigInt(companyId),
                status: true,
                stores: {
                    status: 1,
                },
                ...(categories.length > 0 ? { category_id: { in: categories } } : {}),
                ...(stores.length > 0 ? { store_id: { in: stores } } : {}),
            },
        })

        // 2. Fetch offers for current page (FIXED: added category filter)
        const offers = await prisma.offers.findMany({
            where: {
                company_id: BigInt(companyId),
                status: true,
                stores: {
                    status: 1,
                },
                ...(categories.length > 0 ? { category_id: { in: categories } } : {}),
                ...(stores.length > 0 ? { store_id: { in: stores } } : {}),
            },
            orderBy: { id: 'desc' },
            skip: (page - 1) * perPage,
            take: perPage,
            include: {
                stores: true,
            }
        })

        return {
            data: serializeBigInt(offers),
            meta: {
                page,
                perPage,
                total,
                totalPages: Math.ceil(total / perPage),
            }
        }
    } catch (err:any) {
        console.error(err)
        return {
            error: true,
            message: err.message || 'Unknown error',
            statusCode: 500,
            details: err,
        }
    }
})
