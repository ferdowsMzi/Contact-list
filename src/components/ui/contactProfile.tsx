import categoryGradients from '@/constants/categoryGradients';
import { Contact } from '@/types/contact';
import Image from 'next/image';
import { useState } from 'react';
import ContactDetail from './ContactDetail';
import { useProfile } from '@/contexts/profileContext';

interface ContactProfileProps {
  contact: Contact;
  isOpen: Boolean;
  onClose: () => void;
}

const ContactProfile = ({ contact, isOpen, onClose }: ContactProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContact, setEditedContact] = useState({ ...contact });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setEditedContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // onSave(editedContact);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedContact({ ...contact });
    setIsEditing(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`w-full md:w-1/2 fixed right-0 h-full z-10 overflow-scroll flex flex-col items-start justify-start border-l-2 border-gray-300`}
    >
      <div className='relative w-full'>
        <div
          className={`w-full h-[200px] z-1000 px-4 flex flex-col ${
            categoryGradients[contact.category]
          }`}
        >
          <div className='w-full flex flex-row items-center justify-between mt-2'>
            <button
              onClick={onClose}
              className='flex items-center cursor-pointer'
            >
              <Image
                alt='close'
                src='/arrow.png'
                width={50}
                height={30}
                className='rotate-180'
              />
            </button>
            <span className={`font-medium mb-2 mt-8 text-3xl cursor-pointer`}>
              {contact.category}
            </span>

            {isEditing ? (
              <div className='flex gap-2'>
                <button
                  onClick={handleSave}
                  className='flex items-center cursor-pointer'
                >
                  <Image alt='save' src='/save.png' width={30} height={30} />
                </button>
                <button
                  onClick={handleCancel}
                  className='flex items-center cursor-pointer'
                >
                  <Image alt='edit' src='/cancel.png' width={30} height={30} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className='flex items-center cursor-pointer'
              >
                <Image alt='edit' src='/edit.png' width={30} height={30} />
              </button>
            )}
          </div>
          <span className='font-medium mt-15 text-2xl md:ml-4 lg:ml-6'>
            {contact.name}
          </span>
          <div className='absolute -bottom-10 right-10'>
            {contact.favorite ? (
              <div className='absolute top-0 left-0 z-10'>
                <Image
                  alt='favorite'
                  src='/favorite.png'
                  width={30}
                  height={30}
                />
              </div>
            ) : (
              <div className='absolute top-0 left-0 z-10'>
                <Image
                  alt='favorite'
                  src='/not-favorite.png'
                  width={30}
                  height={30}
                />
              </div>
            )}
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
      <div className='w-full flex flex-col items-center justify-center gap-4 mt-16 px-6 py-4'>
        <ContactDetail
          icon='/phone.png'
          label='Phone'
          value={contact.phone}
          isEditing={isEditing}
          name='phone'
          editedValue={editedContact.phone}
          onChange={handleChange}
        />
        <ContactDetail
          icon='/email.png'
          label='email'
          value={contact.email}
          isEditing={isEditing}
          name='email'
          editedValue={editedContact.email}
          onChange={handleChange}
        />
        <ContactDetail
          icon='/address.png'
          label='address'
          value={contact.address}
          isEditing={isEditing}
          name='address'
          editedValue={editedContact.address}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default ContactProfile;
