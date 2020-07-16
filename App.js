import { StatusBar } from 'expo-status-bar';
import React, { useState, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './Screens/LoginSreen';
import MainScreen from './Screens/MainScreen';
import SignUpScreen from "./Screens/SignUpScreen"

import { AppContext } from './Context/AppContext';


import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import NoteComp from "./Components/NoteComp"
import { SafeAreaView } from 'react-native-safe-area-context';


const SignInStackNavigator = new createStackNavigator();

function MainLoginStackNavigator() {
  return (
    <SignInStackNavigator.Navigator>
      <SignInStackNavigator.Screen name="LoginScreen" component={LoginScreen} options= {{headerShown: false  }} />
      <SignInStackNavigator.Screen name = "SignUpScreen" component = {SignUpScreen} options = {{headerShown: false}} />
    </SignInStackNavigator.Navigator>
  )
}

export default function App() {

  return(
    <SafeAreaView>
      <NoteComp />
    </SafeAreaView>

  )

  const [userId, setUserId] = useState(null)

  const userContext = useMemo(
    function () {
      return (
        {
          signIn: function (id) { setUserId(id) }
        }
      )
    }
  )

  if (userId) {
    return (
     <AppContext.Provider value = {userContext}>
        <MainScreen name = {userId} />
     </AppContext.Provider>
    )
  } else {
    return (
      <AppContext.Provider value={userContext}>
        <NavigationContainer>
          <MainLoginStackNavigator />
        </NavigationContainer>
      </AppContext.Provider>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
