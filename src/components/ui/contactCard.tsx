// 'use client';
import { Contact } from '@/types/contact';
import Image from 'next/image';
import Category from './category';

interface ContactCardProps {
  contact: Contact;
}

const ContactCard = ({ contact }: ContactCardProps) => {
  return (
    <div className='flex flex-row items-center justify-between w-full py-[1rem] px-[2rem] border-t-[1px] border-gray-400'>
      <div className='relative'>
        {contact.favorite && (
          <div className='absolute top-0 left-0 z-10'>
            <Image alt='favorite' src='/favorite.png' width={30} height={30} />
          </div>
        )}
        <div className='flex rounded-full bg-black w-[100px] h-[100px] items-center justify-center sm:w-[120px] sm:h-[120px]'>
          {contact.profilePhoto ? (
            <Image
              alt={contact.name}
              src={contact.profilePhoto}
              width={90}
              height={90}
              className='w-[90px] h-[90px] sm:w-[100px] sm:h-[100px]'
            />
          ) : (
            <Image
              alt={contact.name}
              src='/user-white.png'
              width={90}
              height={90}
              className='w-[80px] h-[80px] sm:w-[100px] sm:h-[100px]'
            />
          )}
        </div>
      </div>

      <div className='flex-grow px-4'>
        <div className='flex flex-col md:flex-row md:items-center md:gap-3 items-start'>
          <span className='text-xl font-medium mb-2 sm:mb-0 sm:mr-3 sm:text-3xl'>
            {contact.name}
          </span>
          <Category category={contact.category} />
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
