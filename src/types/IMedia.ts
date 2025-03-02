export interface IMedia {
  id: string;
  statusId: string | null;
  fileFileName: string;
  fileContentType: string;
  fileFileSize: number;
  fileUpdatedAt: string | null;
  remoteUrl: string | null;
  createdAt: string;
  updatedAt: string;
  shortcode: string;
  type: number;
  fileMeta: {
    focus: {
      x: number;
      y: number;
    };
    original: {
      size: string;
      width: number;
      aspect: number;
      height: number;
    };
  };
  accountId: number;
  description: string | null;
  scheduledStatusId: string | null;
  blurhash: string;
  processing: number;
  fileStorageSchemaVersion: number;
  thumbnailFileName: string | null;
  thumbnailContentType: string | null;
  thumbnailFileSize: number | null;
  thumbnailUpdatedAt: string | null;
  thumbnailRemoteUrl: string | null;
}
