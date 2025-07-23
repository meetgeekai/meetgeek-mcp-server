import dotenv from "dotenv";

dotenv.config();

export interface Config {
    port: number;
    meetgeekBaseUrl: string;
    apiToken: string;
}

export function validateConfig(): Config {
    const port = process.env.PORT ? Number(process.env.PORT) : 3000;
    const meetgeekBaseUrl = process.env.MEETGEEK_BASE_URL;
    const apiToken = process.env.MEETGEEK_API_KEY;

    if (!meetgeekBaseUrl) {
        throw new Error("Missing MEETGEEK_BASE_URL environment variable");
    }

    if (!apiToken) {
        throw new Error("Missing MEETGEEK_API_KEY environment variable");
    }

    return {
        port,
        meetgeekBaseUrl,
        apiToken,
    };
}
