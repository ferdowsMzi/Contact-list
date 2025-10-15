import { ContactCategory } from '@/types/contactCategory';

interface CategoryProps {
  category: ContactCategory;
}

const categoryGradients = {
  Family: 'bg-gradient-to-r from-green-400 to-emerald-500',
  Friends: 'bg-gradient-to-r from-purple-400 to-pink-500',
  Business: 'bg-gradient-to-r from-amber-400 to-orange-500',
  Others: 'bg-gradient-to-r from-blue-400 to-indigo-500',
};

const categoryTextColors = {
  Family: 'text-white',
  Friends: 'text-white',
  Business: 'text-white',
  Others: 'text-white',
};

const Category = ({ category }: CategoryProps) => {
  return (
    <div
      className={`min-w-[50px] w-auto rounded-lg px-4 ${categoryGradients[category]} sm:min-w-[100px] sm:py-1`}
    >
      <span className={`text-xl ${categoryTextColors[category]} sm:text-3xl`}>
        {category}
      </span>
    </div>
  );
};

export default Category;
