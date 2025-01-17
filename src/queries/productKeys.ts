const productKeys = {
  all: ['products'],
  detail: (id: string) => [...productKeys.all, id],
};

export default productKeys;
