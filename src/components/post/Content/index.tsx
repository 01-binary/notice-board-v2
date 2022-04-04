import { FC } from 'react';

import Table from 'components/common/Table';
import Loading from 'components/common/Loading';
import Modal from 'components/common/Modal';

import useContent from './hook';

import { TITLE, AUTHOR } from 'assets/string';
import { postColumn } from 'assets/columns';
import { useIntersectionObserver, useModalData } from 'hooks';

const Content: FC = () => {
  const { isModalVisible, showModal, closeModal } = useModalData();
  const {
    setPage,
    getSelectedPost,
    posts,
    selectedPost,
    isNeedMoreFetch,
    postsLoading,
    addPostLoading,
    selectedPostLoading,
  } = useContent();

  const { setTarget } = useIntersectionObserver({
    onIntersect: ([{ isIntersecting }]) => {
      if (isIntersecting && !addPostLoading && !postsLoading) {
        setPage();
      }
    },
  });

  return (
    <>
      <Table
        data={posts}
        columns={postColumn}
        onClick={(event) => {
          if (
            typeof event.currentTarget.rowIndex === 'number' &&
            event.currentTarget.rowIndex > 0
          ) {
            getSelectedPost(event.currentTarget.rowIndex);
            showModal();
          }
        }}
      />
      {isNeedMoreFetch ? (
        <div ref={setTarget}>
          <Loading height="100px" />
        </div>
      ) : (
        <div className="flex justify-center m-8 font-medium">페이지 끝!</div>
      )}

      <Modal visible={isModalVisible} closeModal={closeModal}>
        {selectedPostLoading ? (
          <Loading />
        ) : (
          <div className="flex flex-col mt-8 mt-4 mb-0 gap-2">
            <div className="font-bold text-xl">{`${TITLE} ${selectedPost?.title}`}</div>
            <div className="flex justify-end font-medium">{`${AUTHOR} ${selectedPost?.author}`}</div>
            <div className="my-4 mx-0">{`${selectedPost?.content}`}</div>
            <div className="flex justify-center decoration-gray-200">{`${selectedPost?.createdAt}`}</div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Content;
