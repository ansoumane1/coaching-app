import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React from "react";
import { imageAssets } from "../../constants/Option";
import { Colors } from "../../constants/Colors";
import * as Progress from "react-native-progress";
import CourseProgressCard from "../shared/CourseProgressCard";

export default function CourseProgress({ courseProgress }: any) {
  const getProgressPerc = (course: any) => {
    const completedChapter = course?.completedChapter?.length;
    const totalChapter = course?.chapters?.length;
    const progress = (completedChapter / totalChapter) * 100;
    return progress;
  };
  return (
    <View style={styles.container}>
      <Text style={styles.progressTitle}>Progress</Text>
      <FlatList
        data={courseProgress}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View key={index}>
          
              <CourseProgressCard item={item} />
            
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  progressTitle: {
    fontSize: 25,
    fontFamily: "outfit-bold",
    color: Colors.WHITE,
  },
  progressImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  progressContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  progress: {
    margin: 7,
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    width: 280,
  },
});
