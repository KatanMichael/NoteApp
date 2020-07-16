import React from "react"
import { StyleSheet } from "react-native"
import { View, Text, Card, CardItem, Left, Body, Header } from "native-base"

export default function NoteComp(props) {

    const cardData = {
        title: "Aenean at",
        data: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: "1/2/14"
    }

    return (
        <Card style={styles.cardStyle}>
            <CardItem bordered>
                <View style = {{flex: 1}}>
                    <Text style = {{opacity: 0.5}}>
                        {cardData.date}
                    </Text>
                    <Text style = {{marginTop: 10}}>
                        {cardData.title}
                    </Text>
                </View>
            </CardItem>
            <CardItem>
                <Text>
                    {cardData.data}
                </Text>
            </CardItem>

        </Card>
    )

}

const styles = StyleSheet.create({
    cardStyle:
    {
        margin: 15
    }

})