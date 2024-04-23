import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getProfileDetail,
  updateProfileDetail,
} from "../../redux/reducers/userSlice";
import validation from "../../shared/services/validation";
import ShowError from "../../components/ShowError";
import Autocomplete from "../../components/AutoComplete";

const ProfileDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const detail = useSelector((state: RootState) => state.user.profileDetail);
  const navigate = useNavigate();

  const initData: IUserData = {
    address: "",
    email: "",
    firstName: "",
    isBuyer: false,
    lastName: "",
    profilePic: "",
    userName: "",
    _id: 1,
  };

  const [formData, setFormData] = useState<IUserData>(initData);
  const [formError, setFormError] = useState({ name: "", message: "" });

  const setAddress = (address: string) => {
    setFormData({ ...formData, address });
  };

  useEffect(() => {
    dispatch(getProfileDetail(id));
  }, []);

  useEffect(() => {
    if (detail) {
      setFormData(detail!);
      //   setAddress(detail.address);
    }
  }, [detail]);

  const submitForm = () => {
    console.log(isFormValid());
    if (!isFormValid()) {
      return;
    }
    dispatch(updateProfileDetail(formData));
  };

  const isFormValid = (): boolean => {
    for (const key of Object.keys(formData)) {
      let value: string | boolean | number = formData[key as keyof IUserData];
      if (value.toString().length === 0) {
        setFormError({ name: key, message: `${key} is required` });
        return false;
      }
      if (key == "email") {
        if (validation.IsInvalidEmail(value.toString())) {
          setFormError({ name: key, message: `invalid ${key}` });
          return false;
        }
      }
    }
    return true;
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    let tempValue = value;
    if (name == "isBuyer") {
      setFormData({
        ...formData,
        [name]: tempValue == "false" ? false : true,
      });
      return;
    }
    setFormData({
      ...formData,
      [name]: tempValue,
    });
  };

  return (
    <div className="flex  w-full bg-white min-h-screen py-8">
      <div className="w-full">
        <div className="flex  justify-center my-6 text-4xl">Profile Edit</div>
        <div className="flex justify-center">
          <div className="rounded-lg bg-blue-100 p-10 pt-5 max-w-[600px] w-full">
            <div className="flex flex-col gap-4">
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-20"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange(e)}
                  />
                  <ShowError name="firstName" error={formError} />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-20"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange(e)}
                  />
                  <ShowError name="lastName" error={formError} />
                </div>
                <div>
                  <label
                    htmlFor="userName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-20"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formData.userName}
                    onChange={(e) => handleInputChange(e)}
                  />
                  <ShowError name="userName" error={formError} />
                </div>
              </div>
              <div className="mb-6 w-full">
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-16"
                >
                  address
                </label>
                <div className="flex">
                  <Autocomplete onSelected={setAddress} />
                </div>
              </div>
              <div className="mb-6 w-full">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-28"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="example@company.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange(e)}
                />
                <ShowError name="email" error={formError} />
              </div>
              <div className="flex items-start mb-6">
                <div className="flex items-center h-5">
                  <input
                    id="isBuyer"
                    name="isBuyer"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                    value={formData.isBuyer ? "true" : "false"} // Convert boolean to string
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                <label
                  htmlFor="isBuyer"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Is Buyer?
                </label>
              </div>
              <div className="mb-6 flex w-full text-center justify-center">
                <button
                  type="submit"
                  onClick={submitForm}
                  className="flex justify-center w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
