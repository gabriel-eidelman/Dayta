import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';

const GlobalStatusBar = () => {
  const colorScheme = useColorScheme();

  return (
    <StatusBar
      barStyle={colorScheme === 'light' ? 'light-content' : 'dark-content'}
    //   barStyle='dark-content'
      animated={true}
    />
  );
};

export default GlobalStatusBar;