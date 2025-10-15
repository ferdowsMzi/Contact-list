'use client';

import SplashScreen from '@/components/features/splashScreen';
import ContactList from '@/components/ui/contactList';
import Header from '@/components/ui/header';
import { Contacts } from '@/types/contacts';
import { useEffect, useState } from 'react';

const samples: Contacts = [
  {
    id: 1,
    name: 'Ferdows Mazraavi',
    profilePhoto: '',
    email: 'Ferdows.MZI@gmail.com',
    phone: 989398513725,
    address: 'Iran, Tehran province',
    category: 'Family',
    favorite: true,
  },
  {
    id: 2,
    name: 'Fereshteh Ebadi',
    profilePhoto: '',
    email: 'Fereshteh.ebadi@gmail.com',
    phone: 989375674777,
    address: 'Iran, Kerman province',
    category: 'Business',
    favorite: false,
  },
  {
    id: 3,
    name: 'Arvin Mohammadi',
    profilePhoto: '',
    email: 'Ar.moh@gmail.com',
    phone: 989375674777,
    address: 'Iran, Ahwaz',
    category: 'Others',
    favorite: true,
  },
  {
    id: 4,
    name: 'Ali Keyhani',
    profilePhoto: '',
    email: 'ali.key@gmail.com',
    phone: 989375674777,
    address: 'Iran, Khorasan province',
    category: 'Friends',
    favorite: false,
  },
];

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
      <Header />
      <ContactList contacts={samples} />
    </div>
  );
}
