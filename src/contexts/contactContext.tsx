import {
  useContext,
  createContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Contact } from '@/types/contact';
import { Contacts } from '@/types/contacts';
import { useProfile } from './profileContext';
interface ContactContextType {
  contacts: Contacts;
  selectedContact: Contact | null;
  addContact: (contact: Omit<Contact, 'id'>) => Contact;
  updateContact: (contact: Contact) => void;
  deleteContact: (id: number) => void;
  toggleFavorite: (id: number) => void;
  selectContact: (id: number | null) => void;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export const ContactProvider = ({ children }: { children: ReactNode }) => {
  const { setIsAnyProfileOpen } = useProfile();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [contacts, setContacts] = useState<Contacts>(() => {
    //get prev contacts from local storage
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      try {
        return JSON.parse(savedContacts);
      } catch (error) {
        console.log('Error parsing:', error);
        return [];
      }
    }
    return [];
  });

  //save contacts to local storage :
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
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
    if (selectedContact?.id === updatedContact.id) {
      setSelectedContact(updatedContact);
    }
  };

  const deleteContact = (id: number) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    );
    if (selectedContact?.id === id) {
      setSelectedContact(null);
    }
    setIsAnyProfileOpen(false);
  };

  const selectContact = (id: number | null) => {
    if (id === null) {
      setSelectedContact(null);
    } else {
      const contact = contacts.find((c) => c.id === id) || null;
      setSelectedContact(contact);
    }
  };

  const toggleFavorite = (id: number) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === id
          ? { ...contact, favorite: !contact.favorite }
          : contact
      )
    );

    if (selectedContact?.id === id) {
      setSelectedContact((prev) =>
        prev ? { ...prev, favorite: !prev.favorite } : null
      );
    }
  };

  const contextValue = {
    contacts,
    addContact,
    deleteContact,
    updateContact,
    toggleFavorite,
    selectContact,
    selectedContact,
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
