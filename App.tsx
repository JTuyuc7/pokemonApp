import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

//import Navigation from './src/navigator/navigation';
import TabNavigation from './src/navigator/TabsNavigator';

const App = () => {

  return(

    <>
      <NavigationContainer>
        <TabNavigation />
      </NavigationContainer>
    </>
  )
}

export default App;