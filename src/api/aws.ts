import {
  S3Client,
  PutObjectCommand,
  DeleteObjectsCommand,
} from '@aws-sdk/client-s3';

type DeleteObject = {
  Key: string;
};

const s3Client = new S3Client({
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: import.meta.env.VITE_S3_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_S3_SECRET_ACCESS_KEY,
  },
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
  const representUpload = s3Client.send(
    new PutObjectCommand({
      Bucket: import.meta.env.VITE_S3_BUCKET_NAME,
      Key: `products/${id}/represent/${mainImage.name}`,
      Body: mainImage,
    }),
  );

  const subUpload = subImage.map((img) =>
    s3Client.send(
      new PutObjectCommand({
        Bucket: import.meta.env.VITE_S3_BUCKET_NAME,
        Key: `products/${id}/${img.name}`,
        Body: img,
      }),
    ),
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
    await s3Client.send(new DeleteObjectsCommand(params));
  } catch (err) {
    console.error('err', err);
  }
};
