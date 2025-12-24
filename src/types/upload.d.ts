declare namespace UploadModel {
  type TUploadRequest = {
    type?: string;
    name?: string;
    version?: string;
  };

  type TUploadFilePayload = {
    file: File;
    uploadUserID: string;
    type: string;
    name: string;
    revision: string;
    fileName: string;
    title: string;
    comment: string;
    userID: string;
  };

  type TUploadFile = {
    id: string;
    no: number;
    title: string;
    type: string;
    value: string; // filename.extension
    updateDate: string;
    uploadUser: string;
    comment: string;
  };

  type TUploadFileListResponse = {
    files: TUploadFile[];
  };
}
