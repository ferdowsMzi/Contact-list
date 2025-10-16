import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Contact } from '@/types/contact';
import { Contacts } from '@/types/contacts';

interface ContactContextType {
  contacts: Contacts;
  addContact: (contact: Omit<Contact, 'id'>) => Contact;
  updateContact: (contact: Contact) => void;
  deleteContact: (id: number) => void;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export const ContactProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [contacts, setContacts] = useState<Contacts>(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      try {
        return JSON.parse(savedContacts);
      } catch (error) {
        console.log('Error parsing contact from local storage:', error);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
    console.log('Contacts saved to localStorage:', contacts);
  }, [contacts]);

  const addContact = (contactData: Omit<Contact, 'id'>) => {
    const newContact: Contact = {
      ...contactData,
      id: Date.now(),
    };
    setContacts((prevContacts) => [...prevContacts, newContact]);
    return newContact;
  };

  const updateContact = (updatedContact: Contact) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
  };

  const deleteContact = (id: number) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    );
  };

  const contextValue = {
    contacts,
    addContact,
    deleteContact,
    updateContact,
  };

  return (
    <ContactContext.Provider value={contextValue}>
      {children}
    </ContactContext.Provider>
  );
};

export const useContacts = () => {
  const context = useContext(ContactContext);
  if (context === undefined) {
    throw new Error('useContacts must be used within a ContactProvider');
  }
  return context;
};
