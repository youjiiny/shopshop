import AWS from 'aws-sdk';
import S3 from 'aws-sdk/clients/s3';
import { v4 as uuidv4 } from 'uuid';

// AWS 설정
AWS.config.update({
  region: 'ap-northeast-2',
  accessKeyId: import.meta.env.VITE_S3_ACCESS_KEY_ID,
  secretAccessKey: import.meta.env.VITE_S3_SECRET_ACCESS_KEY,
});

export const s3 = new S3({
  params: { Bucket: import.meta.env.VITE_S3_BUCKET_NAME },
  region: 'ap-northeast-2',
});

export const uploadProductImg = async ({
  mainImg,
  subImg,
}: {
  mainImg: File;
  subImg: File[];
}) => {
  // 대표 사진 업로드
  const id = uuidv4();
  const mainImgFormat = mainImg.name;
  const representUpload = s3
    .upload({
      Bucket: import.meta.env.VITE_S3_BUCKET_NAME,
      Key: `products/${id}/represent/${mainImgFormat}`,
      Body: mainImg,
    })
    .promise();
  const subUpload = subImg.map((img) =>
    s3
      .upload({
        Bucket: import.meta.env.VITE_S3_BUCKET_NAME,
        Key: `products/${id}/${img.name}`,
        Body: img,
      })
      .promise(),
  );
  const [representResult, subResult] = await Promise.all([
    representUpload,
    subUpload,
  ]);
  console.log('representResult', representResult, 'subResult', subResult);
  const representUrl = `https://${import.meta.env.VITE_S3_BUCKET_NAME}.s3.amazonaws.com/products/${id}/represent/${mainImgFormat}`;
  const productUrls = subImg.map(
    (img) =>
      `https://${import.meta.env.VITE_S3_BUCKET_NAME}.s3.amazonaws.com/products/${id}/${img.name}`,
  );
  // 그외에 사진들 업로드
  console.log('대표 사진 url', representUrl);
  console.log('상품 사진 url들', productUrls);
  return { representUrl, productUrls };

  // 모두 업로드하면 이미지 주소들 반환
};
