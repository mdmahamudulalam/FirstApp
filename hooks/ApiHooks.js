import {useEffect, useState} from 'react';

const baseUrl = 'http://media.mw.metropolia.fi/wbma/';

const useLoadMedia = ()=>{
  const [mediaArray, setMediaArray] = useState([]);
  const loadMedia = async (limit = 5) => {
    try {
    const listResponse = await fetch(baseUrl + 'media?limit=' + limit);
    const listJson = await listResponse.json();

    const media = await Promise.all(
      listJson.map(async(item)=>{
      const fileResponse = await fetch(baseUrl + 'media/' + item.file_id);
      const fileJson = fileResponse.json();
      return fileJson;
    })
    );

    setMediaArray(media);
  } catch(error){
  console.error('loadMedia error', error);
  }
  };
  useEffect(()=>{
  loadMedia(10);
  }, []);

  return mediaArray;

};

export {useLoadMedia};

