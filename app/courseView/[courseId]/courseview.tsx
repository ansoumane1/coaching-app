import { View, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import Intro from "../../../components/courseView/Intro";
import { Colors } from "../../../constants/Colors";
import Chapters from "../../../components/courseView/Chapters";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebaseConfig";

export default function CourseView() {
  const { courseParams, courseId } = useLocalSearchParams();
  const [course, setCourse] = useState<any>([]);

  useEffect(() => {
    if (!courseParams) {
      getCourseById();
    } else {
      setCourse(JSON.parse(courseParams as string));
    }
  }, [courseId]);
  // console.log("this is course id", courseId);
  //const course = JSON.parse(courseParams as string);
  //console.log("this is the course", courseParams);
  const getCourseById = async () => {
    const docRef = await getDoc(doc(db, "courses", courseId));
    const courseR = docRef.data();
    setCourse(courseR);
  };
  return (
    course && (
      <FlatList
        data={[]}
        renderItem={null}
        ListHeaderComponent={() => (
          <View style={styles.container}>
            <Intro course={course} />
            <Chapters course={course} />
          </View>
        )}
      />
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
});
