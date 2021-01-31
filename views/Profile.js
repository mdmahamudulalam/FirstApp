import React, {useContext, useState, useEffect,} from 'react';
import {StyleSheet, Button, ActivityIndicator, ScrollView} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Avatar, Card, Text, ListItem} from 'react-native-elements';
import {uploadsUrl} from '../utils/variables';
import {useTag} from '../hooks/ApiHooks';


const Profile = ({navigation}) => {
  const {isLoggedIn, setIsLoggedIn, user} = useContext(MainContext);
  const [avatar, setAvatar] = useState('http://placekitten.com/640');
  const {getFilesByTag} = useTag();
  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.clear();
    if (!isLoggedIn) {

      navigation.navigate('Login');
    }
  };
  useEffect(() => {
    const fetchAvatar = async () => {
      try{
        const avatarList = await getFilesByTag('avatar_' + user.user_id);
        if (avatarList.length > 0){

          setAvatar(uploadsUrl + avatarList.pop().filename);
        }
      } catch (error){
        console.error(error.message);
      }

      };
      fetchAvatar();
    }, []);

  return (
    <ScrollView>
    <Card>
      <Card.Title >
        <Text h1>{user.username}</Text>
        </Card.Title>
      <Card.Image
      source={{uri: avatar}}
      style={styles.image}
      PlaceholderContent={<ActivityIndicator/>}
      />
      <ListItem>
        <Avatar icon={{name: 'email', color: 'black'}} />
        <Text>{user.email}</Text>
      </ListItem>
      <ListItem>
        <Avatar icon={{name: 'user', type: 'font-awesome', color: 'black'}} />
        <Text>{user.full_name}</Text>
      </ListItem>
      <Button title={'Logout'} onPress={logout}></Button>
    </Card>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
});

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
