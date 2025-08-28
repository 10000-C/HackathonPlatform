import React from 'react';
const saveToIPFS = async (file) => {
  const jwtToken = import.meta.env.VITE_ADMIN_JWT || "";
  if (!jwtToken) {
    throw new Error('JWT environment variable is not set');
  }

  const formData = new FormData();

  formData.append("name", "test");// name metadata目前无法成功实现在pinata上显示
  formData.append("file", file);
  
  try {
    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${jwtToken}`
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.IpfsHash;
  } catch (error) {
    console.error('Error uploading file to Pinata:', error);
    throw error;
  }
};

export default saveToIPFS;