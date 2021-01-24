import {useEffect, useState} from 'react';
import {baseUrl} from '../variables';



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
  loadMedia(20);
  }, []);

  return mediaArray;

};

const useLogin =()=>{

  const postLogin = async (userCredentials)=>{
    const options = {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(userCredentials),
    };
    try{

      const response = await fetch(baseUrl + 'login', options);
      const userData = await response.json();
      console.log('postLogin response status', response.status);
      console.log('postLogin userData', userData);

      if (response.ok){
        return userData;
      }else{
        throw new Error(userData.message);
      }
    } catch(error){
      throw new Error(error.message);
    }

  };

  const checkToken = async (token)=>{
    try{
      const options = {
        method: 'GET',
        headers: {'x-access-token': token},
      };

      const response = await fetch(baseUrl + 'users/user', options);
      const userData = response.json();
      if (response.ok){
        return userData;
      }else{
        throw new Error(userData.message);
      }

    }catch(error){
      throw new Error(error.message)
    }

  };

return {postLogin, checkToken};
};

const useRegister = () =>{
  const postRegister = async (inputs) =>{
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    try {
       const response = await fetch(baseUrl + 'users', fetchOptions);
       const json = await response.json();
       if (response.ok){
        return json;
      }else{
        throw new Error(json.message + ':' + json.error );
      }
       return json;
    } catch (e) {
        console.log('ApiHooks register', e.message);
        throw new Error(e.message);
    }

  };

  return {postRegister};

};

export {useLoadMedia, useLogin, useRegister};

