import { View, Text, Image, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import Button from '../../components/shared/Button';

export default function summary() {
    const { quizResultParams } = useLocalSearchParams();
    const quizResult = JSON.parse(quizResultParams as string);
    const [correctAns, setCorrectAns] = React.useState(0);
    const [totalQuestion, setTotalQuestion] = React.useState(0);
    
    const router = useRouter();

    React.useEffect(()=>{
        calculateResult();
    }, [])
    const calculateResult = ()=>{
        if(quizResult !== undefined){
            const correctAns_ = Object.entries(quizResult)?.filter(([key, value])=>value?.isCorrect == true);
            
            const totalQuestion_ = Object.entries(quizResult)?.length;
            setCorrectAns(correctAns_.length);
            setTotalQuestion(totalQuestion_);
            
        }
    }
    const getPerMark = ()=>{
        if(totalQuestion === 0) return 0;
        return Math.round((correctAns/totalQuestion)*100);
    }
  return (
   <FlatList 
   data={[]}
   renderItem={null}
   ListHeaderComponent={()=>(
    <View>
    <Image source={require('../../assets/images/wave.png')} style={{
        width: '100%',
        height: 800,
        
    }}/>
  <View style={{
    position: 'absolute',
    width:'100%',
    padding:35,
  }}>
    <Text
    style={{
        fontSize: 30,
        fontFamily: 'outfit-bold',
        textAlign: 'center',
        color: Colors.WHITE,
    }}
    
    >Quiz Summary</Text>
    <View style={{
        backgroundColor: Colors.WHITE,
        padding: 20,
        marginTop:60,
        borderRadius: 20,
        alignItems: 'center',
    }}>
        <Image source={require('../../assets/images/trophy.png')} style={{
            width: 100,
            height: 100,
            
            marginTop: -60,
        }} />

        <Text style={{
            fontSize: 26,
            fontFamily: 'outfit-bold',
        }}>
            {
                getPerMark() >= 60 ? 'Congratulations!' : 'Try Again!'
            }
           
        </Text>
        <Text style={{
            fontSize: 17,
            fontFamily: 'outfit',
            textAlign: 'center',
            color: Colors.GRAY,
            marginTop: 10,
        }}>
            You gave {getPerMark()}% correct answers
            </Text>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop:7
            }}>
                <View style={styles.resultTextContainer}>
                    <Text style={styles.resultText}>Q {totalQuestion}</Text>
                
                </View>
                <View style={styles.resultTextContainer}>
                <Text style={styles.resultText}>✅ {correctAns} </Text>
                
                </View>
                
                <View style={styles.resultTextContainer}>
                <Text style={styles.resultText}>❌ {totalQuestion - correctAns}</Text>
                </View>
            </View>
    </View>
    <Button text="Back To Home" onPress = {()=>router.replace('/(tabs)/home')} />
        <View style={{
            marginTop: 20,
            
            flex:1,
        }}>
            <Text style={{
                fontSize: 20,
                fontFamily: 'outfit-bold',
                marginBottom: 5,
            }}>Summary:</Text>
            <FlatList
            data={Object.entries(quizResult)}
            keyExtractor={(_, index) => index.toString()}
            renderItem = {({item})=>{
                const quizItem = item[1];
                return (
                    <View style={{
                        padding:12,
                        borderWidth:1,
                        borderRadius:15,
                        marginTop: 10,
                        backgroundColor: quizItem?.isCorrect == true ? Colors.LIGHT_GREEN : Colors.LIGHT_RED,
                        borderColor: quizItem?.isCorrect == true ? Colors.GREEN : Colors.RED ,
                    }}>
                        <Text style={styles.resultText}>{quizItem?.question}</Text>
                        <Text style={{
                            fontFamily: 'outfit',
                            fontSize: 18,
                            color: Colors.GRAY,
                            marginTop: 5,
                        }}> Ans: {quizItem?.correctAns}</Text>
                    </View>
                )
            }}
            
            />
        </View>
  </View>
</View>
   )}
   
   />
  )
}

const styles = StyleSheet.create({
    resultTextContainer:{
        padding:7,
        backgroundColor: Colors.WHITE,
        elevation:1
    },
    resultText: {
        fontFamily: 'outfit',
        fontSize: 20,
    }
});