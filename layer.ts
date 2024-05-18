import path from "path";
import fs from "fs";

const prismaDatabaseLayerPath = "./.sst/layers/prisma";

export function preparePrismaLayerFiles() {
    // Remove any existing layer path data
    fs.rmSync(prismaDatabaseLayerPath, { force: true, recursive: true });

    // Create a fresh new layer path
    fs.mkdirSync(prismaDatabaseLayerPath, { recursive: true });

    // Prisma folders to retrieve the client and the binaries from
    const prismaFiles = [
        "node_modules/@prisma/client",
        "node_modules/prisma/build",
    ];

    for (const file of prismaFiles) {
        fs.cpSync(file, path.join(prismaDatabaseLayerPath, "nodejs", file), {
            // Do not include binary files that aren't for AWS to save space
            filter: (src) =>
                !src.endsWith("so.node") ||
                src.includes("rhel") ||
                src.includes("linux-arm64"),
            recursive: true,
        });
    }
}
