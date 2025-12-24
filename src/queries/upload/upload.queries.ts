import { useMutation, useQuery } from "@tanstack/vue-query";

import { uploadService } from "@/services/upload.service";

export const uploadFileQueryKey = {
  search: (params?: UploadModel.TUploadRequest) => ["search-files", params],
};

export const useSearchFiles = (params?: UploadModel.TUploadRequest) => {
  return useQuery<TBaseResponse<UploadModel.TUploadFileListResponse>>({
    queryKey: uploadFileQueryKey.search(params),
    queryFn: async ({ signal }) => {
      return uploadService.searchFile(params, signal) as Promise<TBaseResponse<UploadModel.TUploadFileListResponse>>;
    },
  });
};

export const useUploadFile = () => {
  return useMutation({
    mutationFn: async (payload: UploadModel.TUploadFilePayload) => {
      const formData = new FormData();

      // Append file
      formData.append("file", payload.file);

      // Append text fields
      formData.append("uploadUserID", payload.uploadUserID);
      formData.append("type", payload.type);
      formData.append("name", payload.name);
      formData.append("revision", payload.revision);
      formData.append("fileName", payload.fileName);
      formData.append("title", payload.title);
      formData.append("comment", payload.comment);
      formData.append("userID", payload.userID);

      return uploadService.uploadFile(formData);
    },
  });
};

export const useDownloadFile = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      return uploadService.downloadFile(id);
    },
  });
};

export const useDeleteFile = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      return uploadService.deleteFile(id);
    },
  });
};
