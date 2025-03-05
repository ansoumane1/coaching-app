import { View, Text, Image, Pressable, ActivityIndicator } from "react-native";
import React, { useContext, useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { PraticeOption } from "../../../constants/Option";
import { Colors } from "../../../constants/Colors";
import Ionicons from '@expo/vector-icons/Ionicons';
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../../config/firebaseConfig";
import { UserDetailContext } from "../../../context/UserDetailContext";
import CourseListGrid from "../../../components/PraticeScreen/CourseListGrid";

export default function PracticeTypeHomeScreen() {
  const {type} = useLocalSearchParams();
  const option = PraticeOption.find((item)=> item.name === type);
  const router = useRouter();
  const {userDetail, setUserDetail } = useContext(UserDetailContext);

  const [loading, setLoading] = React.useState(false);
  const [courseList, setCourseList] = React.useState([]);
  useEffect(() => {
    userDetail && GetCourseList();
 
  
  }, [userDetail]);

  const GetCourseList = async () => {
    setLoading(true);
    setCourseList([]);
    try {
      // Get courses created by user
    const q = query(collection(db, "courses"), where('createdBy', '==',userDetail?.email), orderBy('createdOn', 'desc'));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc)=>{
      //console.log(doc.data());
      // Add course to user's course list
      setCourseList((prev)=>[...prev,doc.data()]);
    })
    setLoading(false);
    } catch (error) {
      console.log(error);
    }finally {
      setLoading(false);
    }
   
  }
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
      
      {
        loading && <ActivityIndicator
        size="large"
        color={Colors.PRIMARY}
        style={{
          marginTop:20,
        }}
        />
      }
      <CourseListGrid courseList={courseList} option={option}/>
    </View>
  );
}
