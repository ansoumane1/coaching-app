import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import Button from "../shared/Button";
import { useRouter } from "expo-router";

export default function NoCourse() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/images/book.png")}
      />
      <Text style={styles.text}>You Don't have any courses yet</Text>

      <Button
        text={"+Add New Course"}
        type="fill"
        onPress={() => router.push("/addCourse/AddCourse")}
      />
      <Button text={"Explore existing courses"} type="outline" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 23,
    fontFamily: "outfit-bold",
  },
});
