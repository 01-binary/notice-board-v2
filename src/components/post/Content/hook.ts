import { useCallback, useEffect } from 'react';
import { useObserver } from 'mobx-react';

import useStore from 'store';

import type { Post } from 'interface/posts';
import { CONTENT_LIMIT } from 'assets/string';

const useContent = () => {
  const { postsStore } = useStore();

  const setPage = useCallback(() => {
    postsStore.setPage(postsStore.page + 1);
  }, [postsStore]);

  const getSelectedPost = useCallback(
    (id: number) => {
      postsStore.getSelectedPost(id);
    },
    [postsStore],
  );

  useEffect(() => {
    postsStore.getPosts();
  }, [postsStore, postsStore.page]);

  return useObserver(() => ({
    setPage,
    getSelectedPost,
    posts: postsStore.posts.data.map((post: Post) => ({
      id: post.id,
      title: post.title,
      author: post.author,
      createdAt: post.createdAt,
    })),
    selectedPost: postsStore.selectedPost.data,
    isNeedMoreFetch:
      !!postsStore.posts.total &&
      CONTENT_LIMIT * postsStore.page < postsStore.posts.total,
    postsLoading: postsStore.posts.loading,
    addPostLoading: postsStore.addedPost.loading,
    selectedPostLoading: postsStore.selectedPost.loading,
  }));
};

export default useContent;
