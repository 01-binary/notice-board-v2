import { FC, Suspense } from 'react';
import { Outlet } from 'react-router';

import Header from 'components/common/Layout/Header';
import Footer from 'components/common/Layout/Footer';
import Loading from 'components/common/Loading';

const LayoutPage: FC = () => {
  return (
    <div className="relative h-full !bg-white max-w-7xl mx-auto">
      <Header />
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  );
};

export default LayoutPage;
