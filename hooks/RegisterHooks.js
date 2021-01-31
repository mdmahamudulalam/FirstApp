import {useState} from 'react';
import {validator} from 'validate.js';
import {useUser} from './ApiHooks';

const  constraints = {

    username: {
      presence:{
        message: 'Cannot be empty',
      },
      length:{
        minimum: 4,
        message: 'min length is 4 characters'
      }
    },
    password: {
      presence:{
        message: 'Cannot be empty',
      },
      length:{
        minimum: 5,
        message: 'min length is 5 characters'
      }
    },
    confirmPassword: {
      equality: 'password',
    },
    email: {
      presence:{
        message: 'Cannot be empty',
      },
      email: {
        message: 'is not valid',}
    },
    full_name: {
      length:{
        minimum: 5,
        message: 'min length is 5 characters'
      },
    },
};


const useSignUpForm = (callback) => {

  const [registerErrors, setregisterErrors] = useState({});
  const {checkIsUserAvailable} = useUser();

  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    email: '',
    full_name: '',
  });

  const handleInputChange = (name, text) => {

    setInputs((inputs) => {
      return {
        ...inputs,
        [name]: text,
      };
    });

  };

const handleInputEnd = (name, event)=>{
  const text = event.text;
  if (text === '') {
    text = null;
  };
  let error;
if (name === 'confirmPassword'){
  error  = validator(
    name,
    {
      password: inputs.password,
      confirmedPassword: text,
    }, constraints
    );
} else{
  error = validator(name, text, constraints);
}

  setregisterErrors((registerErrors)=>{
    return {
      ...registerErrors,
      [name]: error,
    };

  });

  };


  const checkUserAvailable = async (event)=> {
    try {
      const result = await checkIsUserAvailable(event.nativeElement.text);
      if (!result){
        setregisterErrors((registerErrors)=>{
          return {
            ...registerErrors,
            username:'Username already exists',
          };

        });
      }
    } catch (error){
      console.log('reg checkUserAvailable', error)

    }
    setUsernameError('always invalid');



  };
  const validateOnSend = ()=>{
    const usernameError = validator('username', inputs.username, constraints);
    const passwordError = validator('password', inputs.password, constraints);
    const confirmPasswordError = validator(
      'confirmPassword',
      {
        password: inputs.password,
        confirmPassword: inputs.confirmPassword,
      },
      constraints
      );
      const emailError = validator('email', inputs.email, constraints);
      const fullnameError = validator('full_name', inputs.full_name, constraints);
setregisterErrors((registerErrors)=>{
 return {
   ...registerErrors,
  username: usernameError,
  password: passwordError,
  confirmPassword: confirmPasswordError,
  email: emailError,
  full_name: fullnameError,
  };
});
if (
  usernameError !==null ||
  passwordError !== null ||
  confirmError !== null ||
  emailError !== null ||
  fullnameError !== null
  )
   {

  return false;
}

  return true;

  };
  return {
    handleInputChange,
    inputs,
    checkUserAvailable,
    registerErrors,
    handleInputEnd,
    validateOnSend,
  };
};


export default useSignUpForm;
