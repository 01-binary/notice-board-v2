import { FC } from 'react';
import Section from 'components/common/Layout/Section';

import Tool from 'components/post/Tool';
import Content from 'components/post/Content';

const PostPage: FC = () => {
  return (
    <Section>
      <div className="flex flex-col mt-8 px-4">
        <Tool />
        <Content />
      </div>
    </Section>
  );
};

export default PostPage;
