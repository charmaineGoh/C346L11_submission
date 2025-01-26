import React, { useState } from 'react';
import { StatusBar, View, Button, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';

const Add = ({ navigation, route }) => {
    const [name, setName] = useState("");

    return (
        <View style={styles.container}>
            <StatusBar />
            <Text style={styles.label}>Enter Name:</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setName(text)}
                placeholder="Enter item name"
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    let mydata = JSON.parse(route.params.datastr);
                    let item = { name: name };
                    mydata.push(item);
                    fetch("https://jsonhost.com/json/5cbce3c27be6ca673be16d26af1051c0", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': '5cbce3c27be6ca673be16d26af1051c0'
                        },
                        body: JSON.stringify(mydata)
                    })
                        .then((response) => {
                            if (response.ok) {
                                navigation.navigate("Home");
                            } else {
                                Alert.alert("Error", "Failed to add data.");
                            }
                        })
                        .catch((error) => {
                            Alert.alert("Error", "Network error: " + error.message);
                        });
                }}
            >
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
        color: '#34495e',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#27ae60',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Add;
