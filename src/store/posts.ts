import { observable, flow, makeObservable } from 'mobx';
import { AxiosResponse } from 'axios';

import { service } from 'apis';
import {
  PostsState,
  SelectedPostState,
  AddPostState,
  Post,
  AddPostRequest,
} from 'interface/posts';

class Posts {
  posts: PostsState = {
    loading: false,
    data: [],
    total: 0,
    error: null,
  };
  selectedPost: SelectedPostState = {
    loading: false,
    data: null,
    error: null,
  };
  addedPost: AddPostState = {
    loading: false,
    error: null,
  };
  page: number = 1;

  constructor() {
    makeObservable(this, {
      posts: observable,
      selectedPost: observable,
      addedPost: observable,
      page: observable,
      getPosts: flow,
      getSelectedPost: flow,
      addPost: flow,
    });
  }

  setPage = (page: number) => {
    this.page = page;
  };

  *getPosts() {
    this.posts.loading = true;
    try {
      const { data, headers }: AxiosResponse<Post[]> =
        yield service.getPostList(this.page);
      this.posts.data = [...this.posts.data, ...data];
      this.posts.total = Number(headers['x-total-count']);
    } catch ({ response }) {
      const { data, status } = response as AxiosResponse;
      this.posts.error = { data, status };
    } finally {
      this.posts.loading = false;
    }
  }

  *getSelectedPost(id: number) {
    this.selectedPost.loading = true;
    try {
      const { data }: AxiosResponse<Post> =
        yield service.getPostDetailInformation(id);
      this.selectedPost.data = data;
    } catch ({ response }) {
      const { data, status } = response as AxiosResponse;
      this.selectedPost.error = { data, status };
    } finally {
      this.selectedPost.loading = false;
    }
  }

  *addPost(payload: { addPostRequest: AddPostRequest; onSuccess: () => void }) {
    this.addedPost.loading = true;
    const { addPostRequest, onSuccess } = payload;
    try {
      const { data }: AxiosResponse<Post> = yield service.addPost(
        addPostRequest,
      );
    } catch ({ response }) {
      const { data, status } = response as AxiosResponse;
      this.addedPost.error = { data, status };
    } finally {
      this.addedPost.loading = false;
      if (this.page !== 1) {
        this.posts.data = [];
        this.page = 1;
      }
      onSuccess();
    }
  }
}

const postsStore = new Posts();
export default postsStore;
