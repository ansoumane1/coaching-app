import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { UserDetailContext } from '../../context/UserDetailContext';
import { db } from '../../config/firebaseConfig';
import { Colors } from '../../constants/Colors';
import CourseProgress from '../../components/home/CourseProgress';
import CourseProgressCard from '../../components/shared/CourseProgressCard';
import { useRouter } from 'expo-router';

const progress = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    userDetail && GetCourseList();
  }, [userDetail]);

  const GetCourseList = async () => {
    setLoading(true);
    setCourseList([]);
    const q = query(
      collection(db, "courses"),
      where("createdBy", "==", userDetail?.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setCourseList((prev) => [...prev, doc.data()]);
    });
    setLoading(false);
  };
  return (
    <View>
    <Image
      source={require("../../assets/images/wave.png")}
      style={{ position: "absolute", width: "100%", height: 700 }}
      />
      <View style={{ position: "absolute", padding: 25, width: "100%", marginTop: 30 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 25, color: Colors.WHITE, marginBottom:20 }}>
        course Progress
      </Text>
      <FlatList

      data={courseList}
      onRefresh={()=>GetCourseList()}
      refreshing={loading}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => (
          <TouchableOpacity onPress={()=>router.push({
            pathname: `/courseView/${item?.docId}/courseview`,
            params: {
              courseParams: JSON.stringify(item),
            },
          })} key={index} >
          
              <CourseProgressCard item={item} width="96%" />
            
          </TouchableOpacity>
      )}
      
      
      
      />
      </View>
    </View>
  )
}

export default progress