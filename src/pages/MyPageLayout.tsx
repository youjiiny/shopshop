import SideBar from 'components/SideBar';
import { Outlet } from 'react-router-dom';

const MyPageLayout = () => {
  return (
    <section className='flex min-w-[1000px] pt-24'>
      <div className='px-12 pb-24'>
        {/* className='relative max-w-[1500px] px-12 pb-24' */}
        <aside>
          <SideBar />
        </aside>
      </div>
      <Outlet />
    </section>
  );
};

export default MyPageLayout;
