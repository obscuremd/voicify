import { useEffect, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import './App.css';
import Gradient from './Components/ui/Gradient';
import Navigation from './Screens/Navigation';
import Auth from './Screens/Auth';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { UserEmail } from './states/Record';
import { useRecoilState } from 'recoil';

function App() {
  const auth =  getAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useRecoilState(UserEmail);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  useEffect(() =>{
    if(!auth.currentUser?.email){
      return
    }else{
      setUserEmail(auth.currentUser?.email);
      console.log(userEmail)
    }
  },[])

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <MotionConfig transition={{ ease: 'easeInOut' }}>
      <Gradient />
      {user ? <Navigation /> : <Auth />}
    </MotionConfig>
  );
}

export default App;
