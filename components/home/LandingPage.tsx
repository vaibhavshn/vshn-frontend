import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import AuthToggleSlider, { AuthMode } from './AuthToggleSlider';
import Login from './Login';
import Register from './Register';

const LandingPage = () => {
  const [authMode, setAuthMode] = useState<AuthMode>(AuthMode.login);

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:space-x-4 lg:justify-between lg:h-screen lg:items-center lg: w-full max-w-6xl p-6 mx-auto mt-24 lg:mt-0">
        <header className="space-y-4">
          <h1 className="lg:flex-1 text-3xl lg:text-4xl text-gray-700 font-black tracking-tight">
            vshn.in
          </h1>
          <p className="text-4xl lg:text-5xl lg:leading-tight font-black bg-clip-text bg-gradient-to-r text-transparent from-orange-500 to-orange-300 tracking-tight">
            Shorten your URLs
          </p>
        </header>
        <div className="flex flex-col w-full md:mx-auto lg:mx-0 max-w-sm mt-12 lg:mt-0">
          <div className="inline-block md:mx-auto">
            <motion.div layout>
              <AuthToggleSlider
                mode={authMode}
                onChange={(mode: AuthMode) => setAuthMode(mode)}
              />
            </motion.div>
          </div>
          <div className="mt-8">
            {authMode === AuthMode.login && (
              <AnimatePresence>
                <motion.div
                  layout
                  initial={{ y: 40, opacity: 0.4 }}
                  animate={{ y: 0, opacity: 1.0 }}
                  exit={{ y: -60, opacity: 0.4 }}
                >
                  <Login />
                </motion.div>
              </AnimatePresence>
            )}

            {authMode === AuthMode.register && (
              <AnimatePresence>
                <motion.div
                  layout
                  initial={{ y: 40, opacity: 0.4 }}
                  animate={{ y: 0, opacity: 1.0 }}
                  exit={{ y: -60, opacity: 0.4 }}
                >
                  <Register />
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
