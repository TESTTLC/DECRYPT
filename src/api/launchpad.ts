export const getLSOLaunchpadRegistration = async (walletAddress: string) => {
  const url = process.env.REACT_APP_JOIN_LAUNCHPAD_API;
  try {
    if (url && walletAddress) {
      console.log('here');

      const res = await fetch(
        `${url}/walletAddress?walletAddress=${walletAddress}`,
        {
          method: 'GET',
        },
      );

      const result = await res.json();
      if (result.walletAddress && result.totalPower && result.totalPower >= 1) {
        return true;
      }
      return false;
    }
  } catch (error) {
    return false;
  }
};
