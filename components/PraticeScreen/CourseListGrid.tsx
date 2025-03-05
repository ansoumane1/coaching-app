import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { Colors } from '../../constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

export default function CourseListGrid({courseList, option}) {
  const router = useRouter();
  const onPress = (course: any) => {
  
      
      router.push({
        pathname: option?.path,
        params: {
          courseParams: JSON.stringify(course)
        }
      });
      
    
   // console.log('Pressed', item)
  }
  return (
    <View>
     <FlatList 

      data={courseList}
      style={{
        padding: 20,
      }}
      numColumns={2}
      keyExtractor={
        (item, index) => item?.name
      }
      renderItem = {({item, index})=>(
        <TouchableOpacity onPress={()=>onPress(item)} key={index} style={{
            flex:1,
            display:'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 15,
            backgroundColor: Colors.WHITE,
            margin:7,
            borderRadius: 15,
            elevation: 1,
        }}>
            <Ionicons name="checkmark-circle" size={24} color={Colors.GRAY} style={{
                position: 'absolute',
                top: 10,
                right: 20,
            }} />
            <Image source={option?.icon} style={{
            width: '100%',
            height: 70,
            resizeMode: 'contain',
            }} />
            <Text style={{
                fontSize: 16,
                fontFamily: 'outfit',
                textAlign: 'center',
                color: Colors.BLACK,
                marginTop: 8,
            }}>{item?.courseTitle}</Text>
          
        </TouchableOpacity>
      )}
     
     />
    </View>
  )
}