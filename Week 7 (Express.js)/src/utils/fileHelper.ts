import { promises as fs } from "fs";

export async function readJsonFile(filePath: string, defaultValue: any) {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed : defaultValue;
    } catch (err: any) {
        if (err.code === "ENOENT") {
            return defaultValue;
        } 
        throw err;
    }
}

export async function writeJsonFile(filePath: string, data: any) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}
