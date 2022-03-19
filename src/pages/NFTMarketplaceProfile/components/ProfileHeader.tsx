import { useNavigate } from 'react-router-dom';
import categoriesImage from 'src/assets/images/Categories.png';
import user3 from 'src/assets/images/user3.png';
import { routes } from 'src/utils/routes';

const ProfileHeader: React.FC = () => {
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
            <p className="text-md text-blue-500 font-medium">Collected</p>
            <p className="text-md font-medium">Create</p>
            <p className="text-md font-medium">Activity</p>
            <p className="text-md font-medium">Offers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
