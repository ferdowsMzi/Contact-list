import React, { createContext, useState, ReactNode } from 'react';

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

export const ProfileProvider: React.FC<ProfileProviderProps> = ({
  children,
}) => {
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
    throw new Error('error');
  }
  return context;
};
