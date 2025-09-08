import { prisma } from "@@/server/utils/prisma";

export default defineEventHandler(async () => {
 const result = await prisma.company_frontend_settings.findFirst({
            where: {
                company_id: BigInt(1),
            },
            select: {
                settings: true,
            },
        })

        // Return empty object if settings not found
        return result?.settings ?? {}
});
