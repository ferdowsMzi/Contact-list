import ContactCard from './contactCard';
import { useState } from 'react';
import ContactProfile from './contactProfile';
import { useProfile } from '@/contexts/profileContext';
import { useContacts } from '@/contexts/contactContext';
import AddContactButton from './addContactButton';
import NoContacts from './noContacts';

const ContactList = () => {
  const { contacts } = useContacts();
  const [selectedContact, setSelectedContact] = useState<number | null>(null);
  const { isAnyProfileOpen, setIsAnyProfileOpen } = useProfile();
  const [isAddingContact, setIsAddingContact] = useState(false);

  const handleSelectContact = (id: number) => {
    setSelectedContact(id);
    setIsAnyProfileOpen(true);
  };

  const handleCloseProfile = () => {
    setSelectedContact(null);
    setIsAnyProfileOpen(false);
    setIsAddingContact(false);
  };

  const handleAddContact = () => {
    setIsAddingContact(true);
    setIsAnyProfileOpen(true);
  };

  const selectedContactData = contacts.find((c) => c.id === selectedContact);

  return (
    <div className='mx-auto w-full flex flex-row justify-start pl-4'>
      <div
        className={`flex flex-col ${
          isAnyProfileOpen ? 'hidden md:w-99/200 md:flex' : 'w-full'
        }`}
      >
        <div className='flex justify-between items-center mb-6 h-[100px]'>
          <h1 className='text-3xl font-bold'>Contacts List</h1>
          <AddContactButton onClick={handleAddContact} />
        </div>
        {contacts.length === 0 ? (
          <NoContacts />
        ) : (
          contacts.map((contact) => {
            return (
              <ContactCard
                key={contact.id}
                contact={contact}
                onSelect={() => handleSelectContact(contact.id)}
              />
            );
          })
        )}
      </div>

      <ContactProfile
        mode='view'
        contact={selectedContactData}
        isOpen={!!selectedContactData}
        onClose={handleCloseProfile}
      />

      <ContactProfile
        mode='add'
        isOpen={isAddingContact}
        onClose={handleCloseProfile}
      />
    </div>
  );
};

export default ContactList;
