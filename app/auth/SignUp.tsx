import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Touchable,
  Pressable,
} from "react-native";
import React, { useState, useContext } from "react";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { UserDetailContext } from "../../context/UserDetailContext";

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {userDetail, setUserDetail } = useContext(UserDetailContext);

  const createAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (response) => {
        const user = response.user;
        console.log(user);
        // save user to  data
        await saveUser(user);

      
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const saveUser = async (user: any) => {
    const data = {
      name: fullName,
      email: email,
      member: false,
      uid: user?.uid,
    };
    await setDoc(doc(db, "users", email), data);

    setUserDetail(data);
    // Navigate to new Screen
  };

  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
      />
      <Text style={styles.text}>Create an account !</Text>
      <TextInput
        value={fullName}
        onChangeText={setFullName}
        placeholder="Full Name"
        style={styles.textinput}
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        style={styles.textinput}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
        style={styles.textinput}
      />

      <TouchableOpacity onPress={createAccount} style={styles.button}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
      <View style={styles.sign_container}>
        <Text style={styles.sign_text}>Already have an account</Text>
        <Pressable onPress={() => router.push("/auth/SignIn")}>
          <Text style={styles.sign_button}>SignIn Here </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.WHITE,
    padding: 20,
  },
  logo: {
    width: 180,
    height: 180,
    marginTop: 50,
  },
  text: {
    fontSize: 30,
    fontFamily: "outfit-bold",
  },
  textinput: {
    width: "100%",
    fontSize: 18,
    borderWidth: 1,
    borderColor: Colors.BLACK,
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  button: {
    padding: 18,
    backgroundColor: Colors.PRIMARY,
    width: "100%",
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: "outfit",

    color: Colors.WHITE,
  },
  sign_container: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  sign_text: {
    fontFamily: "outfit",
    fontSize: 18,
  },
  sign_button: {
    fontFamily: "outfit-bold",
    color: Colors.PRIMARY,
    fontSize: 18,
  },
});
