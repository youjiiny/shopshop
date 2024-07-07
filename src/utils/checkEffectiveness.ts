export const EMAIL_REGEX = new RegExp(
  '^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$',
);
export const PASSWORD_REGEX = new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9]).{6,25}$');
export const PHONE_REGEX = new RegExp('^\\d{2,3}-?\\d{3,4}-?\\d{4}$');
