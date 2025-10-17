import { Contact } from '@/types/contact';
import { useEffect, useState } from 'react';
import ContactDetail from './contactDetail';
import { useContacts } from '@/contexts/contactContext';
import Modal from '../common/modal';
import ContactProfileHeader from './contactProfileHeader';
import { ContactCategory } from '@/types/contactCategory';

interface ContactProfileProps {
  mode?: 'add' | 'view' | 'edit';
  contact?: Contact;
  isOpen: boolean;
  onClose: () => void;
}

const ContactProfile = ({
  contact,
  mode: initialMode,
  isOpen,
  onClose,
}: ContactProfileProps) => {
  const [mode, setMode] = useState(initialMode);
  const [isEditing, setIsEditing] = useState(
    initialMode === 'edit' || initialMode === 'add'
  );
  const { addContact, updateContact } = useContacts();
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    profilePhoto: '',
    category: 'Others' as ContactCategory,
    favorite: false,
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    //set initial data
    if (contact) {
      setProfileData({
        name: contact?.name || '',
        email: contact?.email || '',
        phone: contact?.phone || '',
        address: contact?.address || '',
        profilePhoto: contact?.profilePhoto || '',
        category: contact?.category || 'Others',
        favorite: contact?.favorite || false,
      });
    } else {
      setProfileData({
        name: '',
        email: '',
        phone: '',
        address: '',
        profilePhoto: '',
        category: 'Others',
        favorite: false,
      });
    }

    setIsEditing(initialMode === 'edit' || initialMode === 'add');
    setMode(initialMode);

    //no errors yet, so clear prev errors
    setErrors({
      name: '',
      email: '',
      phone: '',
    });
  }, [contact, initialMode, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (mode === 'view') return; //no action needed in view mode

    const { name, value } = e.target;

    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateData = (): boolean => {
    if (mode === 'view') return true; //no validation needed in view mode

    let isValid = true;

    const newErrors = {
      name: '',
      email: '',
      phone: '',
    };

    if (!profileData.name.trim()) {
      newErrors.name = 'name is required';
      isValid = false;
    }

    if (profileData.email && profileData.email.trim() !== '') {
      if (!/\S+@\S+\.\S+/.test(profileData.email)) {
        newErrors.email = 'Email is invalid';
        isValid = false;
      }
    }

    if (profileData.phone && profileData.phone.trim() !== '') {
      if (!/^\d{10,15}$/.test(profileData.phone.replace(/\D/g, ''))) {
        newErrors.phone = 'Phone number is invalid';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'view' || !validateData()) return; // do not save anything

    let savedContact: Contact;

    if (mode === 'edit' && contact) {
      //if the user is editing a contact that already exist :
      savedContact = {
        ...contact,
        ...profileData,
      } as Contact;
      updateContact(savedContact);
    } else {
      // if it is a new contact
      addContact({
        ...profileData,
        id: Date.now(),
        category: profileData.category || 'Others',
        favorite: profileData.favorite || false,
      } as Contact);
    }
    //exit edit mode
    setIsEditing(false);
    setMode('view');
  };

  const handleEdit = () => {
    setIsEditing(true);
    setMode('edit');
  };

  const handleCancel = () => {
    if (contact) {
      //reset the data to what we have had before edit
      setProfileData({
        name: contact.name || '',
        email: contact.email || '',
        phone: contact.phone || '',
        address: contact.address || '',
        profilePhoto: contact.profilePhoto || '',
        category: contact.category || 'Others',
        favorite: contact.favorite || false,
      });
      //exit edit mode
      setIsEditing(false);
      setMode('view');
    } else {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen}>
      <div className='flex flex-col h-full'>
        <ContactProfileHeader
          contact={contact || ({ ...profileData, id: 0 } as Contact)}
          isEditing={isEditing}
          onClose={onClose}
          onEdit={handleEdit}
          onSave={handleSave}
          onCancel={handleCancel}
          onChange={handleChange}
          profileData={profileData}
        />
        <div className='w-full flex flex-col items-center justify-center gap-4 mt-16 px-6 py-4'>
          <ContactDetail
            icon='/phone.png'
            label='Phone'
            value={contact?.phone}
            isEditing={isEditing}
            name='phone'
            editedValue={profileData.phone}
            onChange={handleChange}
            error={errors.phone}
          />
          <ContactDetail
            icon='/email.png'
            label='Email'
            value={contact?.email}
            isEditing={isEditing}
            name='email'
            editedValue={profileData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <ContactDetail
            icon='/address.png'
            label='Address'
            value={contact?.address}
            isEditing={isEditing}
            name='address'
            editedValue={profileData.address}
            onChange={handleChange}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ContactProfile;
