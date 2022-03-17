import categoriesImage from 'src/assets/images/Categories.png';

const CategoriesListHeader: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center overflow-hidden rounded-t-2xl bg-gradient-to-b from-black via-black to-transparent bg-opacity-70 px-4 py-6 space-y-4">
      <img
        src={categoriesImage}
        className="w-full h-48 object-cover rounded-2xl"
      />
      <p className="text-lg">Explore Art</p>
      <p className="text-sm text-gray-300 font-medium">Coming Soon</p>
      <p className="text-md text-blue-500 font-medium">
        Trending collections in Art
      </p>
    </div>
  );
};

export default CategoriesListHeader;
