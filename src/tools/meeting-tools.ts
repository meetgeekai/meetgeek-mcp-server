import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { MeetgeekApiService } from "../services/meetgeek-api.js";

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
        this.registerUploadRecordingTools();
    }

    private registerMeetingsTools() {
        this.mcpServer.tool(
            "meetings",
            {
                cursor: z.string().optional(),
                limit: z.number().optional(),
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
            }
        );
    }

    private registerMeetingDetailsTools() {
        this.mcpServer.tool(
            "meetingDetails",
            {
                meetingId: z.string(),
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
        this.mcpServer.tool(
            "transcript",
            {
                meetingId: z.string(),
                cursor: z.string().optional(),
                limit: z.number().optional(),
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
        this.mcpServer.tool(
            "highlights",
            {
                meetingId: z.string(),
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
        this.mcpServer.tool(
            "summary",
            {
                meetingId: z.string(),
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

    private registerTeamMeetingsTools() {
        this.mcpServer.tool(
            "teamMeetings",
            {
                teamId: z.string(),
                cursor: z.string().optional(),
                limit: z.number().optional(),
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
        this.mcpServer.tool(
            "uploadRecording",
            {
                download_url: z.string(),
                language_code: z.string(),
                template_name: z.string().optional(),
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
