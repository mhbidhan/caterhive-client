import { useDispatch } from 'react-redux';
import { setUser } from '../redux/redducers/user';
import { bookmarkMenuById } from '../services/menu';

const useBookmark = () => {
  const dispatch = useDispatch();

  const bookmarkMenu = async (id) => {
    const user = await bookmarkMenuById(id);
    dispatch(setUser(user));
  };

  return {
    bookmarkMenu,
  };
};

export default useBookmark;
