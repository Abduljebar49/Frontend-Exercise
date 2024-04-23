import { useEffect } from "react";

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
}
const ShowAlert = ({ show, setShow, message }: Props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  console.log("showAlert : ", show);
  useEffect(() => {
    setShow(show);
  }, [show]);

  return (
    <div>
      {show && (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-medium">Error!</span> {message}
        </div>
      )}
    </div>
  );
};

export default ShowAlert;
