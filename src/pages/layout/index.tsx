import { FC, Suspense } from 'react';
import { Outlet } from 'react-router';

import Header from 'components/common/Layout/Header';
import Footer from 'components/common/Layout/Footer';
import Loading from 'components/common/Loading';

const LayoutPage: FC = () => {
  return (
    <div className="relative mx-auto max-w-7xl h-full !bg-white">
      <Header />
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  );
};

export default LayoutPage;
