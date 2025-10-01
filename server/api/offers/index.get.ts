import { prisma } from "@@/server/utils/prisma";

function serializeBigInt(obj:any) {
    return JSON.parse(JSON.stringify(obj, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
    ))
}
async function getDealsLimitForCompany(companyId: string | number) {
    const today = new Date();

    const active = await prisma.company_subscriptions.findFirst({
        where: {
            company_id: BigInt(companyId),
            status: 'active',                 // adjust if your statuses differ
            //start_date: { lte: today },
            //end_date: { gte: today },
        },
        include: {
            subscriptions: {
                include: {
                    subscription_feature_values: {
                        include: { features: true },
                        where: { features: { key: 'deals_limit' } }, // <-- feature key
                    },
                },
            },
        },
    });

    const raw = active?.subscriptions?.subscription_feature_values?.[0]?.value ?? null;
    const parsed = raw !== null ? parseInt(String(raw), 10) : null;

    // If no value found, treat as "unlimited"
    return Number.isFinite(parsed) && parsed! >= 0 ? parsed! : Number.POSITIVE_INFINITY;
}
export default defineEventHandler(async (event) => {
    const query: any = getQuery(event);
    const page = parseInt(query.page) > 0 ? parseInt(query.page) : 1;
    const perPage = parseInt(query.limit) > 0 ? parseInt(query.limit) : 10;

    const categories = query.categories
        ? query.categories.split(',').map((id: string) => Number(id)).filter(Boolean)
        : [];

    const stores = query.stores
        ? query.stores.split(',').map((id: string) => Number(id)).filter(Boolean)
        : [];

    const config = useRuntimeConfig();
    const companyId = config.companyId;

    if (!companyId) {
        return {
            error: true,
            message: 'COMPANY_ID is not defined in .env',
            statusCode: 500,
        };
    }

    try {
        // 0) Get limit from subscription features
        const dealsLimit = await getDealsLimitForCompany(companyId);

        // 1) Count total matching offers in DB
        const baseWhere = {
            company_id: BigInt(companyId),
            status: true,
            stores: { status: 1 },
            ...(categories.length > 0 ? { category_id: { in: categories } } : {}),
            ...(stores.length > 0 ? { store_id: { in: stores } } : {}),
        } as const;

        const dbTotal = await prisma.offers.count({ where: baseWhere });

        // 2) Effective total is capped by subscription limit
        const total = Math.min(dbTotal, dealsLimit);

        // If limit is 0, short-circuit with empty set
        if (total <= 0) {
            return {
                data: [],
                meta: {
                    page,
                    perPage,
                    total: 0,
                    totalPages: 0,
                    dealsLimit,
                },
            };
        }

        // 3) Compute paginated window within the capped total
        const rawSkip = (page - 1) * perPage;
        const skip = Math.min(rawSkip, Math.max(total - 1, 0)); // don’t skip past total
        const remaining = Math.max(total - skip, 0);
        const take = Math.max(Math.min(perPage, remaining), 0);

        // 4) Fetch offers page only if take > 0
        const offers = take > 0
            ? await prisma.offers.findMany({
                where: baseWhere,
                orderBy: { id: 'desc' },
                skip,
                take,
                include: { stores: true },
            })
            : [];

        return {
            data: serializeBigInt(offers),
            meta: {
                page,
                perPage,
                total,
                totalPages: Math.ceil(total / perPage),
                dealsLimit,
            },
        };
    } catch (e: any) {
        return {
            error: true,
            message: e?.message ?? 'Unexpected error',
            statusCode: 500,
        };
    }
});
