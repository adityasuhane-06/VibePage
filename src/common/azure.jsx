import axios from 'axios';
const API_BASE_URL =  'https://server-vibepage.vercel.app';
const uploadImage = async (imgFile) => {
  try {
    const headers = {
      'content-type': imgFile.type,
      'content-disposition': `attachment; filename="${imgFile.name}"`,
      'x-caption': 'Uploaded from React',
    };

    // Step 1: Get a signed upload URL from your backend
    const { data: { imageUrl } } = await axios.post(API_BASE_URL+
      '/api/upload-url',
      imgFile,
      { headers }
    );

    console.log("Image uploaded to:", imageUrl);
    return imageUrl;

  } catch (error) {
    console.error("Upload failed:",error);
    return null;
  }
};

export const uploadAttachment=async (file) => {
  try {
    const header={
      'content-type': file.type,
      'content-disposition': `attachment; filename="${file.name}"`,
      'x-caption': 'Uploaded from React',
    }
    const {data:{fileUrl}}=await axios.post(API_BASE_URL+
      '/api/upload-file',
      file,
      { headers: header }
    );
    console.log("File uploaded to:", fileUrl);
    return fileUrl;

    
  } catch (error) {
    console.error("Upload failed:",error);
    return null;
    
  }
}

export default uploadImage;

