import { FC } from 'react';

const Section: FC = ({ children }) => {
  return (
    <section className="overflow-y-auto px-[30px] h-4/5">{children}</section>
  );
};

export default Section;
