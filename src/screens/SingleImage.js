import { View, Text, Image, StyleSheet, ActivityIndicator, Pressable, Platform, Linking, TouchableOpacity } from 'react-native'
import React from 'react'
import RNFetchBlob from 'rn-fetch-blob';

export default function SingleImage({route}) {
    const [dogData, setDogData] = React.useState(null);

    const url = 'https://www.africau.edu/images/default/sample.pdf';

    React.useEffect(() => {
        fetch(`https://api.thedogapi.com/v1/images/${route.params.id}`)
          .then((res) => res.json())
          .then((data) => {
            setDogData(data);
          })
          .catch((error) => {
            console.error('Error fetching data: ', error);
          });
      }, []);

  return (
    <View style={{justifyContent: 'center', flex: 1}}>
    {dogData ? 
        <View>
            <Image
                key={route.params.id}
                source={{uri: route.params.url}}
                style={{ alignSelf:'center',width: '95%', height: 300, marginVertical: 20, borderWidth: 1, borderRadius: 50, borderColor: 'gray' }}
            />
            <View style={{padding: 20}}>
                <Text style={{margin: 3}}>{`My Breed is ${dogData.breeds[0].name}.`}</Text>
                <Text style={{margin: 3}}>{`I Weigh between ${dogData.breeds[0].weight.metric} Kilograms.`}</Text>
                <Text style={{margin: 3}}>{`I am between ${dogData.breeds[0].height.metric} Centimeters Tall.`}</Text>
                <Text style={{margin: 3}}>{`My Characteristics are ${dogData.breeds[0].temperament}.`}</Text>
                <Text style={{margin: 3}}>{`I was initially bred for ${dogData.breeds[0].breed_group}.`}</Text>
                <Pressable 
                onPress={() => Linking.openURL(`https://en.wikipedia.org/w/index.php?search=${dogData.breeds[0].name}`)}
                style={({ pressed }) => [
                  { opacity: pressed ? 0.7 : 1 }, 
                  { borderRadius:30,
                    marginTop: 20,
                    shadowColor: '#000',
                    backgroundColor: 'purple',
                    margin: 10,
                    padding: 10,
                    width: '40%',
                    alignSelf: 'left',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                    elevation: 5,}]}>
                    <Text style={{textAlign: 'center' ,color: 'white', fontSize: 10}}>Read More About Me</Text>
                </Pressable>
            </View>
        </View>
        :
        <ActivityIndicator size={'large'} color={'blue'} />
    }
    </View>
    
  )
}