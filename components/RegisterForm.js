import React from 'react';
import {Alert, Button, View} from 'react-native';
import PropTypes from 'prop-types';
import {useLogin, useUser} from '../hooks/ApiHooks';
import {Input} from 'react-native-elements';
import useSignUpForm from '../hooks/RegisterHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useContext} from 'react';
import {MainContext} from '../contexts/MainContext';

const RegisterForm = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {inputs,
    handleInputChange,
    handleInputEnd,
    checkUserAvailable,
    validateOnSend,
    registerErrors} = useSignUpForm();
  const {postRegister} = useUser();
  const {postLogin} = useLogin();

  const doRegister = async () => {
    if (!validateOnSend()){
      Alert.alert('input validation failled')
      return ;
    }
    delete inputs.confirmPassword;
    try {
      const result = await postRegister(inputs);
      console.log('doRegister ok', result.message);
      Alert.alert(result.message);

      const userData = await postLogin(inputs);
      await AsyncStorage.setItem('userToken', userData.token);
      setIsLoggedIn(true);
      setUser(userData.user);
    } catch (error) {
      console.log('registration error', error);
      Alert.alert(error.message);
    }
  };

  return (
    <View>
      <Input
        autoCapitalize="none"
        placeholder="username"
        onChangeText={(txt) => handleInputChange('username', txt)}
        onEndEditing ={(event)=>{
          checkUserAvailable(event);
          handleInputEnd('username', event.nativeEvent.text);
        }}
        errorMessage={registerErrors.username}

        />
      <Input
        autoCapitalize="none"
        placeholder="password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        onEndEditing ={(event)=>
          handleInputEnd('password', event.nativeEvent.text)}
        secureTextEntry={true}
        errorMessage={registerErrors.password}
        />
        <Input
        autoCapitalize="none"
        placeholder=" confirm password"
        onChangeText={(txt) => handleInputChange('confirmPassword', txt)}
        onEndEditing ={(event)=>
          handleInputEnd('pconfirmPassword', event.nativeEvent.text)}
        secureTextEntry={true}
        errorMessage={registerErrors.confirmPassword}
        />
      <Input
        autoCapitalize="none"
        placeholder="email"
        onChangeText={(txt) => handleInputChange('email', txt)}
        errorMessage={registerErrors.email}
        onEndEditing ={(event)=>{
          handleInputEnd('email', event.nativeEvent.text)
        }}
        errorMessage={registerErrors.email}
      />
      <Input
        autoCapitalize="none"
        placeholder="full name"
        onChangeText={(txt) => handleInputChange('full_name', txt)}
        onEndEditing ={(event)=>{
          handleInputEnd('full_name', event.nativeEvent.text)
        }}
        errorMessage={registerErrors.full_name}
      />
      <Button title="Register!" onPress={doRegister} />
    </View>
  );
};

RegisterForm.propTypes = {
  navigation: PropTypes.object,
};

export default RegisterForm;
