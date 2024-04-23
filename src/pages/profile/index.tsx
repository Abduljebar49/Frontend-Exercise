import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchProfiles } from "../../redux/reducers/userSlice";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const profiles = useSelector((state: RootState) => state.user.profiles);
  const navigate = useNavigate();

  const openDetail = (id: number) => navigate("/profile/" + id);

  useEffect(() => {
    console.log("profiles : ", profiles);
  }, [profiles]);

  useEffect(() => {
    dispatch(fetchProfiles("page=1&limit=10"));
  }, []);

  const logout = () => {
    localStorage.removeItem("user-data");
    navigate("/login");
  };
  
  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-white py-10">
        <h1 className="text-lg text-gray-400 font-medium">Profile list</h1>
        <div className="flex flex-col mt-6">
          <div className="overflow-x-auto">
            <div className="shadow overflow-hidden sm:rounded-lg">
              <div className="flex justify-end w-full py-4">
                <button
                  onClick={()=>logout()}
                  className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                >
                  Logout
                </button>
              </div>
              <table className="min-w-full text-sm text-gray-400">
                <thead className="bg-white shadow-md text-xs uppercase font-medium border border-gray-500">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left tracking-wider"
                    >
                      Picture
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left tracking-wider"
                    >
                      UserName
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left tracking-wider"
                    >
                      First Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left tracking-wider"
                    >
                      Last Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left tracking-wider"
                    >
                      Address (city, country)
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white shadow-lg">
                  {profiles?.map((user, index) => (
                    <tr className="bg-opacity-20" key={index}>
                      <td className="flex px-6 py-4 whitespace-nowrap items-center justify-start">
                        <img
                          className="w-10 rounded-full"
                          src="https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_640.png"
                          alt=""
                        />
                        {user.isBuyer && (
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/6491/6491863.png"
                            className="w-4 rounded-full"
                            alt=""
                          />
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.userName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.firstName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.address}
                      </td>
                      <td className="p-4  border-blue-gray-50">
                        <button
                          className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 h-10 rounded-lg text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20"
                          type="button"
                          onClick={() => openDetail(user._id!)}
                        >
                          <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                              className="h-4 w-4"
                            >
                              <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
                            </svg>
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
