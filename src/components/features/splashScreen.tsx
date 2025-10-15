import Image from 'next/image';

const SplashScreen = () => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-white z-50'>
      <div className='flex flex-col items-center'>
        <div className='mb-4'>
          <Image
            src='/icon-black.png'
            alt='App Logo'
            width={120}
            height={120}
            priority
          />
        </div>
        <h1 className='text-2xl font-bold text-gray-800'>Contacts List</h1>
      </div>
    </div>
  );
};

export default SplashScreen;
