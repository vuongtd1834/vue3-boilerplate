import type { AxiosError, AxiosResponse } from "axios";

// Mock data for uploaded files (internal use)
export interface MockUploadFile {
  id: string;
  no: number;
  title: string;
  type: string;
  value: string; // filename.extension
  updateDate: string;
  uploadUser: string;
  comment: string;
}

let mockFiles: MockUploadFile[] = [
  {
    id: "1",
    no: 1,
    title: "Design Document",
    type: "PDF",
    value: "design-document.pdf",
    updateDate: "2024-01-15T10:30:00Z",
    uploadUser: "John Doe",
    comment: "Initial design document",
  },
  {
    id: "2",
    no: 2,
    title: "Technical Specification",
    type: "XLSX",
    value: "tech-spec.xlsx",
    updateDate: "2024-01-16T14:20:00Z",
    uploadUser: "Jane Smith",
    comment: "Updated specifications",
  },
  {
    id: "3",
    no: 3,
    title: "Drawing File",
    type: "TIFF",
    value: "drawing.tiff",
    updateDate: "2024-01-17T09:15:00Z",
    uploadUser: "Bob Johnson",
    comment: "Latest drawing version",
  },
];

let nextId = 4;
let errorMode: number | null = null;

// Set error mode for testing
export const setMockErrorMode = (status: number | null) => {
  errorMode = status;
};

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Create mock error response
const createMockError = (status: number): AxiosError => {
  const error = new Error(`Mock ${status} Error`) as AxiosError;
  error.response = {
    status,
    statusText:
      status === 400
        ? "Bad Request"
        : status === 401
          ? "Unauthorized"
          : status === 403
            ? "Forbidden"
            : status === 404
              ? "Not Found"
              : "Internal Server Error",
    data: {
      message: `Mock error response for status ${status}`,
    },
    headers: {},
    config: {} as any,
  } as AxiosResponse;
  error.isAxiosError = true;
  return error;
};

// Mock search files API
export const mockSearchFiles = async (
  params?: UploadModel.TUploadRequest
): Promise<TBaseResponse<UploadModel.TUploadFileListResponse>> => {
  await delay(500);

  if (errorMode) {
    throw createMockError(errorMode);
  }

  let filteredFiles = [...mockFiles];

  if (params?.type) {
    filteredFiles = filteredFiles.filter((file) => file.type.toLowerCase() === params.type?.toLowerCase());
  }

  if (params?.name) {
    filteredFiles = filteredFiles.filter((file) => file.value.toLowerCase().includes(params.name?.toLowerCase() || ""));
  }

  return {
    data: {
      files: filteredFiles as UploadModel.TUploadFile[],
    },
    code: "200",
    message: "Success",
  };
};

// Mock upload file API
export const mockUploadFile = async (formData: FormData): Promise<TBaseResponse<UploadModel.TUploadFile>> => {
  await delay(1000);

  if (errorMode) {
    throw createMockError(errorMode);
  }

  const file = formData.get("file") as File;
  const title = formData.get("title") as string;
  const type = formData.get("type") as string;
  const comment = formData.get("comment") as string;
  const uploadUserID = formData.get("uploadUserID") as string;

  const newFile: UploadModel.TUploadFile = {
    id: String(nextId++),
    no: mockFiles.length + 1,
    title: title || file.name,
    type: type || file.name.split(".").pop()?.toUpperCase() || "UNKNOWN",
    value: file.name,
    updateDate: new Date().toISOString(),
    uploadUser: uploadUserID || "Current User",
    comment: comment || "",
  };

  mockFiles.push(newFile as MockUploadFile);

  return {
    data: newFile,
    code: "200",
    message: "File uploaded successfully",
  };
};

// Mock download file API
export const mockDownloadFile = async (id: string): Promise<Blob> => {
  await delay(500);

  if (errorMode) {
    throw createMockError(errorMode);
  }

  const file = mockFiles.find((f) => f.id === id);
  if (!file) {
    throw createMockError(404);
  }

  // Return a mock blob
  return new Blob([`Mock content for ${file.value}`], { type: "application/octet-stream" });
};

// Mock delete file API
export const mockDeleteFile = async (id: string): Promise<TBaseResponse<Record<string, unknown>>> => {
  await delay(500);

  if (errorMode) {
    throw createMockError(errorMode);
  }

  const fileIndex = mockFiles.findIndex((f) => f.id === id);
  if (fileIndex === -1) {
    throw createMockError(404);
  }

  mockFiles.splice(fileIndex, 1);
  // Update no values for remaining files
  mockFiles.forEach((file, index) => {
    file.no = index + 1;
  });

  return {
    data: {},
    code: "200",
    message: "File deleted successfully",
  };
};

// Reset mock data (useful for testing)
export const resetMockData = () => {
  mockFiles = [
    {
      id: "1",
      no: 1,
      title: "Design Document",
      type: "PDF",
      value: "design-document.pdf",
      updateDate: "2024-01-15T10:30:00Z",
      uploadUser: "John Doe",
      comment: "Initial design document",
    },
    {
      id: "2",
      no: 2,
      title: "Technical Specification",
      type: "XLSX",
      value: "tech-spec.xlsx",
      updateDate: "2024-01-16T14:20:00Z",
      uploadUser: "Jane Smith",
      comment: "Updated specifications",
    },
    {
      id: "3",
      no: 3,
      title: "Drawing File",
      type: "TIFF",
      value: "drawing.tiff",
      updateDate: "2024-01-17T09:15:00Z",
      uploadUser: "Bob Johnson",
      comment: "Latest drawing version",
    },
  ];
  nextId = 4;
  errorMode = null;
};
