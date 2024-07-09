import { Address } from 'types/auth';
import { RequestPayParams, RequestPayResponse } from 'types/portone';

export const handlePayment = ({
  name,
  address,
  phone,
}: {
  name: string;
  address: Address;
  phone: string;
}) => {
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
  IMP.request_pay(data, callback);
};

const callback = (response: RequestPayResponse) => {
  const { success, error_msg } = response;
  if (success) {
    alert('결제 성공');
  } else {
    alert(`결제 실패 ${error_msg}`);
  }
};
