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
        Metaverse is more than just a movie concept. Users will have access to
        all the digital experiences they might encounter, replicating many of
        the actions they would find in the real world, such as shopping for
        clothes, buying property, and creating their own spaces.
        <br />
        <br />
        Metaverse, unlike a virtual ecosystem in a game, involves the management
        of financial data and transactions that run the economy and simulate
        what a user would encounter in the real world. Without this, users are
        likely to miss out on the truly immersive experience that the Metaverse
        has to offer.
      </>
    ),
  } as AssetTokenizationProject,
};
