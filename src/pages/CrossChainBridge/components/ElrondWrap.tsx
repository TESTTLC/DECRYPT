const ElrondWrap: React.FC = () => {
  //   const wrap = async () => {
  //     const tx = {
  //       value: new <BigUIntValue></BigUIntValue>(convertEsdtToWei(0.5)),
  //       data: 'wrapEgld',
  //       receiver: TOKEN_SC_ADDRESS,
  //     };
  //     await refreshAccount();

  //     await sendTransactions({
  //       transactions: tx,
  //       transactionsDisplayInfo: {
  //         processingMessage: 'Processing Ping transaction',
  //         errorMessage: 'An error has occured during Ping',
  //         successMessage: 'Ping transaction successful',
  //       },
  //       redirectAfterSign: false,
  //     });
  //   };

  //   const unwrap = async () => {
  //     const args = [
  //       BytesValue.fromUTF8(ELROND_TLC_TOKEN_ID),
  //       new BigUIntValue(convertEsdtToWei(0.5)),
  //       BytesValue.fromUTF8('unwrapEgld'),
  //     ];
  //     const { argumentsString } = new ArgSerializer().valuesToString(args);
  //     const data = `ESDTTransfer@${argumentsString}`;

  //     const tx = {
  //       receiver: ELROND_TLC_SC_ADDRESS,
  //       gasLimit: new GasLimit(10000000),
  //       data: data,
  //     };

  //     await refreshAccount();

  //     await sendTransactions({
  //       transactions: tx,
  //       transactionsDisplayInfo: {
  //         processingMessage: 'Processing Ping transaction',
  //         errorMessage: 'An error has occured during Ping',
  //         successMessage: 'Ping transaction successful',
  //       },
  //       redirectAfterSign: false,
  //     });
  //   };

  return (
    <p>123</p>
    // <div className="mt-10">
    //   <p>Wrap/Unwrap EGLD {`<->`} TLC</p>
    //   <div className="relative flex mt-2 mb-4 bg-black bg-opacity-60 w-full h-20 rounded-lg pt-1 px-6 items-center">
    //     <input
    //       className="w-full h-2/3   text-lg pt-2 bg-transparent font-poppins text-white focus:outline-none"
    //       type="text"
    //       value={amountToWrap}
    //     />
    //   </div>
    //   <div className="flex space-x-6">
    //     <button
    //       // onClick={ approveDone ? send : approveSide}
    //       onClick={wrap}
    //       className="w-full flex h-14 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center"
    //       //   disabled={isLoading}
    //     >
    //       Wrap EGLD to TLC
    //     </button>
    //     <button
    //       // onClick={ approveDone ? send : approveSide}
    //       onClick={unwrap}
    //       className="w-full flex h-14 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center"
    //       //   disabled={isLoading}
    //     >
    //       UnWrap TLV to EGLD
    //     </button>
    //   </div>
    // </div>
  );
};

export default ElrondWrap;
