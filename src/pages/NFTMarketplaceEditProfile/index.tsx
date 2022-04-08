import { createRef, useEffect, useState } from 'react';
import user3 from 'src/assets/images/user3.png';
import categoriesImage from 'src/assets/images/Categories.png';
import { useDispatch, useSelector } from 'react-redux';
import { AccountState, BaseUser, StoreState } from 'src/utils/storeTypes';
import { updateUser } from 'src/redux/modules/account/actions';
import { BiImageAdd } from 'react-icons/bi';
import FormField from 'src/components/FormField';
import { Formik, FormikValues } from 'formik';
import * as Yup from 'yup';
import { getImageBucketUrl } from 'src/utils/functions/Image';

import MarketplaceHeader from '../NFTMarketplace/components/MarketplaceHeader';
import MarketplaceRightSidebar from '../NFTMarketplace/components/MarketplaceRightSidebar';

const inputClass =
  'bg-transparent border-[1px] rounded-full border-blue-500 px-4 py-2 w-4/5 text-sm';
const titleClass = 'text-lg font-medium';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .max(30, 'Username must be less than 20 characters')
    .min(3, 'Username must be at least 3 characters')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  bio: Yup.string().max(250, 'Bio must be less than 250 characters').nullable(),
  facebook: Yup.string().url('Invalid Facebook URL').nullable(),
  twitter: Yup.string().url('Invalid Twitter URL').nullable(),
  instagram: Yup.string().url('Invalid Instagram URL').nullable(),

  // password: Yup.string()
  //   .required('Required')
  //   .min(6, 'Password must be at least 6 characters'),
  // ...(showRegisterForm && {
  //   passwordConfirmation: Yup.string()
  //     .required('Required')
  //     .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  // }),
});

const NFTMarketplaceEditProfile: React.FC = () => {
  const account = useSelector<StoreState, AccountState>(
    (state) => state.account,
  );
  const dispatch = useDispatch();
  const [localPassword, setLocalPassword] = useState('');
  const [localBio, setLocalBio] = useState<string | undefined>('');
  const [localUsername, setLocalUsername] = useState<string | undefined>('');
  const [localEmail, setLocalEmail] = useState<string>(account.email);
  const [profileImagePreview, setProfileImagePreview] = useState('');
  const [profileImage, setProfileImage] = useState<File>();
  const [coverImagePreview, setCoverImagePreview] = useState('');
  const [coverImage, setCoverImage] = useState<File>();
  const coverImageRef = createRef<HTMLInputElement>();
  const profileImageRef = createRef<HTMLInputElement>();

  useEffect(() => {
    // setLocalPassword(account.password);
    setLocalBio(account.bio);
    setLocalUsername(account.username);
    setLocalEmail(account.email);
  }, [account.bio, account.email, account.username]);

  const onSubmit = (values: FormikValues) => {
    console.log('Values are: ', values);
    const { email, username, bio, twitter, facebook, instagram } = values;

    const formData = new FormData();
    formData.append('email', email);
    formData.append('username', username);
    formData.append('bio', bio);
    formData.append('facebook', facebook);
    formData.append('twitter', twitter);
    formData.append('instagram', instagram);
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }
    if (coverImage) {
      formData.append('coverImage', coverImage);
    }

    dispatch(
      updateUser(formData),
      // updateUser({
      //   username,
      //   email,
      //   bio,
      //   twitter,
      //   facebook,
      //   instagram,
      // }),
    );
  };

  const onImagesSubmit = () => {
    const formData = new FormData();
    // if (profileImage) {
    //   formData.append('profileImage', profileImage);
    // }
    // if (coverImage) {
    //   formData.append('coverImage', coverImage);
    // }
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(e.target.files[0]);
      setCoverImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
      setProfileImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };
  console.log(
    'process.env.REACT_APP_BUCKET_URL: ',
    process.env.REACT_APP_BUCKET_URL,
  );

  const getProfileImage = () => {
    if (profileImagePreview) {
      return profileImagePreview;
    } else if (account.profileImageUri) {
      return `${process.env.REACT_APP_BUCKET_URL}/${account.profileImageUri}`;
    } else {
      return 'undefined';
    }
  };

  const renderProfileImage = () => {
    if (profileImagePreview) {
      return (
        <img
          src={profileImagePreview}
          className={`bg-transparent w-full h-full object-cover ${
            profileImagePreview ? '' : 'hidden'
          }`}
        />
      );
    } else if (account.profileImageUri) {
      const bucketUrl = getImageBucketUrl(account.profileImageUri);

      return (
        <img
          src={bucketUrl}
          className={`bg-transparent w-full h-full object-cover ${
            account.profileImageUri ? '' : 'hidden'
          }`}
        />
      );
    } else {
      return (
        <div className="flex w-full h-full items-center justify-center">
          <BiImageAdd size={40} />
        </div>
      );
    }
  };
  const renderCoverImage = () => {
    if (coverImagePreview) {
      return (
        <img
          src={coverImagePreview}
          className={`bg-transparent w-full h-full object-cover ${
            coverImagePreview ? '' : 'hidden'
          }`}
        />
      );
    } else if (account.coverImageUri) {
      const bucketUrl = getImageBucketUrl(account.coverImageUri);

      return (
        <img
          src={bucketUrl}
          className={`bg-transparent w-full h-full object-cover ${
            account.coverImageUri ? '' : 'hidden'
          }`}
        />
      );
    } else {
      console.log('3');
      return (
        <div className="flex w-full h-full items-center justify-center">
          <BiImageAdd size={70} />
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col w-full">
      <MarketplaceHeader />
      <Formik
        initialValues={{
          email: account.email,
          bio: account.bio,
          username: account.username,
          facebook: account.facebook,
          twitter: account.twitter,
          instagram: account.instagram,
        }}
        enableReinitialize
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <div className="grid grid-cols-10 gap-x-2 gap-y-4 rounded-xl">
            <div className="grid grid-cols-2 col-span-8 lg:col-span-10 md:col-span-10 sm:col-span-10 xs:col-span-10 bg-black bg-opacity-70 p-6 rounded-xl">
              <div className="col-span-1 sm:col-span-2 xs:col-span-2">
                <p className={titleClass}>Profile Settings</p>

                <p className="mt-6 mb-2">Username*</p>
                <FormField
                  name="username"
                  className={inputClass}
                  placeholder="johndoe"
                  // value={localUsername}
                  // onChange={(e) => setLocalUsername(e.target.value)}
                />

                <p className="mt-6 mb-2">Email*</p>
                <FormField
                  name="email"
                  className={inputClass}
                  placeholder="johndoe@example.com"
                  // value={localEmail}
                  // onChange={(e) => setLocalEmail(e.target.value)}
                />

                <p className="mt-6 mb-2">Bio</p>
                <FormField
                  name="bio"
                  className={`${inputClass} rounded-xl min`}
                  placeholder="Description"
                  isTextArea
                  rows={10}

                  // value={localBio}
                  // onChange={(e) => setLocalBio(e.target.value)}
                />

                <p className="mt-6">Links</p>
                <p className="mb-2 text-xs text-gray-400">
                  Example: https://example.com
                </p>
                <div className="flex flex-col space-y-4">
                  <FormField
                    name="facebook"
                    className={inputClass}
                    placeholder="Facebook"
                  />
                  <FormField
                    name="twitter"
                    className={inputClass}
                    placeholder="Twitter"
                  />
                  <FormField
                    name="instagram"
                    className={inputClass}
                    placeholder="Instagram"
                  />
                </div>

                <button
                  className="bg-blue-400 w-32 mt-7 rounded-full py-1 text-black text-sm mb-4"
                  onClick={() => handleSubmit()}
                  type="submit"
                >
                  {account.isLoading ? 'Updating...' : 'Submit'}
                </button>
              </div>

              <div className="flex flex-col col-span-1 sm:col-span-2 xs:col-span-2 space-y-10">
                <div>
                  <p className={titleClass}>Profile Image</p>
                  <div className="relative">
                    <button
                      className="flex items-center justify-center bg-transparent border-[1px] border-blue-500 mt-6 w-24 h-24 rounded-full object-cover overflow-hidden"
                      onClick={() => profileImageRef.current?.click()}
                    >
                      {renderProfileImage()}
                      <input
                        type="file"
                        id="file"
                        ref={profileImageRef}
                        className="hidden w-full h-full"
                        accept=".png, .jpg, .jpeg"
                        onChange={handleProfileImageChange}
                        // draggable={true}
                      />
                    </button>
                    {/* <img className="absolute right-2 bottom-2 bg-gray-700 rounded-full w-4 h-4" /> */}
                  </div>
                </div>

                <div>
                  <p className={titleClass}>Cover Image</p>
                  <div className="relative">
                    <button
                      className="flex items-center justify-center bg-transparent border-[1px] border-blue-500 mt-6 w-full h-44 rounded-xl object-cover overflow-hidden"
                      onClick={() => coverImageRef.current?.click()}
                    >
                      {renderCoverImage()}
                      <input
                        type="file"
                        id="file"
                        ref={coverImageRef}
                        className="hidden w-full h-full"
                        accept=".png, .jpg, .jpeg"
                        onChange={handleCoverImageChange}
                        // draggable={true}
                      />
                    </button>
                  </div>
                </div>
                <button
                  className="bg-blue-400 w-32 rounded-full py-1 text-black text-sm mb-4"
                  onClick={onImagesSubmit}
                  type="submit"
                >
                  Submit Images
                </button>
              </div>
            </div>
            {/* <MarketplaceRightSidebar showCreditCard/> */}
            <MarketplaceRightSidebar />
          </div>
        )}
      </Formik>
    </div>
  );
};

export default NFTMarketplaceEditProfile;
