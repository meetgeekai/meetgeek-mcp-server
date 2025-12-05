export interface PaginationParams {
    cursor?: string;
    limit?: number;
}

export interface UploadRecordingParams {
    download_url: string;
    language_code: string;
    template_name?: string;
}
