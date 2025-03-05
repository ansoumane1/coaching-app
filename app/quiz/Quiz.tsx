import { View, Text, Image, Pressable, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import * as Progress from 'react-native-progress';
import { useRouter } from 'expo-router';
import Button from '../../components/shared/Button';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

export default function Quiz() {
  const {courseParams} = useLocalSearchParams();
  const [currentPage, setCurrentPage] = React.useState(0);
  const course = JSON.parse(courseParams as string);
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [answers, setAnswers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  //console.log('Course', course);
  const quiz = course?.quiz;
  const router = useRouter();
  const quizProgress= (currentPage: any)=>{
    const perc = currentPage/quiz?.length;
    return perc;
  }

  const onOptionSelected = (selectedChoice: any) => {
    setAnswers(prev=>({
      ...prev,
      [currentPage]: {
        userChoice: selectedChoice  ,
        isCorrect: quiz[currentPage]?.correctAns == selectedChoice,
        question: quiz[currentPage]?.question,
        correctAns: quiz[currentPage]?.correctAns

      }
    }));
   // console.log('Answers', answers);
  }

  const onQuizFinish = async () => {
    // save the result in database
    setLoading(true);
    try{
    await updateDoc(doc(db, 'courses', course.docId),{
      quizResult: answers,
  
    } );
    setLoading(false);
    router.replace( {
      pathname: '/quiz/summary',
      params: {
        quizResultParams: JSON.stringify(answers)
      }});
  }catch(e){
    setLoading(false);
  }
    // redirect user to Quiz summary
  }
  return (
    <View>
     
      <Image source={require('../../assets/images/wave.png') } style={{
        width: '100%',
        height: 800,
      }} />
       <View style={{
        position: 'absolute',
        padding:25,
        width: '100%',
       }}>
        <View style={{
          flexDirection:'row',
          justifyContent:'space-between',
          alignItems: 'center',
        }}>
          <Pressable onPress={()=>router.back()}>
            <Ionicons name="arrow-back" size={24} color={Colors.WHITE} style={{}} />
          </Pressable>
          <Text style={{fontFamily:'outfit-bold', fontSize:25, color:Colors.WHITE}}>{currentPage +1 } of 5</Text>
        </View>
        <View style={{
          marginTop: 20,
        }}>
        <Progress.Bar progress={quizProgress(currentPage)} width={Dimensions.get('window').width*0.85} color={Colors.WHITE} height={10} />
        
        </View>
        <View style={{
          marginTop: 30,
          backgroundColor: Colors.WHITE,
          width: '100%',
          height: Dimensions.get('window').height*0.6,
          borderRadius: 15,
          padding: 20,
          elevation: 1,
        }}>
          <Text style={{
            fontFamily: 'outfit-bold',
            fontSize: 20,
            color: Colors.BLACK,
           textAlign: 'center',
          }}>{
            quiz[currentPage]?.question
            }</Text>
            {
              quiz[currentPage]?.options.map((option, index) => (
                <TouchableOpacity onPress={()=>{setSelectedOption(option);onOptionSelected(option); }} key={index} style={{
                  marginTop: 10,
                  padding: 15,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor:Colors.GRAY,
                  backgroundColor: selectedOption === option? Colors.LIGHT_GREEN : null,
                  justifyContent: 'center',
               
                }}>
                  <Text style={{
                    fontFamily: 'outfit',
                    fontSize: 16,
                    color: Colors.BLACK,
                  }}>{option}</Text>

                </TouchableOpacity>
              ))
            }
        </View>
       { (selectedOption?.toString() && quiz?.length - 1 > currentPage)&& <Button text="Next" onPress={()=>{ setCurrentPage(currentPage + 1); setSelectedOption(null);}} />}
        { (selectedOption?.toString() && quiz?.length - 1 === currentPage)&& <Button text="Finish" onPress={()=> onQuizFinish()} loading={loading} />}
       </View>
    </View>
  )
}