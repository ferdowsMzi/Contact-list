'use client';
import SplashScreen from '@/components/features/splashScreen';
import ContactList from '@/components/contacts/contactList';
import { ProfileProvider } from '@/contexts/profileContext';
import { useEffect, useState } from 'react';
import { ContactProvider } from '@/contexts/contactContext';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <SplashScreen />
  ) : (
    <div className='w-full h-auto'>
      <ProfileProvider>
        <ContactProvider>
          <ContactList />
        </ContactProvider>
      </ProfileProvider>
    </div>
  );
}
