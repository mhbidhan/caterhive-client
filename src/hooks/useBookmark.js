import { useDispatch } from 'react-redux';
import { setUser } from '../redux/redducers/user';
import { bookmarkCatererById } from '../services/caterer';
import { bookmarkMenuById } from '../services/menu';

const useBookmark = () => {
  const dispatch = useDispatch();

  const bookmarkMenu = async (id) => {
    const user = await bookmarkMenuById(id);
    dispatch(setUser(user));
  };

  const bookmarkCaterer = async (id) => {
    const user = await bookmarkCatererById(id);
    dispatch(setUser(user));
  };

  return {
    bookmarkMenu,
    bookmarkCaterer,
  };
};

export default useBookmark;
