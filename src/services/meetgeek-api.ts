import axios, { AxiosInstance } from "axios";
import { Config } from "../config/environments.js";
import { PaginationParams, UploadRecordingParams } from "../types/meetgeek.js";

export class MeetgeekApiService {
    private client: AxiosInstance;

    constructor(private config: Config) {
        this.client = axios.create({
            baseURL: `${config.meetgeekBaseUrl}/v1`,
            headers: {
                Authorization: `Bearer ${config.apiToken}`,
                "Content-Type": "application/json",
            },
        });
    }

    async getMeetings(params: PaginationParams = {}) {
        const queryParams: Record<string, string> = {};
        if (params.cursor) queryParams.cursor = encodeURIComponent(params.cursor);
        if (params.limit) queryParams.limit = encodeURIComponent(params.limit.toString());

        const response = await this.client.get("/meetings", { params: queryParams });
        return response.data;
    }

    async getMeetingDetails(meetingId: string) {
        const response = await this.client.get(`/meetings/${meetingId}`);
        return response.data;
    }

    async getTranscript(meetingId: string, params: PaginationParams = {}) {
        const response = await this.client.get(`/meetings/${meetingId}/transcript`, {
            params,
        });
        return response.data;
    }

    async getHighlights(meetingId: string) {
        const response = await this.client.get(`/meetings/${meetingId}/highlights`);
        return response.data;
    }

    async getSummary(meetingId: string) {
        const response = await this.client.get(`/meetings/${meetingId}/summary`);
        return response.data;
    }

    async getTeamMeetings(teamId: string, params: PaginationParams = {}) {
        const response = await this.client.get(`/teams/${teamId}/meetings`, {
            params,
        });
        return response.data;
    }

    async uploadRecording(params: UploadRecordingParams) {
        const response = await this.client.post("/upload", params);
        return response.data;
    }
}