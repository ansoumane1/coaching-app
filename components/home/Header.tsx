import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useContext } from "react";
import { UserDetailContext } from "../../context/UserDetailContext";
import { Colors } from "../../constants/Colors";

export default function Header() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Hello, {userDetail?.name}</Text>
        <Text style={styles.smallText}>Let's Started !</Text>
      </View>
      <TouchableOpacity>
        <Ionicons name="settings-outline" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 22,
    fontFamily: "outfit-bold",
    color: Colors.WHITE,
  },
  smallText: {
    fontSize: 18,
    fontFamily: "outfit",
    color: Colors.WHITE,
  },
});
