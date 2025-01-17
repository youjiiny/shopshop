import { useQueryClient } from '@tanstack/react-query';
import { SelectedProduct } from 'components/SelectedProduct';
import { useProductCountContext } from 'context/ProductCountContext';
import { useParams } from 'react-router-dom';
import type {
  AddCartProductType,
  CartItemType,
  GetProductType,
  ProductCountContextType,
} from 'types/product';
import { useAuthContext } from 'context/AuthContext';
import { useModalStore } from 'store/modal';
import AddToCartModal from 'components/AddToCartModal';
import { AuthContextType } from 'types/auth';
import { useCartQuery } from 'hooks/useCartQuery';
import HeartSvg from 'assets/svg/HeartSvg';
import ProductImage from 'components/ProductImage';
import { useProductDetailQuery } from 'hooks/useProductQueries';
import LoginRequestModal from 'components/LoginRequestModal';
import {
  useLikeMutation,
  useUnLikeMutation,
} from 'hooks/useLikeProductMutation';

const ProductDetail = () => {
  const { id } = useParams();
  const { user } = useAuthContext() as AuthContextType;
  const { isProductLoading, product } = useProductDetailQuery(
    id || '',
    user?.uid,
  );
  const { mutate: likeMutate } = useLikeMutation(id || '');
  const { mutate: unlikeMutate } = useUnLikeMutation(id || '');
  const { openModal } = useModalStore();
  const {
    size: option,
    selected,
    setPrice,
    selectProduct,
  } = useProductCountContext() as ProductCountContextType;
  const { addToCartMutate } = useCartQuery();
  const queryClient = useQueryClient();

  const handleLike = () => {
    if (!user?.uid) {
      openModal(<LoginRequestModal />);
      return;
    }
    if (isLiked) {
      unlikeMutate({ productId: id || '', uid: user?.uid });
    } else {
      likeMutate({ productId: id || '', uid: user?.uid });
    }
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setPrice(price);
    selectProduct(value);
  };

  const handleAdd = () => {
    if (!selected) return;
    openModal(<AddToCartModal />);
    const products: CartItemType[] | undefined = queryClient.getQueryData([
      'myCart',
      user?.uid as string,
    ]);
    const addProduct = {
      id,
      name,
      image: `${import.meta.env.VITE_CLOUDFRONT_URL}/${id}/represent/${product?.mainImg}`,
      price,
    } as AddCartProductType;

    // 장바구니에 담긴 상품이 있으면
    if (products) {
      // 선택한 상품들 중 장바구니에 담지 않은 상품들로 필터링
      const selectedArr = Object.entries(selected);
      const options = selectedArr.filter((option) => {
        const same = products.find(
          (product) => product.id === id && product.size === option[0],
        );
        if (same) return;
        return option;
      });
      // 장바구니에 없는 상품들을 객체로 다시 변환
      const filteredOption = Object.fromEntries(options);
      if (!options.length) return; // 모두 장바구니에 있으면 스킵

      addToCartMutate({
        uid: user?.uid as string,
        product: addProduct,
        option: filteredOption,
      });
    } else {
      addToCartMutate({
        uid: user?.uid as string,
        product: addProduct,
        option: selected,
      });
    }
  };

  if (isProductLoading) return <p>Loading...</p>;
  const { name, mainImg, subImg, description, price, size, isLiked } =
    product as GetProductType;

  return (
    <>
      <div className='w-full flex flex-col md:flex-row content-between gap-10 p-10'>
        <div className='w-[400px] h-[400px] shrink-0 overflow-hidden'>
          <img
            className='object-cover object-center'
            src={`${import.meta.env.VITE_CLOUDFRONT_URL}/${id}/represent/${mainImg}?w=800&h=800`}
            alt={'상품 이미지'}
            width={400}
            height={400}
          />
        </div>
        <div className='w-full flex flex-col gap-2 pl-10'>
          <div className='flex justify-between'>
            <h2 className='text-xl font-semibold'>{name}</h2>
            <button
              onClick={handleLike}
              aria-label='like Product'
              disabled={user?.isAdmin}
              title={user?.isAdmin ? '좋아요는 일반 회원만 가능합니다.' : ''}
            >
              <HeartSvg isLiked={isLiked} size={'26'} />
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
            //defaultValue={''}
            value={''}
            aria-label='size'
          >
            <option disabled value={''}>
              [사이즈]를 선택하세요.
            </option>
            {size &&
              size.split(',')?.map((s, i) => (
                <option key={i} value={s} label={s}>
                  {s}
                </option>
              ))}
          </select>
          {selected && <SelectedProduct option={option} />}
          <button
            className='h-12 mt-4 bg-primary text-white hover:bg-price-stress shadow-md'
            onClick={handleAdd}
          >
            장바구니 담기
          </button>
        </div>
      </div>
      <ProductImage id={id as string} subImg={subImg} />
    </>
  );
};

export default ProductDetail;
