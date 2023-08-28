import { View, Text, StyleSheet, ScrollView, Image, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import {API} from '@env';
import { Dropdown } from 'react-native-element-dropdown';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 


export default function HomeScreen({navigation}) {
    const [dogs, setDogs] = React.useState([]);
    const [breeds, setBreeds] = React.useState([]);
    const [refresh, setRefresh] = React.useState(true);
    const [value, setValue] = React.useState(null);
    const [id, setId] = React.useState(null);
    const [isFocus, setIsFocus] = React.useState(false);

    const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: 'purple' }]}>
            Search by Breed
          </Text>
        );
      }
      return null;
    };

    React.useEffect(() => {
        fetch(`https://api.thedogapi.com/v1/images/search?limit=25&has_breeds=true&api_key=${API}`)
            .then((res) => res.json())
            .then(data => {
              setDogs(data);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
            }); 
    },[refresh]);

    React.useEffect(() => {
      fetch(`https://api.thedogapi.com/v1/breeds`)
          .then((res) => res.json())
          .then(data => {
            setBreeds(
              data.map(item => ({
                label: item.name,
                value: item.name,
                id: item.id
              }))
            );
            
          })
          .catch((error) => {
              console.error('Error fetching data: ', error);
          }); 
    },[]);
    
    const toggleRef = () => {
      setRefresh(refresh => !refresh);
    }
    
    return (
      <View>
        <Text style={styles.title}>Welcome to DogPedia :3</Text>
        <View
            style={{
                borderBottomColor: 'black',
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginBottom: 10,
            }}
        />
        <View  style={{justifyContent: 'center'}}>
        {dogs ?
        <ScrollView style={styles.scrollView} horizontal={true}>
            {dogs.map((item) => (
              <Pressable key={item.id} onPress={() => navigation.navigate("Image Info", {
                id: item.id,
                url: item.url,
                })}
                >
                <Image
                source={{uri: item.url}}
                style={{
                  width: 80,
                  height: 80,
                  marginHorizontal: 10,
                  marginVertical: 10,
                  borderWidth: 1,
                  borderRadius: 25,
                  borderColor: 'gray'
                }}
                />
              </Pressable>
            ))
            }
        </ScrollView>
        :<View>
        <ActivityIndicator size={'large'} color={'blue'} />
        </View>
        }
        </View>
        <Pressable style={({ pressed }) => [
                  { opacity: pressed ? 0.7 : 1 }, 
                  {borderRadius:30,
                    shadowColor: '#000',
                    backgroundColor: 'purple',
                    margin: 10,
                    padding: 10,
                    width: '40%',
                    alignSelf: 'center',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                    elevation: 5,}]} onPress={toggleRef}>
          <Text style={{textAlign: 'center' ,color: 'white', fontSize: 24}}>Refresh</Text>
        </Pressable>
        <View
            style={{
                borderBottomColor: 'black',
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginTop: 10,
                marginBottom: 10,
            }}
        />
        <View style={styles.container}>
          {renderLabel()}
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'purple' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={breeds}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select Breed' : '...'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setId(item.id);
              setIsFocus(false);
            }}
            renderLeftIcon={() => (
              <MaterialCommunityIcons
                style={styles.icon}
                color={isFocus ? 'purple' : 'black'}
                name="dog"
                size={35}
              />
            )}
          />
        </View>
        <Pressable style={({ pressed }) => [
                  { opacity: pressed ? 0.7 : 1 }, 
                  {borderRadius:30,
                    shadowColor: '#000',
                    backgroundColor: 'purple',
                    margin: 10,
                    padding: 10,
                    width: '40%',
                    alignSelf: 'center',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                    elevation: 5,}]} 
                    onPress={() => navigation.navigate("Breed Info", {
                      breed: id,
                    })}
                    >
          <Text style={{textAlign: 'center' ,color: 'white', fontSize: 24}}>Show me</Text>
        </Pressable>
        <View
            style={{
                borderBottomColor: 'black',
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginTop: 10,
                marginBottom: 10,
            }}
        />
      </View>
    );
  }


  const styles = StyleSheet.create({
    container: {
      padding: 16,
    },
    dropdown: {
      height: 60,
      borderColor: 'gray',
      borderWidth: 0.5,
      backgroundColor: 'white',
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    title: {
      fontSize: 25,
      color: 'black',
      margin: 5,
      padding: 20,
      textAlign: 'center',
      textAlignVertical: 'center',
    },
    text: {
        fontSize: 42,
    },
  })