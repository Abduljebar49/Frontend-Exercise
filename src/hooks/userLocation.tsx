import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocationInfo } from "../redux/reducers/locationSlice";
import useGeolocation from "./useGeolocation";
import { RootState } from "../redux";

const useLocation = () => {
  const dispatch = useDispatch();
  const { coords } = useGeolocation();
  const city = useSelector((state: RootState) => state.location.city);
  const country = useSelector((state: RootState) => state.location.country);

  const { latitude, longitude } = coords;

  useEffect(() => {
    if (coords) {
      dispatch(fetchLocationInfo({ lat: latitude, lng: longitude }));
    }
  }, [dispatch, latitude, longitude]);

  return { city, country };
};

export default useLocation;
