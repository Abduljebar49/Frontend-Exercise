import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <div className="max-w-screen mx-auto">
        <div className="">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
