import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateContact from './screens/CreateContact';
import ContactDetails from './screens/ContactDetails';
import ContactsList from './screens/ContactsList';
import Favorites from './screens/Favorites';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Stack =  createStackNavigator();

// const Tab = createBottomTabNavigator();

function MyStack(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="Contacts List" component={ContactsList} />
      <Stack.Screen name="Create Contact" component={CreateContact} />
      <Stack.Screen name="Contact Details" component={ContactDetails} />
      <Stack.Screen name="Favorites" component={Favorites} />
    </Stack.Navigator>
  )
}

// function MyTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={ContactsList} />
//       <Tab.Screen name="Favorites" component={Favorites} />
//     </Tab.Navigator>
//   );
// }


export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
      {/* <MyTabs /> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
