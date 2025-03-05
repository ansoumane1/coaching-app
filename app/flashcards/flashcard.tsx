import { View, Text, Pressable, FlatList, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import FlipCard from 'react-native-flip-card';
import * as Progress from 'react-native-progress';

export default function flashcard() {
  const {courseParams} = useLocalSearchParams();
  const course = JSON.parse(courseParams as string);
  const flashCard = course?.flashcards;
  //console.log('FlashCard', flashCard);
  const [currentPage, setCurrentPage] = React.useState(0);
  const  router = useRouter();
  const width = Dimensions.get('screen').width;

  const onScroll = (event: any)=>{
    const contentOffsetX = event?.nativeEvent?.contentOffset?.x;
    const index = Math.floor(contentOffsetX / width);
    setCurrentPage(index);
  };
  const flashProgress= (currentPage: any)=>{
    const perc = currentPage/flashCard?.length;
    return perc;
  };

  return (
    <View>
      <Image source={require('../../assets/images/wave.png')} style={{
        width: '100%',
        height: 800,
       
      }} />
    <View style={{
      position:'absolute',
      width:'100%',
      padding:25,
    }}>
    <View style={{
          flexDirection:'row',
          justifyContent:'space-between',
          alignItems: 'center',
        }}>
          <Pressable onPress={()=>router.back()}>
            <Ionicons name="arrow-back" size={24} color={Colors.WHITE} style={{}} />
          </Pressable>
          <Text style={{fontFamily:'outfit-bold', fontSize:25, color:Colors.WHITE}}>{currentPage +1 } of {flashCard?.length}</Text>
        </View>
                <View style={{
                  marginTop: 20,
                }}>
                <Progress.Bar progress={flashProgress(currentPage)} width={Dimensions.get('window').width*0.85} color={Colors.WHITE} height={10} />
                
                </View>
        <FlatList
    data={flashCard}
    horizontal={true}
    pagingEnabled={true}
    showsHorizontalScrollIndicator={false}
    onScroll={onScroll}
    renderItem={({item, index})=>(
      <View style={{
        width: width * 0.9,
        height:500,
        padding: 20,
        marginTop: 60,
      }}>
       <FlipCard style={styles.flipcard}>
  {/* Face Side */}
  <View style={styles.frondCard}>
    <Text style={{
      fontSize: 25,
      fontFamily: 'outfit-bold',
    
    }}>{item?.front}</Text>
  </View>
  {/* Back Side */}
  <View style={styles.backCard}>
    <Text
    style={{
      fontSize: 25,
      fontFamily: 'outfit-bold',
      width: width * 0.78,
      color: Colors.WHITE,
      textAlign: 'center',
      padding: 20,
    }}
    >{item?.back}</Text>
  </View>
</FlipCard>
      </View>
    )}
     />
    </View>

    </View>
  )
}

const styles = StyleSheet.create({
  flipcard: {
    width: Dimensions.get('screen').width* 0.78,
    height: 400,
    backgroundColor: Colors.WHITE,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: Dimensions.get('screen').width * 0.05,
    elevation: 1,
  },
  frondCard: {

    height: '100%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backCard: {
    
    height: '100%',
    borderRadius: 20,

    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
})