import { FC } from 'react';

import Table from 'components/common/Table';
import Loading from 'components/common/Loading';
import Modal from 'components/common/Modal';

import { TITLE, AUTHOR } from 'assets/string';
import { postColumn } from 'assets/columns';
import { useIntersectionObserver, useModalData } from 'hooks';

const Content: FC = () => {
  const { isModalVisible, showModal, closeModal } = useModalData();
  // const { postsLoading, setPage } = usePostsFetch();
  // const { addPostLoading } = useAddPostFetch();
  // const { posts, isNeedMoreFetch } = usePostsData();
  const isNeedMoreFetch = true;
  const selectedPostLoading = false;
  // const { getSelectedPost, selectedPostLoading, selectedPost } =
  //   useSelectedPostFetch();

  const { setTarget } = useIntersectionObserver({
    onIntersect: ([{ isIntersecting }]) => {
      // if (isIntersecting && !addPostLoading && !postsLoading) {
      //   setPage();
      // }
    },
  });

  return (
    <>
      <Table
        data={[]}
        columns={postColumn}
        onClick={(event) => {
          if (
            typeof event.currentTarget.rowIndex === 'number' &&
            event.currentTarget.rowIndex > 0
          ) {
            // getSelectedPost(event.currentTarget.rowIndex);
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
            <div className="font-bold text-xl"></div>
            <div className="flex justify-end font-medium"></div>
            <div className="my-4 mx-0"></div>
            <div className="flex justify-center decoration-gray-500"></div>

            {/* <S.TitleWrapper>{`${TITLE} ${selectedPost?.title}`}</S.TitleWrapper> */}
            {/* <S.AuthorWrapper>{`${AUTHOR} ${selectedPost?.author}`}</S.AuthorWrapper> */}
            {/* <S.ContentWrapper>{`${selectedPost?.content}`}</S.ContentWrapper> */}
            {/* <S.CreatedAtWrapper>{`${selectedPost?.createdAt}`}</S.CreatedAtWrapper> */}
          </div>
        )}
      </Modal>
    </>
  );
};

export default Content;
