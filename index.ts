import prisma from "./prisma";

export async function handler(event, context) {
    // By default, the callback waits until the runtime event loop is empty
    // before freezing the process and returning the results to the caller.
    // Setting this property to false requests that AWS Lambda freeze the
    // process soon after the callback is invoked, even if there are events
    // in the event loop.
    context.callbackWaitsForEmptyEventLoop = false;

    const start = new Date()
    const users = await prisma.user.findMany({take: 100})
    const end = new Date()
    const duration = `${(end.getTime() - start.getTime())/1000}s`
    console.log('duration', duration)

    return {
        statusCode: 200,
        body: JSON.stringify({ duration, users }, null, 2),
    };
}
