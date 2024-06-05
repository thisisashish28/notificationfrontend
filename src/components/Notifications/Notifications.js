import React, { useEffect, useRef, useState } from "react";
import {toast} from 'react-toastify';
import io from 'socket.io-client';
import { useAuth } from "../../hooks/useAuth";


export default function Notifications() {
    const {user} = useAuth(); 
   const {updateNotification} = useAuth();
   const intervalRefs = useRef({});
   const toastTriggered = useRef({})
   const toastRefs = useRef({});
   const [actionTaken, setActionTaken] = useState(false);
   useEffect(() => {
    if (!user) {
      return;
    }

    const aiid = JSON.parse(localStorage.getItem('user'));
    if (aiid && aiid.email) {
      const userId = aiid.email;
      const socket = io('http://192.168.128.197:5000');
      socket.on('connect', () => {
        socket.emit('joinRoom', userId);
      });

      const handleNotification = (message) => {
        console.log(message.message);
        const data = message.message;

        data.forEach(notification => {
          if (notification.prioritized === 1) {
            const message = notification.notificationHeader;
            const id = notification.id;
            triggerRepeatedToast(message, id);
          }
          else {
            const message = notification.notificationHeader;
            const id = notification.id;
            triggerRepeatedToast2(message, id);
          }
          
        });
        
      };

      const handleNotification2 = (message) => {
        console.log(message.message);
        const data = message.message;

        data.forEach(notification => {
          if (notification.status === 0) {
            const message = notification.notificationHeader;
            const id = notification.id;
            triggerRepeatedToast2(message, id);
          }
        });
      };

      socket.on('notification', handleNotification2);
      socket.on('new-notification', handleNotification);

      return () => {
        socket.disconnect();
        Object.values(intervalRefs.current).forEach(clearInterval);
      };
    }
  }, [user]);


  const triggerRepeatedToast = (data, id) => {
    // Function to show the toast
    const showToast = () => {
      const handleCloseNotification = (id) => {
        alert("hello");
        updateNotification(id);
        setActionTaken(true);
      };
  
      const handleOpenNotification = (id) => {
        alert("hello");
      };
  
      const buttons = (
        <div className="flex space-x-2 mt-2">
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={() => handleOpenNotification(id)}
          >
             ✅
          </button>
          <button
             className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={() => handleCloseNotification(id)}
          >
             ❌
          </button>
        </div>
      );
  
      toast.info(
        <div className="p-4">
          <p className="text-gray-800 mb-2">Notification: {data}</p>
          {buttons}
        </div>,
        {
          position: "top-right",
          autoClose: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          onClose: () => {
            console.log("Notification closed");
            clearInterval(intervalRefs.current[id]); // Clear the interval when the notification is closed
            updateNotification(id);
            setActionTaken(true);
          },
        }
      );
    };
  
    // Show the initial toast
    showToast();
  
    // Set interval to repeat showing the notification
    intervalRefs.current[id] = setInterval(() => {
      if (!toastRefs.current[id]) {
        showToast();
      }
    }, 5000);
  };
  

  const triggerRepeatedToast2 = (data, id) => {
    // Trigger the toast only if it hasn't been triggered before
    if (!toastTriggered.current[id]) {
      toastTriggered.current[id] = true;

      const handleCloseNotification = (id) => {
        alert("hello");
        updateNotification(id);
        setActionTaken(true);
      };
  
      const handleOpenNotification = (id) => {
        alert("hello");
      };
  
      const buttons = (
        <div className="flex space-x-4 mt-2">
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={() => handleOpenNotification(id)}
          >
            ✅
          </button>
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={() => handleCloseNotification(id)}
          >
            ❌
          </button>
        </div>
      );
      toast.info(
        <div className="p-4">
          <p className="text-gray-800 mb-2">Notification: {data}</p>
          {buttons}
        </div>,
        {
          position: "top-right",
          autoClose: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          onClose: () => {
            clearInterval(intervalRefs.current[id]);
          },
        }
      );
      intervalRefs.current[id] = setInterval(() => {
        clearInterval(intervalRefs.current[id]);
      }, 5000);
    }
  };

 
    return (
       <div>

       </div>
    )
}