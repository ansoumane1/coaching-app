import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React from "react";
import { imageAssets } from "../../constants/Option";
import { Colors } from "../../constants/Colors";
import * as Progress from "react-native-progress";

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
          <View key={index} style={styles.progress}>
            <>
              <View style={styles.progressContainer}>
                <Image
                  source={imageAssets[item?.banner_image]}
                  style={styles.progressImage}
                />
                <View style={{ flex: 1 }}>
                  <Text
                    numberOfLines={2}
                    style={{
                      fontSize: 17,
                      fontFamily: "outfit-bold",
                      flexWrap: "wrap",
                    }}
                  >
                    {item?.courseTitle}
                  </Text>
                  <Text style={{ fontSize: 15, fontFamily: "outfit" }}>
                    {item?.chapters?.length} Chapters
                  </Text>
                </View>
              </View>
              <View style={{ marginTop: 7 }}>
                <Progress.Bar progress={getProgressPerc(item)} width={260} />
                <Text style={{ fontFamily: "outfit", marginTop: 2 }}>
                  {item?.completedChapter?.length} out of{" "}
                  {item?.chapters?.length} Chapter completed
                </Text>
              </View>
            </>
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
