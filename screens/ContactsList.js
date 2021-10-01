import React, { useEffect, useState } from 'react'
import { Button, StyleSheet,ScrollView, View} from 'react-native'
import { ListItem, Avatar, Icon} from "react-native-elements";
import { IconButton } from 'react-native-paper';

import firebase from "../database/firebase";


const ContactsList = (props) => {

    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        firebase.db.collection("contacts").onSnapshot((querySnapshot) => {
          const contacts = [];
          querySnapshot.docs.forEach((doc) => {
            const { name, mobile, landline } = doc.data();
            contacts.push({
              id: doc.id,
              name,
              mobile,
              landline,
            });
          });
          setContacts(contacts);
        });
      }, []);

    return (
        <ScrollView>
          <View style={{ flexDirection:"row" }}>
          <Button
            title="Add Contact"
            style={styles.buttonStyle}
            onPress={() => props.navigation.navigate("Create Contact")}/>
            <Button
            style={styles.buttonStyle}
            title="Favorite Contacts"
            onPress={() => props.navigation.navigate("Favorites")}/>
          </View>
          
 
        {
            contacts.map(contact => {
                return (
                    <ListItem
                     key={contact.id}
                     bottomDivider
                     onPress={() => {
                     props.navigation.navigate("Contact Details", {
                     contactId: contact.id,
                     });}}>
                        <ListItem.Chevron/>
                        <Avatar
                         source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6tT0y827iUlT6zwesRThwr3buq9OZO7JIX_E2kAnk5MYRBciIQDomVicKpwf4bkU07Uc&usqp=CAU"}}
                         rounded/>
                        <ListItem.Content>
                           <ListItem.Title>{contact.name}</ListItem.Title>
                        </ListItem.Content>
                        <IconButton icon="phone" style={{paddingRight: 5, fontSize: 30}} />
                    </ListItem>
                )
            })

        }

        </ScrollView>
    )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    justifyContent:'space-between',
  },
  button: {
    backgroundColor: 'green',
    width: '50%',
    height: 40
  },
  buttonStyle: {
    marginHorizontal: 20,
    marginTop: 5
  }
})

export default ContactsList
