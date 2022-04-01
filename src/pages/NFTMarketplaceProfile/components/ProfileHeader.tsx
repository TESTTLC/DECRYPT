import { useNavigate } from 'react-router-dom';
import categoriesImage from 'src/assets/images/Categories.png';
import user3 from 'src/assets/images/user3.png';
import { routes } from 'src/utils/routes';
import { ProfileCategories } from 'src/utils/types';

interface Props {
  setSelectedCategory: (category: string) => void;
  selectedCategory: string;
  categories: string[];
}

const ProfileHeader: React.FC<Props> = ({
  setSelectedCategory,
  selectedCategory,
  categories,
}) => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col items-center justify-center overflow-hidden rounded-t-2xl bg-gradient-to-b from-black via-black to-transparent bg-opacity-70 px-4 py-6 space-y-4">
      <img
        src={categoriesImage}
        className="w-full h-48 object-cover rounded-2xl"
      />
      <div className="relative flex flex-col items-center justify-center">
        <img
          src={user3}
          className="absolute -top-20 w-32 h-32 object-cover rounded-full self-center"
        />

        <div className="flex flex-col justify-center items-center mt-14">
          <p className="text-lg">anmutigstudio</p>
          <p className="text-sm text-gray-400 font-medium xs:w-full w-2/3 text-center">
            Anmutig Studio was launched as a collection of unique NFTs generated
            by algorithm on the ETH blockchain in oct 2021.
          </p>
          <button
            className="bg-black bg-opacity-70 px-4 py-1 rounded-lg mt-2"
            onClick={() => navigate(routes.nftMarketplaceEditProfile.url)}
          >
            Edit profile
          </button>
          <div className="flex justify-between space-x-12 mt-8">
            {categories.map((category) => (
              <button
                className={`text-md ${
                  selectedCategory === category ? 'text-blue-500' : 'text-white'
                } font-medium`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
