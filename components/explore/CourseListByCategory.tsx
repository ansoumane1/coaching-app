import { View, Text, TouchableOpacity , Image } from 'react-native'
import React, { useEffect } from 'react'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { imageAssets } from '../../constants/Option';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import CourseList from '../home/CourseList';

export default function CourseListByCategory({category}:any) {
    const [courseList, setCourseList] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();

    console.log("category", category);
    useEffect(() => {
        getCourseByCategory();

    }, [category]); // fetch course by category from database
    const getCourseByCategory = async () => {
        // fetch course by category from database
        setCourseList([]);
        setLoading(true);

        const q = query(collection(db, "courses"), where("category", "==", category),);
        const querySnapshot = await getDocs(q);
        querySnapshot?.forEach((doc) => {
            setCourseList((prev)=>[...prev, doc.data()]);
        });
    };
  return (
    <View>
        {courseList?.length > 0 && <CourseList courseList={courseList} heading={category} enrolled={true} />}
    </View>
  )
}

