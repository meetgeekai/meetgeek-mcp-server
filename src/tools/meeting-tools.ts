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
        // TODO: Future implementation
        // this.registerUploadRecordingTools();
    }

    private registerMeetingsTools() {
        this.mcpServer.tool(
            "meetings",
            "Retrieves paginated past meetings of a user",
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
            "Get meeting details given a meeting id",
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
            "Get all transcript sentences by meeting id",
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
            "Get all highlights by meeting id",
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
            "Get summary given the meeting id",
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
            "Retrieves paginated past meetings of a user",
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

    // TODO: Future implementation
    // private registerUploadRecordingTools() {
    //     this.mcpServer.tool(
    //         "uploadRecording",
    //         "Upload a video or audio file for analysis and receive a notification upon completion",
    //         {
    //             download_url: z.string(),
    //             language_code: z.string(),
    //             template_name: z.string().optional(),
    //         },
    //         async (args) => {
    //             try {
    //                 const data = await this.apiService.uploadRecording(args);
    //                 return {
    //                     content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
    //                 };
    //             } catch (error) {
    //                 return {
    //                     content: [
    //                         {
    //                             type: "text",
    //                             text: `Error uploading recording: ${error instanceof Error ? error.message : 'Unknown error'}`,
    //                         },
    //                     ],
    //                 };
    //             }
    //         }
    //     );
    // }
}
