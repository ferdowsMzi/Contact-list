import Image from 'next/image';

const NoContacts = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-10 py-10'>
      <Image
        src='/no-records.png'
        alt='no contacts found'
        width={150}
        height={150}
      />
      <p className='text-gray-400 text-2xl'>No contacts found!</p>
    </div>
  );
};

export default NoContacts;
