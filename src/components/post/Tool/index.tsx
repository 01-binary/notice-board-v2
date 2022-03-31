import React, { FC, useState, useCallback } from 'react';

import Button from 'components/common/Button';
import Modal from 'components/common/Modal';
import Loading from 'components/common/Loading';

import { useModalData } from 'hooks';

import { ADD_POST, TITLE, CONTENT, AUTHOR, TOTAL } from 'assets/string';
import type { AddPostRequest, AddPostInput } from 'interface/posts';

const Tool: FC = () => {
  const { isModalVisible, showModal, closeModal } = useModalData();
  // const { addPost, addPostLoading } = useAddPostFetch();
  const addPostLoading = false;
  // const { total } = usePostsData();
  const [formState, SetFormState] = useState<AddPostRequest>({
    title: '',
    author: '',
    content: '',
  });

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    // addPost({ addPostRequest: { ...formState }, onSuccess: closeModal });
  }, []);

  const handleChange = (input: AddPostInput) => (event: any) => {
    switch (input) {
      case 'title':
        SetFormState({ ...formState, title: event.target.value });
        break;
      case 'author':
        SetFormState({ ...formState, author: event.target.value });
        break;
      case 'content':
        SetFormState({ ...formState, content: event.target.value });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div className="text-lg font-medium">{`${TOTAL} ${0}개`}</div>
        <Button
          size={'medium'}
          onClick={() => {
            showModal();
          }}
        >
          {ADD_POST}
        </Button>
      </div>
      <Modal visible={isModalVisible} closeModal={closeModal}>
        {addPostLoading ? (
          <Loading />
        ) : (
          <>
            <form
              className="flex flex-col m-4 font-medium gap-8"
              onSubmit={handleSubmit}
            >
              <div className="flex items-center">
                <label className="inline-block w-[20%]">{TITLE}</label>
                <input
                  className="border-0 w-[70%] border-b border-solid border-[lightgrey] focus:outline-0 focus:border-[blueviolet]"
                  type="text"
                  value={formState.title}
                  onChange={handleChange('title')}
                  required
                />
              </div>

              <div className="flex items-center">
                <label className="inline-block w-[20%]">{CONTENT}</label>
                <textarea
                  className="border-0 w-[70%] border-b border-solid border-[lightgrey] focus:outline-0 focus:border-[blueviolet]"
                  rows={1}
                  value={formState.content}
                  onChange={handleChange('content')}
                  required
                />
              </div>

              <div className="flex items-center">
                <label className="inline-block w-[20%]">{AUTHOR}</label>
                <input
                  className="border-0 w-[70%] border-b border-solid border-[lightgrey] focus:outline-0 focus:border-[blueviolet]"
                  type="text"
                  value={formState.author}
                  onChange={handleChange('author')}
                  required
                />
              </div>
              <div className="flex justify-end mt-8">
                <input
                  className="border-0 font-bold cursor-pointer bg-[aliceblue] py-2 px-4 rounded-[5px] text-sm"
                  type="submit"
                  value={ADD_POST}
                />
              </div>
            </form>
          </>
        )}
      </Modal>
    </>
  );
};

export default Tool;
