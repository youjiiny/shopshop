import { Address } from 'types/auth';
import { RequestPayParams, RequestPayResponse } from 'types/portone';

type CallbackReturn = {
  isSuccess: boolean;
  message: string;
  merchant_uid?: string;
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
      merchant_uid: `ORD-${new Date().getTime()}`,
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
        resolve({
          isSuccess: true,
          message: '결제 성공',
          merchant_uid: data?.merchant_uid,
        });
      } else {
        resolve({ isSuccess: false, message: `${error_msg}.` });
      }
    });
  });
};

export const handleCancelPay = async () => {
  // 인증 토큰 발급
  // const getToken = await fetch('https://api.iamport.kr/users/getToken', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     imp_key: import.meta.env.VITE_PORTONE_API_KEY,
  //     imp_secret: import.meta.env.VITE_PORTONE_API_SECRET,
  //   }),
  // });
  // console.log('getToken', getToken);
  // const token = await getToken.json();
  // console.log('token', token);

  const res = await fetch('https://api.iamport.kr/payments/cancel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      merchant_uid: '{결제건의 주문번호}', // 주문번호
      amount: 2000, // 환불금액
      reason: '테스트 결제 환불', // 환불사유
      refund_holder: '홍길동', // [가상계좌 환불시 필수입력] 환불 수령계좌 예금주
      refund_bank: '88', // [가상계좌 환불시 필수입력] 환불 수령계좌 은행코드(예: KG이니시스의 경우 신한은행은 88번)
      refund_account: '56211105948400', // [가상계좌 환불시 필수입력] 환불 수령계좌 번호
    }),
  });
  console.log('res', res);
};
