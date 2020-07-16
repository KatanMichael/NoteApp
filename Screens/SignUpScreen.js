import React, { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, Text, Button, TextInput, Image } from 'react-native'
import { AppContext } from '../Context/AppContext'
import FirebaseController from '../Controllers/FirebaseController'
import { Container, Header, Content, View, Form, Item, Input, Label, Button as BaseButton, Card, Icon,Toast } from 'native-base';
import {KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

const firebaseController = new FirebaseController();

    

export default function SignUpScreen({ navigation }) {


    const { signIn } = React.useContext(AppContext)
    
    const [showPassowrd, setShowPassword] = useState(true)
    const [passowrdIcon, setPassowrdIcon] = useState("eye-off")
    const [password, setPassword] = useState("")

    const [showVerPassword, setShowVerPassword] = useState(true)
    const [verPasswordIcon, setVerPassowrdIcon] = useState("eye-off")
    const [verPassowrd, setVerPassword] = useState("")

    const [email, setEmail] = useState("")
    const [fullName, setName] = useState("")

    const [showToast, setShowToast] = useState(false)

    return (
        <KeyboardAwareScrollView>
            <Container style = {{flex: 1}}>
            <View style={{ flex: 2, justifyContent: "flex-start", alignItems: "center", }}>
                <Image source={require("../Assests/logo.png")} style={{ width: 250, height: 250 }} />
            </View>
            <View style={{ flex: 3, alignContent: "center", margin: 15, top: 40}}>
                <Card>
                <Form>
                <Item fixedLabel>
                        <Label style = {styles.lablelText}>Full Name</Label>
                        <Input 
                        keyboardType="email-address" 
                        onChangeText = {function(text)
                        {
                            setName(text)
                        }}
                        />
                    </Item>
                    <Item fixedLabel>
                        <Label style = {styles.lablelText}>Email</Label>
                        <Input
                        keyboardType="email-address" 
                        onChangeText = {function(text)
                        {
                            setEmail(text)
                        }}
                        />
                    </Item>
                    <Item fixedLabel>
                        <Label style = {styles.lablelText}>Password</Label>
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
                    <Item>
                        <Label style = {styles.lablelText}>Confirm Password</Label>
                        <Input secureTextEntry = {showVerPassword}
                        onChangeText = {function(text)
                        {
                            setVerPassword(text)
                        }}
                        />
                        <Icon name={verPasswordIcon} onPress={() => 
                            {
                                setShowVerPassword(!showVerPassword)
                                if(showVerPassword)
                                {
                                    setVerPassowrdIcon("eye")
                                }else{
                                    setVerPassowrdIcon("eye-off")
                                }
                            }
                        } />
                    </Item>
                </Form>
                </Card>
            </View>
            <View style = {{flex: 1, justifyContent: "center"
                            , alignItems: "center"}}>
            <BaseButton style = {{ alignContent: "center", justifyContent: "center", width: 100 }}
            onPress = {()=> {
                if(verPassowrd !== password)
                {
                    alert("Passwords Don't Match")    

                }else{
                    submitForm(email,password,fullName,signIn)
                }
            }}
            >
                <Text>Submit</Text>
            </BaseButton>
            </View>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
                <Text>Already have an account?</Text>
                <Text style = {{color : "magenta"}}
                onPress = {() =>
                    {
                        navigation.pop()
                    }
                }
                > Sign in</Text>
            </View>
            </Container>

        </KeyboardAwareScrollView>
    )

}

function submitForm(email, passowrd,name,signIn)
{
    firebaseController.registerNewUser(email,passowrd)
    .then((userCred) => {
        firebaseController.addUserToDatabase({userDisplayName: name, userEmail: email, userId: userCred.user.uid})
        .then((docRef) => {signIn(name)})
        .catch((error) => {alert(error)})

    })
    .catch((error) => {alert(error)})

}


const styles = StyleSheet.create({
    inputTextStyle:
    {
        fontSize: 25
    },
    lablelText:
    {
        fontWeight: "bold",
        fontSize: 15
    }
})