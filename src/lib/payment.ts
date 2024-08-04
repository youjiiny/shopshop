import { Address } from 'types/auth';
import {
  RequestPayParams,
  RequestPayResponse,
  RequestRefundResponse,
} from 'types/portone';

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

export const handleRefund = async (orderId: string) => {
  const url = import.meta.env.VITE_PORTONE_REFUND_URL;
  const res = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ merchant_uid: orderId }),
  });
  const result = (await res.json()) as RequestRefundResponse;
  return new Promise<CallbackReturn>((resolve, reject) => {
    const { code, message, response } = result;
    if (code === 0) {
      resolve({
        isSuccess: true,
        message: '주문 취소가 완료되었습니다.',
      });
    } else {
      resolve({ isSuccess: false, message: message as string });
    }
  });
};
