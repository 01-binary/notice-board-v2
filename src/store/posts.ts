import { observable, flow, makeObservable } from 'mobx';
import { AxiosResponse } from 'axios';

import { service } from 'apis';
import {
  PostsState,
  SelectedPostState,
  AddPostState,
  Post,
} from 'interface/posts';

class Posts {
  posts: PostsState = {
    loading: false,
    data: [],
    total: null,
    error: null,
  };
  selectedPost: SelectedPostState = {
    loading: false,
    data: null,
    error: null,
  };
  addPostState: AddPostState = {
    loading: false,
    error: null,
  };
  page: number = 1;

  constructor() {
    makeObservable(this, {
      posts: observable,
      selectedPost: observable,
      addPostState: observable,
      page: observable,
      getPosts: flow,
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
}

const postsStore = new Posts();
export default postsStore;
