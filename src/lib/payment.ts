import { Address } from 'types/auth';
import { RequestPayParams, RequestPayResponse } from 'types/portone';

type CallbackReturn = {
  isSuccess: boolean;
  message: string;
};

export const handlePayment = ({
  name,
  address,
  phone,
}: {
  name: string;
  address: Address;
  phone: string;
}) => {
  return new Promise<CallbackReturn>((resolve, reject) => {
    if (!window.IMP) return;
    const { IMP } = window;
    IMP.init(import.meta.env.VITE_PORTONE_CODE);
    const { zoneCode, roadAddress, detailAddress } = address;

    // 결제 데이터 정의하기
    const data: RequestPayParams = {
      pay_method: 'card',
      pg: 'html5_inicis',
      merchant_uid: `mid_${new Date().getTime()}`,
      amount: 100,
      name: 'Shopshop 쇼핑몰',
      buyer_name: name,
      buyer_tel: phone,
      buyer_addr: `${roadAddress} ${detailAddress}`,
      buyer_postcode: zoneCode,
    };
    console.log('data', data);
    IMP.request_pay(data, (response: RequestPayResponse) => {
      const { success, error_msg, error_code } = response;

      if (success) {
        resolve({ isSuccess: true, message: '결제 성공' });
      } else {
        resolve({ isSuccess: false, message: `${error_msg}.` });
      }
    });
  });
};
