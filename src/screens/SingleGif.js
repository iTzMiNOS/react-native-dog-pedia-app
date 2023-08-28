import { View, Text, Image, StyleSheet, ActivityIndicator, Pressable, Platform, Linking, TouchableOpacity, Button } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'; 
import RNFetchBlob from 'rn-fetch-blob';

export default function SingleGif({route}) {
    const [gifData, setGifData] = React.useState(null);

    React.useEffect(() => {
        fetch(`https://api.thedogapi.com/v1/images/${route.params.id}`)
          .then((res) => res.json())
          .then((data) => {
            setGifData(data);
          })
          .catch((error) => {
            console.error('Error fetching data: ', error);
          });
      }, []);
      
      downloadImg = async () => {
        const {config, fs} = RNFetchBlob;
        const download= fs.dirs?.DownloadDir;
        return config({
          fileCache: true,
          addAndroidDownloads:{
            useDownloadManager: true,
            notification: true,
            path:"/storage/emulated/0/Download"+"/"+`dogpedia-${gifData.url.split('images/').pop()}`,
          }
        })
        .fetch("GET", gifData.url)
        .then((res) => {
          console.log(res)
        })
        .catch((e) => {
          console.log(e)
        })
      }


  return (
    <View style={{justifyContent: 'center', flex: 1}}>
    {gifData ? 
        <View>
            <Image
                key={route.params.id}
                source={{uri: route.params.url}}
                style={{ alignSelf:'center',width: '95%', height: 300, marginVertical: 20, borderWidth: 1, borderRadius: 50, borderColor: 'gray' }}
            />
            <View style={{padding: 20}}>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity style={{alignItems: 'center', borderRadius: 30, backgroundColor: '#DDDDDD', padding: 10, width: 50, height: 40, marginTop: 16}} onPress={() => downloadImg()} >
                <MaterialIcons name="file-download" size={24} color="black" />
                </TouchableOpacity>
                </View>
            </View>
            
        </View>
        :
        <ActivityIndicator size={'large'} color={'blue'} />
    }
    </View>
    
  )
}