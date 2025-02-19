import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/home/Header";
import { Colors } from "../../constants/Colors";
import NoCourse from "../../components/home/NoCourse";
import { UserDetailContext } from "../../context/UserDetailContext";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import CourseList from "../../components/home/CourseList";
import PracticeSection from "../../components/home/PracticeSection";
import CourseProgress from "../../components/home/CourseProgress";

const home = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(false);

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
    <FlatList
      data={[]}
      onRefresh={GetCourseList}
      refreshing={loading}
      renderItem={null}
      ListHeaderComponent={() => (
        <View>
          <Image
            source={require("../../assets/images/wave.png")}
            style={{ position: "absolute", width: "100%", height: 700 }}
          />
          <View style={styles.container}>
            <Header />

            {courseList.length === 0 ? (
              <NoCourse />
            ) : (
              <>
                <CourseProgress courseProgress={courseList} />
                <PracticeSection />
                {courseList.length > 0 && (
                  <CourseList courseList={courseList} />
                )}
              </>
            )}
          </View>
        </View>
      )}
    />
  );
};

export default home;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: Platform.OS === "ios" ? 44 : 0,
    // flex: 1,
    // backgroundColor: Colors.WHITE,
  },
});
