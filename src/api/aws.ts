import AWS from 'aws-sdk';
import S3 from 'aws-sdk/clients/s3';

type DeleteObject = {
  Key: string;
};

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

export const deleteProductImg = async (
  id: string,
  mainImg: string,
  subImg: string[],
) => {
  try {
    const params = {
      Bucket: import.meta.env.VITE_S3_BUCKET_NAME,
      Delete: { Objects: [] as DeleteObject[] },
    };
    subImg.forEach((img) =>
      params.Delete.Objects.push({ Key: `products/${id}/${img}` }),
    );
    params.Delete.Objects.push({ Key: `products/${id}/represent/${mainImg}` });
    await s3.deleteObjects(params).promise();
  } catch (err) {
    console.error('err', err);
  }
};
