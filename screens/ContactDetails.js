import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Button,
  View,
  Alert,
  ActivityIndicator,
  StyleSheet,
  TextInput,
} from "react-native";


import firebase from "../database/firebase.js";

const ContactDetails = (props) => {

    const initialState = {
        id: "",
        name: "",
        mobile: "",
        landline: "",
      };

      const [contact, setContact] = useState(initialState);
      const [loading, setLoading] = useState(true);

      const handleTextChange = (value, prop) => {
      setContact({ ...contact, [prop]: value });
      };

      const getContactById = async (id) => {
        const dbRef = firebase.db.collection("contacts").doc(id);
        const doc = await dbRef.get();
        const contact = doc.data();
        setContact({ ...contact, id: doc.id });
        setLoading(false);
      };


      const deleteContact = async () => {
        setLoading(true)
        const dbRef = firebase.db
          .collection("contacts")
          .doc(props.route.params.contactId);
        await dbRef.delete();
        setLoading(false)
        props.navigation.navigate("Contacts List");
      };

      const confirmationAlert = () => {
        Alert.alert(
          "Removing the Contact",
          "Are you sure?",
          [
            { text: "Yes", onPress: () => deleteContact() },
            { text: "Cancel", onPress: () => console.log("canceled") },
          ],
          {
            cancelable: true,
          }
        );
      };

      const updateContact = async () => {
        const contactRef = firebase.db.collection("contacts").doc(contact.id);
        await contactRef.set({
          name: contact.name,
          mobile: contact.mobile,
          landline: contact.landline,
        });
        setContact(initialState);
        props.navigation.navigate("Contacts List");
      };

      useEffect(() => {
        getContactById(props.route.params.contactId);
      }, []);
    
      if (loading) {
        return (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#9E9E9E" />
          </View>
        );
      }

      return (
        <ScrollView style={styles.container}>
          <View>
            <TextInput
              placeholder="Name"
              autoCompleteType="username"
              style={styles.inputGroup}
              value={contact.name}
              onChangeText={(value) => handleTextChange(value, "name")}
            />
          </View>
          <View>
            <TextInput
              autoCompleteType="tel"
              placeholder="Mobile Number"
              style={styles.inputGroup}
              value={contact.mobile}
              onChangeText={(value) => handleTextChange(value, "mobile")}
            />
          </View>
          <View>
            <TextInput
              placeholder="Landline Number"
              autoCompleteType="tel"
              style={styles.inputGroup}
              value={contact.landline}
              onChangeText={(value) => handleTextChange(value, "landline")}
            />
          </View>
          <View style={styles.btn}>
            <Button
              title="Delete"
              onPress={() => deleteContact()}
              color="#E37399"
            />
          </View>
          <View>
            <Button title="Update" onPress={() => updateContact()} color="#19AC52" />
          </View>
        </ScrollView>
      );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 35,
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
    inputGroup: {
      flex: 1,
      padding: 0,
      marginBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#cccccc",
    },
    btn: {
      marginBottom: 7,
    },
  });



export default ContactDetails
