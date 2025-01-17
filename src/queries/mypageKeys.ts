const mypageKeys = {
  all: (uid: string): [string, string] => ['mypage', uid],
  liked: (uid: string): [string, string, string] => [
    ...mypageKeys.all(uid),
    'liked',
  ],
  orders: (uid: string): [string, string, string] => [
    ...mypageKeys.all(uid),
    'orders',
  ],
  cancelledOrders: (uid: string): [string, string, string, string] => [
    ...mypageKeys.orders(uid),
    'cancelled',
  ],
};

export default mypageKeys;
