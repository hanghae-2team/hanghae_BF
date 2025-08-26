import { useState } from 'react';

import Login from '@/components/Login';
import { SplashScreen } from '@/components/SplashScreen';

export const Home = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} duration={4000} isSkipButton={true} />;
  }

  return (
    // This div will be the full-width wrapper inside the centered body.
    <div className="inset-0 fixed">
      <div className="flex h-screen items-center justify-center">
        <Login />
      </div>
    </div>
  );
};
