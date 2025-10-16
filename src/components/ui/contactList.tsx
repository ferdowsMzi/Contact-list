import { Contacts } from '@/types/contacts';
import { Contact } from '@/types/contact';
import ContactCard from './contactCard';
import { useState } from 'react';
import ContactProfile from './contactProfile';
import Header from './header';
import { useProfile } from '@/contexts/profileContext';

const ContactList = (props: { contacts: Contacts }) => {
  const { contacts } = props;
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const { isAnyProfileOpen, setIsAnyProfileOpen } = useProfile();

  const handleOpenProfile = (contact: Contact) => {
    setSelectedContact(contact);
    setIsAnyProfileOpen(true);
  };

  const handleCloseProfile = () => {
    setSelectedContact(null);
    setIsAnyProfileOpen(false);
  };

  return (
    <div className='mx-auto w-full flex flex-row justify-start pl-4'>
      <div
        className={`flex flex-col ${
          isAnyProfileOpen ? 'md:w-99/200 hidden md:flex' : 'w-full'
        }`}
      >
        <Header />
        {contacts.length === 0 ? (
          <p className='text-center text-gray-500'>No contacts found</p>
        ) : (
          contacts.map((contact) => {
            return (
              <ContactCard
                contact={contact}
                key={contact.id}
                onOpenProfile={handleOpenProfile}
              />
            );
          })
        )}
      </div>

      {selectedContact && (
        <ContactProfile
          contact={selectedContact}
          isOpen={isAnyProfileOpen}
          onClose={handleCloseProfile}
        />
      )}
    </div>
  );
};

export default ContactList;
