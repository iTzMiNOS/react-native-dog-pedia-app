import { ActivityIndicator, Dimensions, Image, Linking, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {API} from '@env';

const DeviceWidth = Dimensions.get('window').width;

export default function BreedScreen({route, navigation}) {
    const [breedData, setBreedData] = React.useState(null);

    React.useEffect(() => {
        fetch(`https://api.thedogapi.com/v1/images/search?limit=20&breed_ids=${route.params.breed}&include_breeds=true&api_key=${API}`)
          .then((res) => res.json())
          .then((data) => {
            setBreedData(data);
          })
          .catch((error) => {
            console.error('Error fetching data: ', error);
          });
      }, []);

  return (
    <View>
    {breedData ?
        <View style={{marginTop: 20}}>
            <Text style={{margin: 3, paddingLeft: 20}}>{`My Breed is ${breedData[0].breeds[0].name}.`}</Text>
            <Text style={{margin: 3, paddingLeft: 20}}>{`I Weigh between ${breedData[0].breeds[0].weight.metric} Kilograms.`}</Text>
            <Text style={{margin: 3, paddingLeft: 20}}>{`I am between ${breedData[0].breeds[0].height.metric} Centimeters Tall.`}</Text>
            <Text style={{margin: 3, paddingLeft: 20}}>{`My Characteristics are ${breedData[0].breeds[0].temperament}.`}</Text>
            <Text style={{margin: 3, paddingLeft: 20}}>{`I was initially bred for ${breedData[0].breeds[0].breed_group}.`}</Text>
            <Pressable 
                onPress={() => Linking.openURL(`https://en.wikipedia.org/w/index.php?search=${breedData[0].breeds[0].name}`)}
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
                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        marginBottom: 5,
                        marginTop: 10,
                    }}
                />
            <Text style={{ textAlign: 'center', color: 'black', fontSize: 24, width: '50%', margin: 10, borderRadius: 20, borderWidth: 0}}>My Images :3</Text>
            <ScrollView contentContainerStyle={{paddingBottom: 550 ,alignItems: 'center' }}>
                {breedData.map((item) => (
                    <View key={item.id} style={{ marginBottom: 10 }}>
                    <Pressable onPress={() => navigation.navigate("Image Info", {
                        id: item.id,
                        url: item.url,
                        })}
                        >
                    <Image
                        style={{ width: DeviceWidth * 0.8, height: DeviceWidth * 0.8, borderRadius: 20 }}
                        source={{ uri: item.url }}
                    />
                    </Pressable>
                    </View>
                ))}
            </ScrollView>
            
        </View> :
        <ActivityIndicator size={'large'} color={'blue'} />}
        </View>
  )
}
