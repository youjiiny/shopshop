import { Link } from 'react-router-dom';
import { CartItemType } from 'types/product';

const OrderProducts = ({ products }: { products: CartItemType[] }) => {
  return (
    <section>
      <h3 className='text-xl mb-3'>
        {`주문 상품 정보 / ${products.length}개 상품`}
      </h3>
      <div className='border-t-2 border-black'>
        <ul>
          <li className='w-full table table-fixed text-sm border-b border-gray-950 leading-[60px]'>
            <div className='w-8/12 relative table-cell text-center'>
              <div className='flex items-center justify-between'>
                <span className='w-24'>상품</span>
                <span className='flex-1'>상품 정보</span>
              </div>
            </div>
            <div className='table-cell'>수량</div>
            <div className='table-cell'>진행 상태</div>
          </li>
          {products?.map((product) => {
            const { id, name, image, price, size, quantity } = product;
            return (
              <>
                <li className='w-full table table-fixed py-6 border-b last:border-b-2 border-b-black'>
                  <div className='w-8/12 relative table-cell text-center text-base md:text-xl'>
                    <Link to={`/products/${id}`} className='flex items-center'>
                      <img
                        src={image}
                        className='w-24 h-24 mr-5 object-cover'
                        alt='상품 이미지'
                      />
                      <div>
                        <h3 className='pt-6 pb-2'>{name}</h3>
                        <p className='text-price-stress font-bold'>
                          {`${price.toLocaleString()}원`}
                        </p>
                        <ul className='mt-2 mb-1'>
                          <li className='text-xs'>옵션:{size}</li>
                        </ul>
                      </div>
                    </Link>
                  </div>
                  <div className='table-cell align-middle text-sm md:text-base font-bold'>
                    {quantity}
                  </div>
                  <div className='table-cell align-middle text-sm md:text-base font-bold'>
                    결제 완료
                  </div>
                </li>
              </>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default OrderProducts;
