import "dotenv/config";
import { MeetgeekMcpServer } from "./server.js";

async function main() {
    const server = new MeetgeekMcpServer();
    await server.start();
}

main().catch((error) => {
    console.error("Application failed to start:", error);
    process.exit(1);
});