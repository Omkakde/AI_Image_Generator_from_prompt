import React, { useRef, useState } from 'react';
import './ImageGenerator.css';
import default_image from './default_image.svg'; // Use a relative path
import API_KEY from './apiKeys';



const ImageGenerator = () => {
  const [imageUrl, setImageUrl] = useState('/');
  const inputRef = useRef(null);

  const imageGenerator = async () => {
    if (inputRef.current.value === "") {
      return;
    }

    try {
      const response = await fetch(
        'https://api.openai.com/v1/images/generations',
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${API_KEY}`, // Use the imported API_KEY correctly
            "Content-Type": "application/json",
            "User-Agent": "Chrome",
          },
          body: JSON.stringify({
            prompt: `${inputRef.current.value}`,
            n: 1,
            size: "512x512",
          }),
        }
      );
      
      const data = await response.json();
      const dataUrl = data.data[0].url;
      setImageUrl(dataUrl);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  return (
    <div className='ai-image-generator'>
      <div className='header'>AI Image <span>Generator</span></div>
      <div className='img-loading'>
        <div className='image'>
          <img src={imageUrl === '/' ? default_image : imageUrl} alt="Generated Image" />
        </div>
      </div>
      <div className='search-box'>
        <input
          type='text'
          ref={inputRef}
          className='search-input'
          placeholder='Describe What You Want To See'
        />
        <div className='generate-btn' onClick={imageGenerator}>
          Generate
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
