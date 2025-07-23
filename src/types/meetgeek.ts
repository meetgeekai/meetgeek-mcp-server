export interface Meeting {
    id: string;
    title?: string;
    startTime?: string;
    endTime?: string;
    participants?: string[];
}

export interface MeetingDetails extends Meeting {
    transcript?: string;
    summary?: string;
    highlights?: string[];
}

export interface PaginationParams {
    cursor?: string;
    limit?: number;
}

export interface UploadRecordingParams {
    download_url: string;
    language_code: string;
    template_name?: string;
}
