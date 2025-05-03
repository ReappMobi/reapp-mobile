export type AddCommentData = {
  token: string;
  postId: number;
  content: string;
};

export type GetPostCommentsParams = {
  token: string;
  postId: number;
  page: number;
};

export type GetPostCommentsResponse = Comment[];
