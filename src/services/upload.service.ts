import { apiWithAuth } from "@/utils/http";

import { mockDeleteFile, mockDownloadFile, mockSearchFiles, mockUploadFile } from "./mock/upload.mock";
import { BaseService } from "./base.service";

// Set to true to use mock API, false to use real API
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === "true" || true; // Default to true for testing

export class UploadService extends BaseService<TBaseResponse<Record<string, unknown>>, UploadModel.TUploadRequest> {
  constructor() {
    super("/api/v1/uploadFile", "id" as keyof TBaseResponse<Record<string, unknown>>);
  }

  async uploadFile(data: FormData) {
    if (USE_MOCK_API) {
      return mockUploadFile(data) as Promise<TBaseResponse<Record<string, unknown>>>;
    }
    return apiWithAuth.post<TBaseResponse<Record<string, unknown>>, FormData>(`${this.baseUrl}/upload`, data);
  }

  async searchFile(params?: UploadModel.TUploadRequest, signal?: AbortSignal) {
    if (USE_MOCK_API) {
      return mockSearchFiles(params) as Promise<TBaseResponse<Record<string, unknown>>>;
    }
    return apiWithAuth.get<TBaseResponse<Record<string, unknown>>>(`${this.baseUrl}/search`, { params, signal });
  }

  async downloadFile(id: string) {
    if (USE_MOCK_API) {
      return mockDownloadFile(id);
    }
    return apiWithAuth.get(`${this.baseUrl}/download`, { params: { id } });
  }

  async deleteFile(id: string) {
    if (USE_MOCK_API) {
      return mockDeleteFile(id) as Promise<TBaseResponse<Record<string, unknown>>>;
    }
    return this.delete(id);
  }
}

export const uploadService = new UploadService();
