// useLocation.ts
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux';
import {fetchLocationInfo} from '../redux/reducers/locationSlice';

const useLocation = () => {
  const dispatch = useDispatch();
  const { city, country, lat, lng } = useSelector(
    (state: RootState) => state.location
  );

  useEffect(() => {
    dispatch(fetchLocationInfo());
  }, [dispatch]);

  return { city, country, lat, lng };
};

export default useLocation;
