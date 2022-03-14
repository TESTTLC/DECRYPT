import { useDispatch, useSelector } from 'react-redux';
import { getLSOLaunchpadRegistrationThunk } from 'src/redux/modules/launchpad/actions';
import { StoreState } from 'src/utils/storeTypes';

export const useCachedResources = () => {
  const dispatch = useDispatch();

  const walletAddress = useSelector<StoreState, string | undefined>(
    (reduxState) => reduxState.account.walletAddress,
  );
  if (walletAddress) {
    dispatch(getLSOLaunchpadRegistrationThunk({ walletAddress }));
  }
};
