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
  await Promise.all([representUpload, ...subUpload]);

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

export const updateProductImg = async ({
  id,
  deleted,
  mainImg,
  subImg,
}: {
  id: string;
  deleted: string[];
  mainImg: File | null;
  subImg: File[] | null;
}) => {
  if (deleted.length > 0) {
    const params = {
      Bucket: import.meta.env.VITE_S3_BUCKET_NAME,
      Delete: { Objects: [] as DeleteObject[] },
    };
    deleted.forEach((del) =>
      params.Delete.Objects.push({ Key: `products/${id}/${del}` }),
    );
    try {
      await s3Client.send(new DeleteObjectsCommand(params));
    } catch (err) {
      console.error('Error deleting mainImage:', err);
    }
  }

  const uploadPromises: Promise<any>[] = [];
  if (mainImg) {
    const mainParams = {
      Bucket: import.meta.env.VITE_S3_BUCKET_NAME,
      Key: `products/${id}/represent/${mainImg.name}`,
      Body: mainImg,
    };
    uploadPromises.push(s3Client.send(new PutObjectCommand(mainParams)));
  }
  if (subImg && subImg.length > 0) {
    for (const img of subImg) {
      const subParams = {
        Bucket: import.meta.env.VITE_S3_BUCKET_NAME,
        Key: `products/${id}/${img.name}`,
        Body: img,
      };
      uploadPromises.push(s3Client.send(new PutObjectCommand(subParams)));
    }
  }
  try {
    if (uploadPromises.length > 0) {
      await Promise.all(uploadPromises);
    }
  } catch (err) {
    console.error('Error uploading images:', err);
  }
};
