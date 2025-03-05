import { View, Text, Image, Platform, FlatList, Pressable } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function QuestionAnswer() {
    const {courseParams} = useLocalSearchParams();
    const course = JSON.parse(courseParams as string);
    const qaList = course?.qa;
    const [selectedOption, setSelectedOption] = React.useState(null);
    //console.log('QA', qaList);
    const router = useRouter();

    const onOptionSelected = (index: any) => {
        if(selectedOption === index){
            setSelectedOption(null);
        }else{
            setSelectedOption(index);
        }
    };
  return (
    <View>
     <Image source={require('../../assets/images/wave.png')} style={{
        width: '100%',
        height: 800,
     }} />
     <View style={{
        marginTop: Platform.OS === 'ios' ? 35: 20,
        position: 'absolute',
        padding:25,
        width: "100%",
     }}>
        <View style={{
            flexDirection: 'row',
            gap:7,
            alignItems: 'center',
        }}>
        <Pressable onPress={()=>router.back()}>
            <Ionicons name="arrow-back" size={24} color={Colors.WHITE} style={{}} />
          </Pressable>
        <Text style={{
            fontFamily: 'outfit-bold',
            fontSize: 28,
            color: Colors.WHITE,
            textAlign: 'center',
        }}>
            Questions & Answers
        </Text>
        </View>
        <Text style={{ 
            fontFamily: 'outfit',
            fontSize: 22,
            color: Colors.WHITE,
            textAlign: 'center',
        }}>{course?.courseTitle}</Text>

        <FlatList
         data = {qaList}
         renderItem={({item, index})=>(
           <Pressable onPress={()=>onOptionSelected(index)} style={styles?.card}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 18,
            
            }}>{item?.question}</Text>
            {
                selectedOption === index && (
                    <View style ={{
                        borderTopWidth: 0.5,
                        borderColor: Colors.GRAY,
                        marginVertical: 10,
                    }}>
                          <Text  style={{
                        fontFamily: 'outfit',
                        fontSize: 17,
                        marginTop: 10,
                        color: Colors.GRAY
                    }}>
                       Answer: {item?.answer}  
                    </Text>
                    </View>
                  )
            }
           </Pressable >
         )}
        />

     </View>
    </View>
  )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.WHITE,
        padding: 15,
        marginTop: 10,
        borderRadius: 20,
        elevation: 1,
    }
})