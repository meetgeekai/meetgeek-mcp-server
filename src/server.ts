import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { validateConfig } from "./config/environments.js";
import { MeetgeekApiService } from "./services/meetgeek-api.js";
import { MeetingTools } from "./tools/meeting-tools.js";

export class MeetgeekMcpServer {
    private mcpServer: McpServer;
    private apiService: MeetgeekApiService;
    private meetingTools: MeetingTools;

    constructor() {
        console.error("Initializing MCP server...");

        const config = validateConfig();

        this.mcpServer = new McpServer(
            {
                name: "MeetgeekMCP",
                version: "1.0.0",
            },
            {
                capabilities: {
                    tools: {},
                },
            }
        );

        this.apiService = new MeetgeekApiService(config);
        this.meetingTools = new MeetingTools(this.mcpServer, this.apiService);
    }

    async start() {
        try {
            // Register all tools
            this.meetingTools.registerTools();
            console.error("MCP tools registered successfully");

            // Start the server with stdio transport
            const transport = new StdioServerTransport();
            await this.mcpServer.connect(transport);

            console.error("MCP server started successfully");
        } catch (error) {
            console.error("Failed to start MCP server:", error);
            process.exit(1);
        }
    }
}
