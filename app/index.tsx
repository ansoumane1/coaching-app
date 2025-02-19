import { Text, Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../constants/Colors";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import { useContext } from "react";
import { UserDetailContext } from "../context/UserDetailContext";
export default function Index() {
  const router = useRouter();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  // check if user is already logged in
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const result = await getDoc(doc(db, "users", user.email));
      if (result.exists()) {
        setUserDetail(result.data());
      }
      router.replace("/(tabs)/home");
    }
  });
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/landing.png")}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>Welcome to Coaching App</Text>
        <Text style={styles.description}>
          Transform your ideas into engaging educational content, effortlesly
          with AI
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/auth/SignUp")}
          style={styles.button}
        >
          <Text style={styles.bouttonText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/auth/SignIn")}
          style={[
            styles.button,
            {
              backgroundColor: Colors.PRIMARY,
              borderWidth: 1,
              borderColor: Colors.WHITE,
            },
          ]}
        >
          <Text style={[styles.bouttonText, { color: Colors.WHITE }]}>
            Already have an account?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  image: {
    width: "100%",
    height: 300,
    marginTop: 60,
    resizeMode: "cover",
  },
  textContainer: {
    height: "100%",
    backgroundColor: Colors.PRIMARY,
    padding: 25,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  text: {
    fontSize: 35,
    fontFamily: "outfit-bold",
    fontWeight: "bold",
    color: Colors.WHITE,
    textAlign: "center",
  },
  description: {
    fontSize: 20,
    color: Colors.WHITE,
    fontFamily: "outfit",
    textAlign: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: Colors.WHITE,
    padding: 15,
    borderRadius: 20,
    marginTop: 10,
  },
  bouttonText: {
    fontSize: 20,
    color: Colors.PRIMARY,
    textAlign: "center",
  },
});
