// src/hooks/useIdleTimer.js
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const useIdleTimer = (timeout =  3*60*60*1000) => { // 3hr = 10800000 ms
  const timer = useRef(null);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('auth-token');
    navigate('/signin');
  };

  const resetTimer = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(logout, timeout);
  };

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'click', 'scroll'];

    events.forEach(event =>
      window.addEventListener(event, resetTimer)
    );

    resetTimer(); // Start timer initially

    return () => {
      events.forEach(event =>
        window.removeEventListener(event, resetTimer)
      );
      clearTimeout(timer.current);
    };
  }, []);
};

export default useIdleTimer;

