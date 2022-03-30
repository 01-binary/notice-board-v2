import { AxiosResponse } from 'axios';
import Client from 'apis/client';

import { now } from 'utils/day';
import type { AddPostRequest } from 'interface/posts';

const service = {
  async getPostList(page: number = 1, limit: number = 10) {
    const res: AxiosResponse = await Client.instance.get(
      `${Client.path.Api}/posts?_limit=${limit}&_page=${page}`,
    );
    return res;
  },

  async getPostDetailInformation(postId: number) {
    if (!postId) return {};
    const res: AxiosResponse = await Client.instance.get(
      `${Client.path.Api}/posts/${postId}`,
    );
    return res;
  },

  async addPost(addPostRequest: AddPostRequest) {
    const res: AxiosResponse = await Client.instance.post(
      `${Client.path.Api}/posts`,
      { ...addPostRequest, createdAt: now() },
    );
    return res;
  },
};

export default service;
