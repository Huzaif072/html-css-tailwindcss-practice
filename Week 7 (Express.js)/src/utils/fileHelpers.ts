import { promises as fs } from "fs";

export async function readJsonFile(filePath: string, defaultValue: any = []) {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        return JSON.parse(data || "null") ?? defaultValue;
    } catch {
        return defaultValue;
    }
}

export async function writeJsonFile(filePath: string, data: any) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}
