import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './navigations/StackNavigation';
import LoginStackNavigation from './navigations/LoginStackNavigation';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import MainLoadingScreen from './components/loadingScreen/MainLoadingScreen';


export default function App() {
  const auth = getAuth();
  const [check, setCheck] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCheck(true)
      } else {
        setCheck(false)
      }
    });
  }, [])

  if (isLoading) {
    return (
      <MainLoadingScreen />
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style='auto' />
      {
        check ? <LoginStackNavigation /> : <StackNavigation />
      }
    </NavigationContainer>
  );
}
