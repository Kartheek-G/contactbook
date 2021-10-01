import React, { useState } from 'react'
import { View, Button, TextInput, Text, ScrollView, StyleSheet, Switch } from 'react-native'
import firebase from "../database/firebase";

const CreateContact = (props) => {

    const initialState = {
        name:"",
        mobile:"",
        landline:"",
    };

    const [state, setState] = useState(initialState);

    const handleChangeText = (value, name) => {
      setState({ ...state, [name]: value });
    };

    const saveNewContact = async () => {
        if (state.name === "") {
          alert("please provide a name");
        } else {
    
          try {
            await firebase.db.collection("contacts").add({
              name: state.name,
              mobile: state.mobile,
              landline: state.landline,
            });
    
            props.navigation.navigate("Contacts List");
          } catch (error) {
            console.log(error)
          }
        }
      };


  

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput 
                placeholder="Name" 
                onChangeText={(value) => handleChangeText(value, "name")}
                value={state.name}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput 
                placeholder="Mobile Number"
                onChangeText={(value) => handleChangeText(value, "mobile")}
                value={state.mobile}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput 
                placeholder="Landline Number"
                onChangeText={(value) => handleChangeText(value, "landline")}
                value={state.landline}
                />
            </View>
            
            <View>
                <Button title="Save Contact" 
                onPress={() => saveNewContact()}
                />
            </View>
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,

    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'

    },
    loader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
      },
      switch: {
        flex: 1,
      }
})

export default CreateContact
