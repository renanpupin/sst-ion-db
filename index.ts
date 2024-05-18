import prisma from "./prisma";
import {db} from "./db";
import {UserSchema} from "./drizzle/schema";

export async function prismaHandler(event: any, context: any) {
    const start = new Date()
    const users = await prisma.user.findMany({take: 100})
    const end = new Date()
    const duration = `${(end.getTime() - start.getTime())/1000}s`

    return {
        statusCode: 200,
        body: JSON.stringify({ duration, users }, null, 2),
    };
}

export async function drizzleHandler(event: any, context: any) {
    const start = new Date()
    const users = await db.select().from(UserSchema).limit(100);
    const end = new Date()
    const duration = `${(end.getTime() - start.getTime())/1000}s`

    return {
        statusCode: 200,
        body: JSON.stringify({ duration, users }, null, 2),
    };
}
