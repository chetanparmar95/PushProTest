import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Home from '../../feature/home';
import Bookmark from '../../feature/bookmark';

const Tab = createMaterialTopTabNavigator();

function Container() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="All NFT" component={Home} />
      <Tab.Screen name="Saved" component={Bookmark} />
    </Tab.Navigator>
  );
}

export default Container;
