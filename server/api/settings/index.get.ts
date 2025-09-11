import { prisma } from "@@/server/utils/prisma";

export default defineEventHandler(async () => {

    try {
        const config = useRuntimeConfig();
        const companyId =config.companyId;
        if (!companyId) {
            throw new Error('COMPANY_ID is not defined in .env')
        }

        const result = await prisma.company_frontend_settings.findFirst({
            where: {
                company_id: BigInt(companyId),
            },
            select: {
                settings: true,
            },
        })

        // Return empty object if settings not found
        return result?.settings ?? {}
    } catch (err:any) {
        console.error(err)
        return {
            error: true,
            message: err.message,
            statusCode: 500,
        }
    }
});
