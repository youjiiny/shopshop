import axios from 'axios';

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append(
    'upload_preset',
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
  );
  const { data } = await axios.post(
    import.meta.env.VITE_CLOUDINARY_URL,
    formData,
  );
  console.log('res', data);
  return data.url;
};
