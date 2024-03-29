import React, { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, Text, Button, TextInput, Image } from 'react-native'
import { AppContext } from '../Context/AppContext'
import FirebaseController from '../Controllers/FirebaseController'
import { Container, Header, Content, View, Form, Item, Input, Label, Button as BaseButton,Icon } from 'native-base';
import {KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

import LottieView from 'lottie-react-native';


const firebaseController = new FirebaseController();

export default function LoginScreen({ navigation }) {


    const { signIn } = React.useContext(AppContext)
    const [showPassowrd, setShowPassword] = useState(true)
    const [passowrdIcon, setPassowrdIcon] = useState("eye-off")
    const [password, setPassword] = useState("")

    const [email, setEmail] = useState("")
    
    return (
        <KeyboardAwareScrollView style = {{flex: 1}}>
            <Container style={{ flex: 1 }}>
            <View style={{ flex: 4, justifyContent: "flex-start", alignItems: "center" }}>
                <Image source={require("../Assests/logo.png")} style={{ width: 250, height: 250 }} />
                <Text style={{ fontSize: 20 }}>Welcome To My Note App</Text>
            </View>
            <View style={{ flex: 2, alignContent: "center" }}>
                <Form>
                    <Item fixedLabel>
                        <Label>Email</Label>
                        <Input 
                        keyboardType="email-address" 
                        onChangeText = {function(text)
                        {
                            setEmail(text)
                        }}
                        />
                    </Item>
                    <Item fixedLabel>
                        <Label>Password</Label>
                        <Input secureTextEntry = {showPassowrd}
                        onChangeText = {function(text)
                        {
                            setPassword(text)
                        }}
                        />
                        <Icon name={passowrdIcon} onPress={() => 
                            {
                                setShowPassword(!showPassowrd)
                                if(showPassowrd)
                                {
                                    setPassowrdIcon("eye")
                                }else{
                                    setPassowrdIcon("eye-off")
                                }
                            }
                        } />
                    </Item>
                </Form>
            </View>
            <View style = {{flex: 2}}>
            <View style={{ flex: 2,justifyContent: "center", alignItems: "center" }} >
                <BaseButton
                onPress = {function () {
                        firebaseController.loginEmailPassword(email, password)
                            .then(function (userCred) {
                                firebaseController.getUserDisplayNameById(userCred.user.uid)
                                    .then(function (snapshot) {
                                        if (snapshot.empty) {
                                            console.log("User not in database")
                                        } else {
                                            let displayName = snapshot.docs[0].data().userDisplayName
                                            signIn(displayName)
    
                                        }
                                    })
                            })
                            .catch(function (error) {
                                console.log(error)
                            })
                    }
                }
                primary
                style={{ alignContent: "center", justifyContent: "center", width: 100 }} >
                    <Text> Login </Text>
                </BaseButton>
            </View>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
                <Text>New User?</Text>
                <Text style = {{color : "magenta"}}
                onPress = {() =>
                    {
                        navigation.push("SignUpScreen")
                    }
                }
                > Sign Up</Text>
            </View>
            </View>
        </Container>
        </KeyboardAwareScrollView>
    )

}

const styles = StyleSheet.create({
    inputTextStyle:
    {
        fontSize: 25
    }

})