import { faker } from '@faker-js/faker';
import type { IPost } from 'src/types';

const createPost = (id: number): IPost => {
  return {
    id,
    userId: 1,
    content: faker.lorem.paragraphs(3),
    media: Math.random() < 0.5 ? faker.image.url() : undefined,
    isMediaVideo: false,
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
  };
};

export const posts: IPost[] = Array.from({ length: 20 }, (_, i) =>
  createPost(i + 1)
);
