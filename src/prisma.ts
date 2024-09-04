import { PrismaClient } from "@prisma/client";

export class PrismaSingleton {
    private static prisma: PrismaClient;
    private static init() {
        this.prisma = new PrismaClient();
        this.initAdminUser();
    }

    private static async initAdminUser() {
        const adminEmail = process.env.ADMIN_EMAIL;
        if (!adminEmail) throw new Error("Admin email is not defined!");
        const prevAdmin = await this.prisma.user.findUnique({ where: { email: adminEmail } });
        if (!prevAdmin || prevAdmin.email != adminEmail) {
            await this.prisma.user.create({
                data: {
                    email: adminEmail,
                    name: "Admin",
                    role: 1,
                }
            })
        }
    }

    static getClient() {
        if (!this.prisma) this.init();
        return this.prisma;
    }
}