import Image from 'next/image';
import categoryGradients from '@/constants/categoryGradients';
import { Contact } from '@/types/contact';
import { useContacts } from '@/contexts/contactContext';
import { ContactCategory } from '@/types/contactCategory';

interface ContactProfileHeaderProps {
  contact: Contact;
  isEditing: boolean;
  onClose: () => void;
  onEdit: () => void;
  onSave: (e: React.FormEvent) => void;
  onCancel: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  profileData: {
    name: string;
    email: string;
    phone: string;
    address: string;
    profilePhoto: string;
    category: ContactCategory;
    favorite: boolean;
  };
}

const ContactProfileHeader = ({
  contact,
  isEditing,
  onClose,
  onEdit,
  onSave,
  onCancel,
  onChange,
  profileData,
  error,
}: ContactProfileHeaderProps) => {
  const { toggleFavorite, deleteContact } = useContacts();
  const handleToggleFavorite = (id: number) => {
    toggleFavorite(id);
  };

  return (
    <div className='relative w-full'>
      <div
        className={`w-full h-[200px] z-1000 px-4 flex flex-col ${
          categoryGradients[profileData?.category || 'Others']
        }`}
      >
        <div className='w-full flex flex-row items-center justify-between mt-2'>
          <button
            onClick={onClose}
            className='flex items-center cursor-pointer hover:scale-110'
          >
            <Image
              alt='close'
              src='/arrow.png'
              width={50}
              height={30}
              className='rotate-180 '
            />
          </button>
          {isEditing ? (
            <select
              name='category'
              value={profileData?.category}
              onChange={onChange}
              className='rounded-xl py-2 outline-none font-medium mb-2 mt-8 text-3xl cursor-pointer hover:scale-110'
            >
              <option value='Friends' className='text-lg'>
                Friends
              </option>
              <option value='Family' className='text-lg'>
                Family
              </option>
              <option value='Business' className='text-lg'>
                Business
              </option>
              <option value='Others' className='text-lg'>
                Others
              </option>
            </select>
          ) : (
            <span className={`font-medium mb-2 mt-8 text-3xl cursor-pointer`}>
              {contact?.category || 'Others'}
            </span>
          )}

          {isEditing ? (
            <div className='flex gap-2'>
              <button
                onClick={onSave}
                className='flex items-center cursor-pointer hover:scale-110'
              >
                <Image alt='save' src='/save.png' width={30} height={30} />
              </button>
              <button
                onClick={onCancel}
                className='flex items-center cursor-pointer hover:scale-110'
              >
                <Image alt='edit' src='/cancel.png' width={30} height={30} />
              </button>
            </div>
          ) : (
            <div className='flex gap-4'>
              <button
                onClick={() => deleteContact(contact.id)}
                className='flex items-center cursor-pointer hover:scale-110'
              >
                <Image alt='edit' src='/delete.png' width={35} height={35} />
              </button>
              <button
                onClick={onEdit}
                className='flex items-center cursor-pointer hover:scale-110'
              >
                <Image alt='edit' src='/edit.png' width={30} height={30} />
              </button>
            </div>
          )}
        </div>
        {isEditing ? (
          <div>
            <input
              type='text'
              name='name'
              value={profileData?.name}
              onChange={onChange}
              className='w-full p-2 text-2xl mt-10 md:ml-4 lg:ml-6 outline-none'
              placeholder={`Enter name`}
            />
            {error && <p className='text-red-500 text-xs'>{error}</p>}
          </div>
        ) : (
          <span className='font-medium mt-15 text-2xl md:ml-4 lg:ml-6'>
            {contact.name || 'New Contact'}
          </span>
        )}

        <div className='absolute -bottom-10 right-10'>
          <button onClick={() => handleToggleFavorite(contact.id)}>
            {contact?.favorite ? (
              <div className='absolute top-5 left-2 z-10 hover:scale-110'>
                <Image
                  alt='favorite'
                  src='/favorite.png'
                  width={30}
                  height={30}
                />
              </div>
            ) : (
              <div className='absolute top-5 left-2 z-10 hover:scale-110'>
                <Image
                  alt='favorite'
                  src='/not-favorite.png'
                  width={30}
                  height={30}
                />
              </div>
            )}
          </button>

          <div className='flex rounded-full bg-black items-center justify-center w-[120px] h-[120px]'>
            {contact.profilePhoto ? (
              <Image
                alt={contact.name}
                src={contact.profilePhoto}
                width={90}
                height={90}
                className='w-[100px] h-[100px]'
              />
            ) : (
              <Image
                alt={contact.name}
                src='/user-white.png'
                width={90}
                height={90}
                className='w-[100px] h-[100px]'
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactProfileHeader;
