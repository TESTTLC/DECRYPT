import Default from 'src/assets/images/Default.png';
import LuxandiaPng from 'src/assets/images/Luxandia.png';

import { AssetTokenizationProject } from './types';

export const assetTokenizationProjects = {
  DEFAULT: {
    id: 0,
    title: 'Coming Soon',
    coinTag: 'X',
    description:
      'Empower the most innovative crypto projects across all blockchains with Decryption.',
    about: '',
    imageSource: Default,
    website: '',
  } as AssetTokenizationProject,
  TLX: {
    id: 1,
    title: 'The Luxury Bank',
    coinTag: 'TLX',
    description:
      'The decentralized cryptocurrency that was created to become the token of reference for the luxury industry.',
    about:
      'Our goal is to have The Luxury (TLX) used as widely as possible across the interactive luxury industry, allowing developers and publishers new options for the exploitation of their products, integration of smart contracts, protection of in-metaverse assets and so much more.',
    imageSource: Default,
    website: '',
  } as AssetTokenizationProject,

  CVL: {
    id: 2,
    title: 'Luxandia Crypto-Village',
    coinTag: 'CVL',
    description:
      'A unique project has been started in Europe, in a dream location, in order to build a complete crypto ecosystem. Participate in this exciting and innovative initiative today.',
    about: '',
    imageSource: LuxandiaPng,
    website: 'luxandia.com',
    moreDetails: (
      <>
        The first ten hectares of land have been purchased and we are currently
        negotiating to purchase another fifty hectares in the same area. We
        intend to build 100 houses with various facilities.
        <br />
        <br />
      </>
    ),
  } as AssetTokenizationProject,
};
