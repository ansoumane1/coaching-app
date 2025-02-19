import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

type Props = {
  text: string;
  type?: "fill" | "outline";
  onPress?: () => void;
  loading?: boolean;
};

export default function Button({
  text,
  type = "fill",
  onPress,
  loading,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      style={[
        styles.container,
        { backgroundColor: type === "fill" ? Colors.PRIMARY : Colors.WHITE },
      ]}
    >
      {!loading ? (
        <Text
          style={[
            styles.buttonText,
            { color: type === "fill" ? Colors.WHITE : Colors.PRIMARY },
          ]}
        >
          {text}
        </Text>
      ) : (
        <ActivityIndicator
          animating={loading}
          color={type === "fill" ? Colors.WHITE : Colors.PRIMARY}
          size="small"
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    width: "100%",
    borderWidth: 0.8,
    borderColor: Colors.PRIMARY,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "outfit-bold",
  },
});
