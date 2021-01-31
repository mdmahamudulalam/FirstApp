import React from 'react'
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {Avatar, ListItem as RNEListItem} from 'react-native-elements';


const ListItem = ({navigation, singleMedia}) => {
  return (


    <RNEListItem
    bottomDivider
    onPress={  
      () => {
        navigation.navigate('Single', {file: singleMedia});
      }
    }
    >

      <Avatar
        size="large"
        square
        source={{uri: uploadsUrl + singleMedia.thumbnails.w160}}
      ></Avatar>

      <RNEListItem.Content>
        <RNEListItem.Title h3 >{singleMedia.title}</RNEListItem.Title>
        <RNEListItem.Subtitle>{singleMedia.title}</RNEListItem.Subtitle>
        </RNEListItem.Content>
        <RNEListItem.Chevron/>
    </RNEListItem>
  );
}


ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

export default ListItem;
