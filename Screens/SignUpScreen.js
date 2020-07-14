import React, { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, Text, Button, TextInput } from 'react-native'
import { AppContext } from '../Context/AppContext'
import FirebaseController from '../Controllers/FirebaseController'

const firebaseController = new FirebaseController();

export default function SignUpScreen({ navigation }) {

    let email = ""
    let password = ""
    let verifyPassword = ""
    let displayName = ""

    const { signIn } = React.useContext(AppContext)
    return (
        <SafeAreaView>
            <Text>Welcome To SignUp Screen</Text>

            <TextInput style={styles.inputTextStyle}
                placeholder="Enter Email"
                textContentType="emailAddress"
                onChangeText={(text) => { email = text }}
            />
            <TextInput style={styles.inputTextStyle}
                placeholder="Enter Display Name"
                onChangeText={(text) => { displayName = text }}
            />

            <TextInput style={styles.inputTextStyle}
                placeholder="Enter Password"
                textContentType="password"
                secureTextEntry={true}
                onChangeText={(text) => { password = text }}
            />
            <TextInput style={styles.inputTextStyle}
                placeholder="Enter Password Again"
                textContentType="password"
                secureTextEntry={true}
                onChangeText={(text) => { verifyPassword = text }}
            />
            <Button
                title="Click To Submit"
                onPress={function () {
                    if (displayName !== "") {
                        if (verifyPassword == password) {
                            firebaseController.registerNewUser(email, password)
                                .then(function (userCred) {

                                    const user = {
                                        userId: userCred.user.uid,
                                        userDisplayName: displayName,
                                        userEmail : userCred.user.email
                                    }

                                   firebaseController.addUserToDatabase(user)
                                   .then(function(docRef)
                                   {
                                        signIn(user.userDisplayName)
                                   })
                                   .catch(error)
                                   {
                                       console.log(error)
                                   }
                                })
                                .catch((error) =>
                                {
                                    console.log(error)
                                })
                        } else {
                            console.log("Passwords Not Matched")
                        }
                    } else {
                        console.log("Display Name Cannot be empty")
                    }
                }}
            />
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    inputTextStyle:
    {
        fontSize: 25
    }

})