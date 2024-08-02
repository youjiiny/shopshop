export interface RequestPayAdditionalParams {
  digital?: boolean;
  vbank_due?: string;
  m_redirect_url?: string;
  app_scheme?: string;
  biz_num?: string;
}

export interface Display {
  card_quota?: number[];
}

export interface RequestPayParams extends RequestPayAdditionalParams {
  pg?: string;
  pay_method: string;
  escrow?: boolean;
  merchant_uid: string;
  name?: string;
  amount: number;
  custom_data?: any;
  tax_free?: number;
  currency?: string;
  language?: string;
  buyer_name?: string;
  buyer_tel: string;
  buyer_email?: string;
  buyer_addr?: string;
  buyer_postcode?: string;
  notice_url?: string | string[];
  display?: Display;
}
export interface RequestPayAdditionalResponse {
  apply_num?: string;
  vbank_num?: string;
  vbank_name?: string;
  vbank_holder?: string | null;
  vbank_date?: number;
}

export interface RequestPayResponse extends RequestPayAdditionalResponse {
  success: boolean;
  error_code: string;
  error_msg: string;
  imp_uid: string | null;
  merchant_uid: string;
  pay_method?: string;
  paid_amount?: number;
  status?: string;
  name?: string;
  pg_provider?: string;
  pg_tid?: string;
  buyer_name?: string;
  buyer_email?: string;
  buyer_tel?: string;
  buyer_addr?: string;
  buyer_postcode?: string;
  custom_data?: any;
  paid_at?: number;
  receipt_url?: string;
}

type PaymentCancelAnnotation = {
  pg_tid: string;
  amount: number;
  cancelled_at: number;
  reason: string;
  cancellation_id: string;
  receipt_url?: string;
};

type PaymentAnnotation = {
  imp_uid: string;
  merchant_uid: string;
  pay_method?: string;
  channel?: string;
  pg_provider?: string;
  emb_pg_provider?: string;
  pg_tid?: string;
  pg_id?: string;
  escrow?: boolean;
  apply_num?: string;
  bank_code?: string;
  bank_name?: string;
  card_code?: string;
  card_name?: string;
  card_issuer_code?: string;
  card_issuer_name?: string;
  card_publisher_code?: string;
  card_publisher_name?: string;
  card_quota?: number;
  card_number?: string;
  card_type?: number;
  vbank_code?: string;
  vbank_name?: string;
  vbank_num?: string;
  vbank_holder?: string;
  vbank_date?: number;
  vbank_issued_at?: number;
  name?: string;
  amount: number;
  cancel_amount: number;
  currency: string;
  buyer_name?: string;
  buyer_email?: string;
  buyer_tel?: string;
  buyer_addr?: string;
  buyer_postcode?: string;
  custom_data?: string;
  user_agent?: string;
  status: string;
  started_at?: number;
  paid_at?: number;
  failed_at?: number;
  cancelled_at?: number;
  fail_reason?: string;
  cancel_reason?: string;
  receipt_url?: string;
  cancel_history?: PaymentCancelAnnotation[];
  cancel_receipt_urls?: string[];
  cash_receipt_issued?: boolean;
  customer_uid?: string;
  customer_uid_usage?: string;
};

export type RequestPayResponseCallback = (response: RequestPayResponse) => void;
export type RequestRefundResponse = {
  code?: number;
  message?: string;
  response?: PaymentAnnotation;
};
export interface IamPort {
  init: (accountID: string) => void;
  request_pay: (
    params: RequestPayParams,
    callback?: RequestPayResponseCallback,
  ) => void;
}

declare global {
  interface Window {
    IMP: IamPort;
  }
}
