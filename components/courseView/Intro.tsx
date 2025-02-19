import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import { imageAssets } from "../../constants/Option";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import Button from "../shared/Button";
import { goBack } from "expo-router/build/global-state/routing";
import { useRouter } from "expo-router";

export default function Intro({ course }: any) {
  const router = useRouter();
  return (
    <View>
      <Image source={imageAssets[course?.banner_image]} style={styles.image} />
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, fontFamily: "outfit-bold" }}>
          {course?.courseTitle}
        </Text>
        <View style={styles.chapterContainer}>
          <Ionicons name="book-outline" size={24} color="black" />
          <Text style={styles.courseChapter}>
            {course?.chapters?.length} Chapters
          </Text>
        </View>
        <Text style={styles.descriptionTitle}>Description:</Text>
        <Text style={styles.description}>{course?.description}</Text>

        <Button onPress={() => console.log("start")} text="Start Now" />
      </View>
      <Pressable onPress={() => router.back()} style={styles.goBack}>
        <Ionicons name="arrow-back" size={30} color="black" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 280,
  },
  courseChapter: {
    fontFamily: "outfit-bold",
    fontSize: 20,
    marginTop: 10,
  },
  chapterContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  descriptionTitle: {
    fontSize: 18,
    fontFamily: "outfit-bold",
    marginTop: 10,
  },
  description: {
    fontFamily: "outfit",
    fontSize: 16,
    color: Colors.GRAY,
  },
  goBack: {
    position: "absolute",
    padding: 10,
  },
});
