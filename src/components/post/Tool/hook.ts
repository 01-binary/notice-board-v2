import { useCallback } from 'react';
import { useObserver } from 'mobx-react';

import useStore from 'store';

import type { AddPostRequest } from 'interface/posts';

const useTool = () => {
  const { postsStore } = useStore();

  const addPost = useCallback(
    (params: { addPostRequest: AddPostRequest; onSuccess: () => void }) => {
      postsStore.addPost(params);
    },
    [postsStore],
  );

  return useObserver(() => ({
    addPost,
    addPostLoading: postsStore.addedPost.loading,
    total: postsStore.posts.total,
  }));
};

export default useTool;
