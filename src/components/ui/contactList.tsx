import { Contacts } from '@/types/contacts';
import ContactCard from './contactCard';

const ContactList = (props: { contacts: Contacts }) => {
  const { contacts } = props;

  return (
    <div>
      {contacts.length === 0 ? (
        <p className='text-center text-gray-500'>No contacts found</p>
      ) : (
        contacts.map((contact) => {
          return <ContactCard contact={contact} key={contact.id} />;
        })
      )}
    </div>
  );
};

export default ContactList;
