import { Comment } from 'src/types/Comment';

export type AddCommentData = {
  postId: number;
  content: string;
};

export type GetPostCommentsParams = {
  postId: number;
};

export type GetPostCommentsResponse = Comment[];
