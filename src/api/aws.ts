import AWS from 'aws-sdk';
import S3 from 'aws-sdk/clients/s3';

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
  id,
  mainImage,
  subImage,
}: {
  id: string;
  mainImage: File;
  subImage: File[];
}) => {
  const representUpload = s3
    .upload({
      Bucket: import.meta.env.VITE_S3_BUCKET_NAME,
      Key: `products/${id}/represent/${mainImage.name}`,
      Body: mainImage,
    })
    .promise();
  const subUpload = subImage.map((img) =>
    s3
      .upload({
        Bucket: import.meta.env.VITE_S3_BUCKET_NAME,
        Key: `products/${id}/${img.name}`,
        Body: img,
      })
      .promise(),
  );
  await Promise.all([representUpload, subUpload]);

  const subImgs = subImage.map((img) => img.name);
  return { mainImg: mainImage.name, subImg: subImgs };
};
