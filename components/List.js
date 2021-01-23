import React from 'react'
import { FlatList } from 'react-native';
import {useLoadMedia} from '../hooks/ApiHooks';
import ListItem from './ListItem';

const List = (props) => {
  const mediaArray = useLoadMedia();
return (
    <FlatList
       data={mediaArray}
       keyExtractor ={(item, index)=> index.toString()}
       renderItem={({item}) => <ListItem navigation ={props.navigation} singleMedia={item} />}
     />
  );
}

export default List;
