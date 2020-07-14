import React, { useState, useEffect } from 'react'
import { SafeAreaView, Text, Button } from 'react-native'
import { AppContext } from '../Context/AppContext'

export default function MainScreen(props) {

    const {name} = props
    const {signIn} = React.useContext(AppContext)

    return (
        <SafeAreaView>
            <Text>Welcome To Main Screen {name} </Text>
            <Button
            title = "Log out"
            onPress = {function()
            {
                signIn(null)
            }}
            />
        </SafeAreaView>
    )

}