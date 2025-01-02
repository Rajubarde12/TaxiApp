import { useEffect } from 'react';
import { LogBox } from 'react-native';
import io from 'socket.io-client';
import { Alert } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']); // Ignore timer warning for socket.io (optional)

// Socket Initialization
const socket = io('http://your-server-url'); // Replace with your server URL

export const useSocket = (onStatusUpdate) => {
  useEffect(() => {
    // Listen for the 'receiveStatusUpdate' event
    socket.on('receiveStatusUpdate', async (data) => {
      console.log('acceptRide event received:', data);
      try {
        await onStatusUpdate(data); // Handle the status update
      } catch (error) {
        console.error('Error processing status update:', error);
      }
    });

    // Cleanup the listener on unmount
    return () => {
      socket.off('receiveStatusUpdate');
    };
  }, [onStatusUpdate]);
};

// Example usage in a React Native component
const MyComponent = () => {
  const handleStatusUpdate = async (data) => {
    // Example: Update state or perform some action with the received data
    Alert.alert('Status Update', Received data: ${JSON.stringify(data)});
  };

  // Initialize the socket listener
  useSocket(handleStatusUpdate);

  return null; // Add your component's UI here
};

export default MyComponent;