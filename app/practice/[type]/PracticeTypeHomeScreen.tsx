import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { PraticeOption } from "../../../constants/Option";
import { Colors } from "../../../constants/Colors";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function PracticeTypeHomeScreen() {
  const {type} = useLocalSearchParams();
  const option = PraticeOption.find((item)=> item.name === type);
  const router = useRouter();
  return (
    <View>
      
        <Image source={option.image} style={{
          width: "100%",
          height: 200,
          resizeMode: "cover",
        }}/> 
        <View style={{position: 'absolute', top:20, flexDirection:'row', alignItems:'center', gap:10, paddingHorizontal:10}}>
          <Pressable onPress={()=>router.back()}>
        <Ionicons name="arrow-back" size={24} style={{
          backgroundColor: Colors.WHITE,
          padding:8,
          borderRadius:12, 
        }} />
        </Pressable>
          <Text style={{fontFamily:'outfit-bold', fontSize:35, color:Colors.WHITE}}>{type}</Text>
        </View>
      
      
        
    </View>
  );
}
