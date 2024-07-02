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
import SelectedOptionModal from 'components/SelectedOptionModal';
import { AuthContextType } from 'types/auth';

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
  const { user } = useAuthContext() as AuthContextType;
  const queryClient = useQueryClient();
  const { isOpen, mode, setMode, toggleModal } = useModalStore();
  const {
    size: option,
    selected,
    setPrice,
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
    selectProduct(value);
  };

  const handleAdd = () => {
    if (!selected) return;
    if (mode !== 'add cart') {
      setMode('add cart');
    }
    toggleModal();
    const products: CartItemType[] | undefined = queryClient.getQueryData([
      'myCart',
      user?.uid as string,
    ]);
    const addProduct = { id, name, image, price } as AddCartProductType;
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

      addToCartMutation.mutate({
        uid: user!.uid,
        product: addProduct,
        option: filteredOption,
      });
    } else {
      addToCartMutation.mutate({
        uid: user?.uid as string,
        product: addProduct,
        option: selected,
      });
    }
  };

  return (
    <div className='w-full flex flex-col md:flex-row content-between gap-10 p-10'>
      {isOpen && mode === 'add cart' && (
        <Modal>
          <AddToCartModal />
        </Modal>
      )}
      {isOpen && mode === 'duplicate option' && (
        <Modal>
          <SelectedOptionModal />
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
          //defaultValue={''}
          value={''}
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
        <button
          className='h-12 mt-4 bg-primary text-white hover:bg-price-stress shadow-md'
          onClick={handleAdd}
        >
          장바구니 담기
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
