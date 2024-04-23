import { useEffect, useState } from "react";
import Autocomplete from "../../components/AutoComplete";
import Typography from "../../components/baseComponents/Typography";
import ShowError from "../../components/ShowError";
import validation from "../../shared/services/validation";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/reducers/userSlice";
import { notify } from "../../shared/services/notify";
import { RootState } from "../../redux";
import { ErrorType } from "../../shared/interfaces/error";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const error = useSelector((state: RootState) => state.user.error);
  const user = useSelector((state: RootState) => state.user.user);
  const [submitClick,setSubmitClicked] = useState(false);
  const navigate = useNavigate();

  const initData: IUserInput = {
    firstName: "",
    lastName: "",
    userName: "",
    profilePicUri: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
    isBuyer: false,
  };
  const [formData, setFormData] = useState<IUserInput>(initData);
  const [formError, setFormError] = useState({ name: "", message: "" });
  
  const setAddress = (address: string) => {
    setFormData({ ...formData, address });
  };

  const goLogin = () => navigate("/login");

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
    if (name == "password" || name == "confirmPassword") {
      isValidPassword(value, name);
    }
    setFormData({
      ...formData,
      [name]: tempValue,
    });
  };


  const isFormValid = (): boolean => {
    for (const key of Object.keys(formData)) {
      let value: string | boolean = formData[key as keyof LoginInput];
      if (key!="profilePicUri" && value.toString().length === 0) {
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

  const submitForm = () => {
    if (!isFormValid()) {
      return;
    }
    setSubmitClicked(true);
    dispatch(registerUser(formData));
  };
  useEffect(() => {
    if(submitClick){
      if (error) {
        notify(false, (error as ErrorType).message);
      }
    }
  }, [error]);

  useEffect(() => {
    if(submitClick){
      if (user && user.token) {
        notify(true, "Successfully registered");
        navigate("/login");
        return;
      }
    }
  }, [user]);

  const isValidPassword = (value: string, name: string): boolean => {
    if (!validation.emptyPassword(value)) {
      setFormError({ message: "This field is required", name: name });
      return false;
    }
    if (!validation.containsNumber(value)) {
      setFormError({ message: "Should contain at least a number", name: name });
      return false;
    }
    if (!validation.containsUppercase(value)) {
      setFormError({
        message: "Should contain at least a uppercase character",
        name: name,
      });
      return false;
    }
    if (!validation.containsSpecial(value)) {
      setFormError({
        message: "Should contain at least a special character",
        name: name,
      });
      return false;
    }
    if (!validation.minLength(value)) {
      setFormError({ message: "Should be at least 8 characters", name: name });
      return false;
    }

    if (name == "confirmPassword" && formData.password !== value) {
      setFormError({
        name: "confirmPassword",
        message: "Password does not match.",
      });
      return false;
    }
    setFormError({ message: "", name: name });
    return true;
  };

  return (
    <div className="flex  w-full bg-white min-h-screen py-8">
      <div className="w-full">
        <div className="flex  justify-center my-6 text-4xl">
          Home Test Task Login page
        </div>
        <div className="flex justify-center">
          <div className="rounded-lg bg-blue-100 p-10 pt-5 max-w-[600px] w-full">
            <div className="flex w-full flex-col justify-center text-center">
              <Typography variant="h1" className=" text-3xl font-extrabold">
                Register Page
              </Typography>
              <Typography
                variant="h4"
                className="text-button-primary hover:text-button-primary-hover cursor-pointer mt-[10px]  mb-[20px]"
                onClick={() => goLogin()}
              >
                Have an account? Sign In.
              </Typography>
            </div>
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
                <div>
                  <label
                    htmlFor="profilePicUri"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-32"
                  >
                    Profile Picture Uri
                  </label>
                  <input
                    type="text"
                    id="profilePicUri"
                    name="profilePicUri"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formData.profilePicUri}
                    onChange={(e) => handleInputChange(e)}
                  />
                  <ShowError name="profilePicUri" error={formError} />
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
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-20"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formData.password}
                  onChange={(e) => handleInputChange(e)}
                />
                <ShowError name="password" error={formError} />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-36"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange(e)}
                />
                <ShowError name="confirmPassword" error={formError} />
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

export default RegisterPage;
