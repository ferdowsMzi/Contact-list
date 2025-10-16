import { Contact } from '@/types/contact';
import Image from 'next/image';
import Category from './category';
import { useProfile } from '@/contexts/profileContext';

interface ContactCardProps {
  contact: Contact;
  onOpenProfile: (contact: Contact) => void;
}

const ContactCard = ({ contact, onOpenProfile }: ContactCardProps) => {
  const { isAnyProfileOpen } = useProfile();

  return (
    <div
      className={`flex flex-row items-center justify-between w-full py-[1rem] xl:px-8 border-t-[1px] border-gray-400 cursor-pointer gap-[10px] ${
        isAnyProfileOpen ? 'px-2' : 'px-8'
      }`}
      onClick={() => {
        onOpenProfile(contact);
      }}
      role='button'
      tabIndex={0}
      aria-label={`View ${contact.name}'s profile`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onOpenProfile(contact);
        }
      }}
    >
      <div className='relative'>
        {contact.favorite && (
          <div className='absolute top-0 left-0 z-10'>
            <Image alt='favorite' src='/favorite.png' width={30} height={30} />
          </div>
        )}
        <div
          className={`flex rounded-full bg-black w-[90px] h-[90px] items-center justify-center  ${
            isAnyProfileOpen
              ? 'lg:w-[120px] lg:h-[120px]'
              : 'lg:w-[120px] lg:h-[120px]'
          }`}
        >
          {contact.profilePhoto ? (
            <Image
              alt={contact.name}
              src={contact.profilePhoto}
              width={90}
              height={90}
              className={`w-[80px] h-[80px] ${
                isAnyProfileOpen
                  ? 'lg:w-[100px] lg:h-[100px]'
                  : 'lg:w-[100px] lg:h-[100px]'
              }`}
            />
          ) : (
            <Image
              alt={contact.name}
              src='/user-white.png'
              width={90}
              height={90}
              className={`w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] ${
                isAnyProfileOpen ? '' : ''
              }`}
            />
          )}
        </div>
      </div>

      <div className='flex-grow px-4'>
        <div className='flex flex-col lg:flex-row lg:items-start md:gap-3 items-start'>
          <span
            className={` text-xl font-medium mb-2 xl:mb-0 xl:mr-3 xl:text-3xl ${
              isAnyProfileOpen ? 'md:text-2xl' : 'md:text-3xl'
            }`}
          >
            {contact.name}
          </span>
          <Category category={contact.category} />
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
