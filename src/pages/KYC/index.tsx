/* eslint-disable camelcase */
//@ts-ignore
import WebSDK from '@verifai/websdk-react';
import React, { useEffect, useState } from 'react';
import { RiContactsBookLine } from 'react-icons/ri';

const apiKey = '3d640837f60927fea171573fefff84d8fa4da0bc';
const url = 'https://websdk.verifai.com/v1/auth/token';

const KYC: React.FC = () => {
  const [show, setShow] = useState(true);
  const [otpToken, setOtpToken] = useState<string>();
  const data = {
    document_type_whitelist: ['P', 'I'],
    handover_base_url: 'https://decryption.com/kyc/?s=',
    locale: 'en_US',
  };

  const getFetchResult = async () => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer 3d640837f60927fea171573fefff84d8fa4da0bc`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data }),
    });

    console.log('result: ', await res.json());
  };

  useEffect(() => {
    getFetchResult();
  }, []);

  const verify = new WebSDK();
  console.log('a: ', verify);

  console.log('WebSDK: ', WebSDK);
  return (
    <div className="flex h-screen w-full">
      <WebSDK
        // For the token look at: https://docs.verifai.com/web-sdk
        token="12414"
        onStart={() => {
          console.log('!23');
        }}
        // you can manipulate the show prop to show and hide the modal.
        show={true}
        onSuccess={(sessionID: string) => {
          console.log('111');
          // set show prop to false, to close the modal
          // setShow(false);
          // Here you can get the Verifai Result
          // And clear the temporal storage
        }}
        onCanceled={(sessionID: string) => {
          console.log('222');
          // set show prop to false, to close the modal
          // setShow(false);
          // Here your customer canceled the Verifai flow
          // And delete the Verifai session
        }}
      />
    </div>
  );
};

export default KYC;
