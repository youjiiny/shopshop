import SideBar from 'components/SideBar';
import { Outlet } from 'react-router-dom';

const MyPageLayout = () => {
  return (
    <div className='px-5 pb-16'>
      <section className='flex w-full sm:pt-24'>
        <div className='hidden md:block px-6 pb-12 lg:px-12 lg:pb-24'>
          <aside>
            <SideBar />
          </aside>
        </div>
        <Outlet />
      </section>
    </div>
  );
};

export default MyPageLayout;
