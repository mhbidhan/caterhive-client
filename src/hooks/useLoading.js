import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../redux/redducers/loading';

const useLoading = () => {
  const loading = useSelector((state) => state.loading);

  const dispatch = useDispatch();

  const startLoading = () => {
    dispatch(setLoading(true));
  };

  const stopLoading = () => {
    dispatch(setLoading(false));
  };

  return {
    loading,
    startLoading,
    stopLoading,
  };
};

export default useLoading;
