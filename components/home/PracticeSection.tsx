import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { PraticeOption } from "../../constants/Option";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function PracticeSection() {
  const router = useRouter();
  return (
    <View style={{ marginTop: 15 }}>
      <Text style={styles.sectionTitle}>Practice</Text>
      <FlatList
        data={PraticeOption}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() =>
              router.push(`/practice/${item.name}/PracticeTypeHomeScreen`)
            }
            style={{
              flex: 1,
              margin: 8,
              aspectRatio: 1,
            }}
          >
            <Image
              source={item.image}
              style={{
                width: "100%",
                height: "100%",
                maxHeight: 160,
                borderRadius: 15,
              }}
            />
            <Text style={styles.cardtitle}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 25,
    fontFamily: "outfit-bold",
    color: Colors.WHITE,
  },
  cardtitle: {
    position: "absolute",
    color: Colors.WHITE,
    padding: 15,
    fontSize: 15,
    fontFamily: "outfit",
  },
});
