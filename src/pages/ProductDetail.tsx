import { useQueryClient } from '@tanstack/react-query';
import { SelectedProduct } from 'components/SelectedProduct';
import { useProductCountContext } from 'context/ProductCountContext';
import { useParams } from 'react-router-dom';
import type {
  AddCartProductType,
  CartItemType,
  ProductCountContextType,
} from 'types/product';
import { useAuthContext } from 'context/AuthContext';
import { useModalStore } from 'store/modal';
import AddToCartModal from 'components/AddToCartModal';
import { AuthContextType } from 'types/auth';
import { useCartQuery } from 'hooks/useCartQuery';
import ProductImage from 'components/ProductImage';
import { useProductDetailQuery } from 'hooks/useProductQueries';
import LikeButtonContainer from 'components/LikeButtonContainer';
import MetaTag from 'components/MetaTag';

const ProductDetail = () => {
  const { id } = useParams();
  const { user, loading } = useAuthContext() as AuthContextType;
  const { isProductLoading, product } = useProductDetailQuery(
    id || '',
    user?.uid,
    {
      enabled: !loading,
    },
  );
  const { openModal } = useModalStore();
  const {
    size: option,
    selected,
    setPrice,
    selectProduct,
  } = useProductCountContext() as ProductCountContextType;
  const { addToCartMutate } = useCartQuery();
  const queryClient = useQueryClient();

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

    if (products) {
      const selectedArr = Object.entries(selected);
      const options = selectedArr.filter((option) => {
        const same = products.find(
          (product) => product.id === id && product.size === option[0],
        );
        if (same) return;
        return option;
      });
      const filteredOption = Object.fromEntries(options);
      if (!options.length) return;

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

  if (isProductLoading || loading) return <p>Loading...</p>;
  if (!product) return <p>상품을 불러올 수 없습니다.</p>;
  const {
    id: productId,
    name,
    mainImg,
    subImg,
    description,
    price,
    size,
    isLiked,
  } = product;

  return (
    <>
      <MetaTag title={`${name} - Shopshop`} />
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
            <LikeButtonContainer isLiked={isLiked} id={productId} />
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
