import { FC } from 'react';

const Section: FC = ({ children }) => {
  return (
    <section className="h-4/5 overflow-y-auto px-[30px]">{children}</section>
  );
};

export default Section;
