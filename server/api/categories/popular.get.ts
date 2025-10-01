import { prisma } from "@@/server/utils/prisma";
function serializeBigInt(obj:any) {
    return JSON.parse(JSON.stringify(obj, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
    ));
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
        const activeStores = await prisma.stores.findMany({
            where: { status: 1 },
            select: { id: true },
        });
        const activeStoreIds = activeStores.map(s => s.id);
        const categoriesRaw = await prisma.categories.findMany({
            where: { company_id: BigInt(companyId),status: true },
            select: {
                id: true,
                name: true,
                _count: {
                    select: {
                        offers: {
                            where: {
                                store_id: { in: activeStoreIds },
                            },
                        },
                    },
                },
            },
            orderBy: { name: 'asc' },
        });
        const categories = categoriesRaw.filter(c => c._count.offers > 0);
        return serializeBigInt(categories)
    } catch (err:any) {
        return {
            error: true,
            message: err.message,
            statusCode: 500,
        }
    }
})
