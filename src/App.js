import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Loading from './pages/Loading/Loading.page';
import SplashScreen from './pages/SplashScreen/SplashScreen.component';
import { setUser } from './redux/redducers/user';
import Authenticated from './router/Authenticated/Authenticated.component';
import Unauthenticated from './router/Unauthenticated/Unauthenticated.component';
import { getOwnData } from './services/customer';

function App() {
  const loading = useSelector((state) => state.loading);
  const user = useSelector((state) => state.user);
  const [splash, setSplash] = useState(true);

  const dispatch = useDispatch();

  const getUser = useCallback(async () => {
    const data = await getOwnData();

    dispatch(setUser(data));
    setTimeout(() => setSplash(false), 1000);
  }, [dispatch, setSplash]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setTimeout(() => setSplash(false), 1000);
      return;
    }

    getUser();
  }, [getUser]);

  return (
    <div className="App">
      {splash ? (
        <SplashScreen />
      ) : (
        <>
          {loading ? <Loading /> : null}
          <main>{user ? <Authenticated /> : <Unauthenticated />} </main>
        </>
      )}
    </div>
  );
}

export default App;
