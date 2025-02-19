import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { imageAssets } from "../../constants/Option";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function CourseList({ courseList }) {
  const router = useRouter();
  return (
    <View style={styles.courseContainer}>
      <Text style={styles.courseText}>Courses</Text>
      <FlatList
        data={courseList}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: `/courseView/${item?.docId}/courseview`,
                params: {
                  courseParams: JSON.stringify(item),
                },
              })
            }
            key={index}
            style={styles.course}
          >
            <Image
              style={{ width: "100%", height: 200, borderRadius: 15 }}
              source={imageAssets[item?.banner_image]}
            />
            <Text style={styles.courseTitle}>{item?.courseTitle}</Text>
            <View style={styles.chapterContainer}>
              <Ionicons name="book-outline" size={24} color="black" />
              <Text style={styles.courseChapter}>
                {item?.chapters?.length} Chapters
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  courseContainer: {
    marginTop: 15,
  },
  courseText: {
    fontSize: 25,
    fontFamily: "outfit-bold",
  },
  course: {
    padding: 10,
    margin: 6,
    backgroundColor: Colors.BG_GRAY,
    borderRadius: 15,
    width: 320,
  },
  courseTitle: {
    fontSize: 18,
    fontFamily: "outfit-bold",
    marginTop: 10,
  },
  courseChapter: {
    fontFamily: "outfit",
    fontSize: 16,
  },
  chapterContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
