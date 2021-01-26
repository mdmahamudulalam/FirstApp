import React, {useContext} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLogin} from '../hooks/ApiHooks';
import FormTextInput from './FormTextInput';
import useLoginForm from '../hooks/LoginHooks';

const LoginForm = ({navigation}) => {
  const {inputs, handleInputChange} = useLoginForm();
  const {postLogin} = useLogin();
  const {setIsLoggedIn} = useContext(MainContext);

  const doLogin = async () => {
    try {
      const userData = await postLogin(inputs);
      setIsLoggedIn(true);
      await AsyncStorage.setItem('userToken', userData.token);
    } catch (error) {
      console.error('postLogin error', error);
      // TODO: add user notification about login error
    }
  };

  return (
    <View style={styles.container}>
      <FormTextInput
        autoCapitalize="none"
        placeholder="username"
        onChangeText={(txt) => handleInputChange('username', txt)}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
      />
      <Button title="Login" onPress={doLogin} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 2,
    padding: 4,
    backgroundColor: '#7FFFD4',
    fontWeight:'bold',
    backgroundColor: 'orange',
    borderRadius: 10,
    fontFamily: 'Roboto',
    fontSize: 21,
    width: '80%',
    },
});



LoginForm.propTypes = {
  navigation: PropTypes.object,
};

export default LoginForm;
