import { useProfile } from '@/contexts/profileContext';
import Image from 'next/image';

interface AddContactButtonProps {
  onClick: () => void;
}
const AddContactButton = ({ onClick }: AddContactButtonProps) => {
  const { isAnyProfileOpen } = useProfile();
  if (isAnyProfileOpen) return null;

  return (
    <button
      onClick={onClick}
      className='text-white px-2 md:px-4 py-2 rounded-lg flex items-center hover:scale-120'
    >
      <Image src='/add-contact.png' alt='add contact' width={60} height={60} />
      Add Contact
    </button>
  );
};

export default AddContactButton;
