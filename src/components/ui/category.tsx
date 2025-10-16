import { ContactCategory } from '@/types/contactCategory';
import categoryGradients from '@/constants/categoryGradients';
import categoryTextColors from '@/constants/categoryTextColors';
interface CategoryProps {
  category: ContactCategory;
}

const Category = ({ category }: CategoryProps) => {
  return (
    <div
      className={`min-w-[50px] w-auto rounded-lg px-4 ${categoryGradients[category]} lg:min-w-[100px] sm:py-1`}
    >
      <span
        className={`text-xl ${categoryTextColors[category]} md:text-xl lg:text-2xl xl:text-3xl`}
      >
        {category}
      </span>
    </div>
  );
};

export default Category;
