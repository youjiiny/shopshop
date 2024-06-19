import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProudctDetail } from 'api/product';
import { SelectedProduct } from 'components/SelectedProduct';
import { useProductCountContext } from 'context/ProductCountContext';
import { useParams } from 'react-router-dom';
import {
  AddCartProductType,
  CartItemType,
  GetProductType,
  ProductCountContextType,
} from 'types/product';
import { IoMdHeartEmpty } from 'react-icons/io';
import { addCart } from 'api/cart';
import { useAuthContext } from 'context/AuthContext';
import { useModalStore } from 'store/modal';
import Modal from 'components/Modal';
import AddToCartModal from 'components/AddToCartModal';

const ProductDetail = () => {
  const { id } = useParams();
  const {
    isLoading,
    error,
    data: product,
  } = useQuery<GetProductType>({
    queryKey: ['products', id],
    queryFn: () => getProudctDetail(id as string),
  });
  const user = useAuthContext();
  const queryClient = useQueryClient();
  const { isOpen, toggleModal } = useModalStore();
  const {
    size: option,
    selected,
    setPrice,
    selectSize,
    selectProduct,
  } = useProductCountContext()! as ProductCountContextType;

  const addToCartMutation = useMutation({
    mutationFn: addCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myCart', user!.uid] });
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const { name, image, description, price, size } = product!;

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setPrice(price);
    selectSize(value);
    selectProduct(value);
  };

  const handleAdd = () => {
    if (!selected) return;
    toggleModal();
    const products: CartItemType[] | undefined = queryClient.getQueryData([
      'myCart',
      user?.uid as string,
    ]);
    const addProduct = { id, name, image, price } as AddCartProductType;
    if (products) {
      // 장바구니에 담긴 상품 중 같은 상품명, 같은 사이즈이면 return;
      const same = products.find(
        (product) =>
          product.id === id && product.size === Object.keys(selected)[0],
      );
      if (same) return;
    }
    addToCartMutation.mutate({
      uid: user!.uid,
      product: addProduct,
      option: selected,
    });
  };

  return (
    <div className='w-full flex flex-col md:flex-row content-between gap-10 p-10'>
      {isOpen && (
        <Modal>
          <AddToCartModal />
        </Modal>
      )}
      <img
        className='w-full basis-1/2 md:w-140 md:h-140'
        src={image}
        alt={'상품 이미지'}
      />
      <div className='w-full basis-1/2 flex flex-col gap-2 pl-10'>
        <div className='flex justify-between'>
          <h3 className='text-xl font-semibold'>{name}</h3>
          <button>
            <IoMdHeartEmpty size={26} />
          </button>
        </div>
        <div className='border-b-2 pb-2'>
          <span className='text-xl font-semibold'>
            {price.toLocaleString()}
          </span>
          <span className='font-bold'>원</span>
        </div>

        <p>{description}</p>
        <select
          className='h-8 border border-gray-400 outline-none cursor-pointer'
          onChange={handleSelect}
          defaultValue={''}
        >
          <option disabled value={''}>
            [사이즈]를 선택하세요.
          </option>
          {size?.map((s, i) => (
            <option key={i} value={s}>
              {s}
            </option>
          ))}
        </select>
        {selected && <SelectedProduct option={option} />}
        <button className='h-12 mt-4 bg-primary text-white' onClick={handleAdd}>
          장바구니 담기
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
