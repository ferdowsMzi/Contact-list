import React, { createContext, useState, ReactNode } from 'react';

// any profile is open or not, for better responsive design
//  if it was open and the user's screen was large, we will divide the width to two parts for 1.contacts list and 2.the open profile

interface ProfileContextType {
  isAnyProfileOpen: boolean;
  setIsAnyProfileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileContext = createContext<ProfileContextType | undefined>(
  undefined
);

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
  const [isAnyProfileOpen, setIsAnyProfileOpen] = useState(false);
  const value = {
    isAnyProfileOpen,
    setIsAnyProfileOpen,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export const useProfile = (): ProfileContextType => {
  const context = React.useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('profile context undefined');
  }
  return context;
};
