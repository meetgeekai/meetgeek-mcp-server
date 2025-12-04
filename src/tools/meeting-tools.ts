import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { MeetgeekApiService } from "../services/meetgeek-api.js";
import { languageCodes } from "../constants/meetgeek-constants.js";

export class MeetingTools {
    constructor(
        private mcpServer: McpServer,
        private apiService: MeetgeekApiService
    ) {}

    registerTools() {
        this.registerMeetingsTools();
        this.registerMeetingDetailsTools();
        this.registerTranscriptTools();
        this.registerHighlightsTools();
        this.registerSummaryTools();
        this.registerTeamMeetingsTools();
        this.registerInsightsTools();
        this.registerUploadRecordingTools();
    }

    private registerMeetingsTools(): void {
        this.mcpServer.registerTool(
            "meetings",
            {
                title: "List User Meetings",
                description: "Retrieves paginated past meetings of a user",
                inputSchema: {
                    cursor: z.string().optional(),
                    limit: z.number().optional(),
                },
                annotations: {
                    readOnlyHint: true,
                    destructiveHint: false,
                    idempotentHint: true,
                    openWorldHint: true,
                },
            },
            async (args) => {
                try {
                    const data = await this.apiService.getMeetings(args);
                    return {
                        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: `Error fetching meetings: ${error instanceof Error ? error.message : 'Unknown error'}`,
                            },
                        ],
                    };
                }
            },
        );
    }

    private registerMeetingDetailsTools() {
        this.mcpServer.registerTool(
            "meetingDetails",
            {
                title: "Get Meeting Details",
                description: "Get meeting details given a meeting id",
                inputSchema: {
                    meetingId: z.string(),
                },
                annotations: {
                    readOnlyHint: true,
                    destructiveHint: false,
                    idempotentHint: true,
                    openWorldHint: true,
                },
            },
            async (args) => {
                try {
                    const data = await this.apiService.getMeetingDetails(args.meetingId);
                    return {
                        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: `Error fetching meeting details: ${error instanceof Error ? error.message : 'Unknown error'}`,
                            },
                        ],
                    };
                }
            }
        );
    }

    private registerTranscriptTools() {
        this.mcpServer.registerTool(
            "transcript",
            {
                title: "Get Meeting Transcript",
                description: "Get all transcript sentences by meeting id",
                inputSchema: {
                    meetingId: z.string(),
                    cursor: z.string().optional(),
                    limit: z.number().optional(),
                },
                annotations: {
                    readOnlyHint: true,
                    destructiveHint: false,
                    idempotentHint: true,
                    openWorldHint: true,
                },
            },
            async (args) => {
                try {
                    const { meetingId, ...params } = args;
                    const data = await this.apiService.getTranscript(meetingId, params);
                    return {
                        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: `Error fetching transcript: ${error instanceof Error ? error.message : 'Unknown error'}`,
                            },
                        ],
                    };
                }
            }
        );
    }

    private registerHighlightsTools() {
        this.mcpServer.registerTool(
            "highlights",
            {
                title: "Get Meeting Highlights",
                description: "Get all highlights by meeting id",
                inputSchema: {
                    meetingId: z.string(),
                },
                annotations: {
                    readOnlyHint: true,
                    destructiveHint: false,
                    idempotentHint: true,
                    openWorldHint: true,
                },
            },
            async (args) => {
                try {
                    const data = await this.apiService.getHighlights(args.meetingId);
                    return {
                        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: `Error fetching highlights: ${error instanceof Error ? error.message : 'Unknown error'}`,
                            },
                        ],
                    };
                }
            }
        );
    }

    private registerSummaryTools() {
        this.mcpServer.registerTool(
            "summary",
            {
                title: "Get Meeting Summary",
                description: "Get summary given the meeting id",
                inputSchema: {
                    meetingId: z.string(),
                },
                annotations: {
                    readOnlyHint: true,
                    destructiveHint: false,
                    idempotentHint: true,
                    openWorldHint: true,
                }
            },
            async (args) => {
                try {
                    const data = await this.apiService.getSummary(args.meetingId);
                    return {
                        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: `Error fetching summary: ${error instanceof Error ? error.message : 'Unknown error'}`,
                            },
                        ],
                    };
                }
            }
        );
    }

    private registerInsightsTools() {
        this.mcpServer.registerTool(
            "insights",
            {
                title: "Get Meeting Insights",
                description: "Get all insights by meeting id",
                inputSchema: {
                    meetingId: z.string(),
                },
                annotations: {
                    readOnlyHint: true,
                    destructiveHint: false,
                    idempotentHint: true,
                    openWorldHint: true,
                },
            },
            async (args) => {
                try {
                    const data = await this.apiService.getInsights(args.meetingId);
                    return {
                        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: `Error fetching insights: ${error instanceof Error ? error.message : 'Unknown error'}`,
                            },
                        ],
                    };
                }
            }
        )
    }

    private registerTeamMeetingsTools() {
        this.mcpServer.registerTool(
            "teamMeetings",
            {
                title: "List Team Meetings",
                description: "Retrieves paginated past meetings of a user",
                inputSchema: {
                    teamId: z.string(),
                    cursor: z.string().optional(),
                    limit: z.number().optional(),
                },
                annotations: {
                    readOnlyHint: true,
                    destructiveHint: false,
                    idempotentHint: true,
                    openWorldHint: true,
                }
            },
            async (args) => {
                try {
                    const { teamId, ...params } = args;
                    const data = await this.apiService.getTeamMeetings(teamId, params);
                    return {
                        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: `Error fetching team meetings: ${error instanceof Error ? error.message : 'Unknown error'}`,
                            },
                        ],
                    };
                }
            }
        );
    }

    private registerUploadRecordingTools() {
        this.mcpServer.registerTool(
            "uploadRecording",
            {
                title: "Upload Recording",
                description: "Upload a video or audio file for analysis and receive a notification upon completion",
                inputSchema: {
                    download_url: z.string(),
                    language_code: z.enum(languageCodes),
                    template_name: z.string().optional(),
                },
                annotations: {
                    readOnlyHint: false,
                    destructiveHint: true,
                    idempotentHint: false,
                    openWorldHint: false,
                }
            },
            async (args) => {
                try {
                    const data = await this.apiService.uploadRecording(args);
                    return {
                        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
                    };
                } catch (error) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: `Error uploading recording: ${error instanceof Error ? error.message : 'Unknown error'}`,
                            },
                        ],
                    };
                }
            }
        );
    }
}
