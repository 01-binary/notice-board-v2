import { FC } from 'react';

import { FOOTER_MESSAGE } from 'assets/string';

const Footer: FC = () => {
  return (
    <footer className="flex items-center justify-center text-gray-300 shadow-footer h-[10%]">
      {FOOTER_MESSAGE}
    </footer>
  );
};

export default Footer;
