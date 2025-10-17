import Image from 'next/image';

//to show or edit contact info items e.g. Address, Phone number, etc

interface ContactDetailProps {
  icon: string;
  label: string;
  value?: string;
  isEditing: boolean;
  name: string;
  editedValue?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const ContactDetail = ({
  icon,
  label,
  value,
  isEditing,
  name,
  editedValue,
  onChange,
  error,
}: ContactDetailProps) => {
  return (
    <div className='w-full h-15 border-b border-gray-300 rounded-md flex flex-row items-start justify-center gap-4'>
      <Image src={icon} alt={label} width={35} height={35} />
      <div className='w-full'>
        {isEditing ? (
          <div>
            <input
              type='text'
              name={name}
              value={editedValue || ''}
              onChange={onChange}
              className='w-full p-2 text-2xl'
              placeholder={`Enter ${label.toLowerCase()}`}
            />
            {error && <p className='text-red-500 text-xs'>{error}</p>}
          </div>
        ) : (
          <p className={`text-2xl p-2 ${value ? ' ' : 'text-gray-400'} `}>
            {value || `No ${label.toLowerCase()} provided`}
          </p>
        )}
      </div>
    </div>
  );
};

export default ContactDetail;
