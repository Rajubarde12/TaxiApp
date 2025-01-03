import React, {
  createContext,
  useRef,
  useContext,
  useState,
  useEffect,
} from 'react';
import socket from '../services/Socket';
import {useSelector} from 'react-redux';

export const AppContext = createContext();

const AppContextProvider = ({children}) => {
  //   const [user, setUser] = useState('');
  const {user, token} = useSelector(state => state.user);

  const [session, setSession] = useState('');
  const socketRef = useRef(null);

  //   useEffect(() => {
  //     const get_profile_data = async () => {
  //     //   let token = await AsyncStorage.getItem('token');

  //       if (token != '' && token != null) {
  //         try {
  //           const result = await getApiCall(base.getProfile);
  //           if (result.status) {
  //             setUser(result.data.userName);
  //             // socket_connect(result.data)
  //             console.log(result.data.userName, 'auth context');
  //           }
  //         } catch (error) {
  //           console.log(error);
  //         }
  //       }
  //     };
  //     get_profile_data();
  //   }, []);

  // useEffect(()=>{
  const socket_connect = async user => {
    // let token = await AsyncStorage.getItem('token');

    socketRef.current = socket('raju', token);
    const intervalId = setInterval(() => {
      if (!socketRef.current) {
        return;
      }
      if (socketRef.current.connected) {
        console.log('connection is active');
      } else {
        console.log('connection is lost ');
      }
    }, 3000);

    return () => {
      clearInterval(intervalId);
      if (socketRef.current) {
        console.log('connection is disconnect');
      }
    };
  };

  return (
    <AppContext.Provider value={{socketRef, user, socket_connect}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

export const useAppContext = () => {
  return useContext(AppContext);
};
