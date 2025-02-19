import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Chapters({ course }: any) {
  const router = useRouter();
  const isChapterCompleted = (index: any) => {
    const isCompleted = course?.completedChapter?.find((item) => item == index);
    console.log("this is completed", isCompleted);
    return isCompleted ? true : false;
  };
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 25, fontFamily: "outfit-bold" }}>Chapters</Text>
      <FlatList
        data={course?.chapters}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/chapterView/chapterView",
                params: {
                  chapterParams: JSON.stringify(item),
                  docId: course?.docId,
                  chapterIndex: index,
                },
              })
            }
            style={styles.container}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                paddingHorizontal: 10,
              }}
            >
              <Text style={styles.chapterText}>{index + 1}.</Text>
              <Text style={styles.chapterText}>{item?.chapterName}</Text>
            </View>
            {isChapterCompleted(index) ? (
              <Ionicons
                name="checkmark-circle"
                size={20}
                color={Colors.GREEN}
              />
            ) : (
              <Ionicons name="play" size={20} color={Colors.PRIMARY} />
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 8,
    marginTop: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chapterText: {
    fontSize: 20,
    fontFamily: "outfit",
  },
});
