import { Web3Provider } from '@ethersproject/providers';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import categoriesImage from 'src/assets/images/Categories.png';
import user3 from 'src/assets/images/user3.png';
import { routes } from 'src/utils/routes';
import { AccountState, StoreState } from 'src/utils/storeTypes';
import { ProfileCategories } from 'src/utils/types';
import SelectDropdown from 'src/components/SelectDropdown';
import { BiImageAdd } from 'react-icons/bi';
import { logout, setIsLoggedIn } from 'src/redux/modules/account/actions';
import Cookies from 'universal-cookie';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getImageBucketUrl } from 'src/utils/functions/Image';

// import { ThirdwebSDK } from '../../../../thirdweb-dev/sdk';

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const account = useSelector<StoreState, AccountState>(
    (state) => state.account,
  );
  const { email, username, id, bio } = account;
  const provider = useSelector<StoreState, Web3Provider | undefined>(
    (state) => state.globals.provider,
  );
  const [coverImage, setCoverImage] = useState('');
  const [profileImage, setProfileImage] = useState('');

  const generateImages = useCallback(() => {
    if (account.coverImageUri) {
      const image = getImageBucketUrl(account.coverImageUri);
      setCoverImage(image);
    } else {
      setCoverImage(categoriesImage);
    }
    if (account.profileImageUri) {
      const image = getImageBucketUrl(account.profileImageUri);
      setProfileImage(image);
    } else {
      setProfileImage(user3);
    }
  }, [account.coverImageUri, account.profileImageUri]);

  useEffect(() => {
    generateImages();
  }, [generateImages]);

  // const getInfo = async () => {
  //   if (provider) {
  //     const sdk = new ThirdwebSDK(provider.getSigner());
  //     const marketplace = sdk.getMarketplace('qwe');
  //     const listings = await marketplace.getActiveListings();
  //   }
  // };

  const onLogout = () => {
    const cookies = new Cookies();
    localStorage.clear();
    // dispatch(setIsLoggedIn(false));
    // dispatch(setIsLoggedIn(false));
    dispatch(logout());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  };

  return (
    <div className="w-full flex flex-col items-center justify-center overflow-hidden rounded-t-2xl bg-gradient-to-b from-black via-black to-transparent bg-opacity-70 px-4 py-6 space-y-4">
      <img src={coverImage} className="w-full h-52 object-cover rounded-2xl" />
      <div className="relative flex flex-col items-center justify-center">
        <img
          src={profileImage}
          className="absolute -top-20 w-32 h-32 object-cover rounded-full self-center border-2 border-gray-700"
        />

        <div className="flex flex-col justify-center items-center mt-14">
          <p className="text-lg">{username || email}</p>
          {bio && (
            <p className="text-sm text-gray-400 font-medium xs:w-full w-2/3 text-center">
              {bio}
            </p>
          )}

          <div className="flex space-x-4">
            <button
              className="bg-black bg-opacity-70 px-4 py-1 rounded-lg mt-2"
              onClick={() => navigate(routes.nftMarketplaceEditProfile.url)}
            >
              Edit profile
            </button>

            <button
              className="bg-black bg-opacity-70 px-4 py-1 rounded-lg mt-2"
              onClick={onLogout}
            >
              Log out
            </button>
          </div>

          <div className="flex justify-between space-x-12 mt-8">
            {categories.map((category, index) => (
              <button
                key={`${category}-${index}`}
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
