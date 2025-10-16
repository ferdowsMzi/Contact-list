import Image from 'next/image';

interface ContactDetailItemProps {
  icon: string;
  label: string;
  value: string | number | undefined;
  isEditing: boolean;
  name: string;
  editedValue: string | number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const ContactDetail = ({
  icon,
  label,
  value,
  isEditing,
  name,
  editedValue,
  onChange,
}: ContactDetailItemProps) => {
  return (
    <div className='w-full h-15 border-b border-gray-300 rounded-md flex flex-row items-start justify-center gap-4'>
      <Image src={icon} alt={label} width={35} height={35} />
      <div className='w-full'>
        {isEditing ? (
          <input
            type='text'
            name={name}
            value={editedValue || ''}
            onChange={onChange}
            className='w-full p-2 text-2xl'
            placeholder={`Enter ${label.toLowerCase()}`}
          />
        ) : (
          <p className='text-2xl p-2'>
            {value || `No ${label.toLowerCase()} provided`}
          </p>
        )}
      </div>
    </div>
  );
};

export default ContactDetail;
