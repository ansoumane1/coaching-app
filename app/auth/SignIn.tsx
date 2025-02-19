import { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { UserDetailContext } from "../../context/UserDetailContext";
interface FieldInput {
  email: string;
  password: string;
}

export default function SignIn() {
  const router = useRouter();
  const [fieldInput, setFieldInput] = useState<FieldInput>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const handleSignIn = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, fieldInput.email, fieldInput.password)
      .then(async (response) => {
        const user = response.user;
        console.log(user);

        // save user to  data
        await getUserDetail();
        setLoading(false);
        // Navigate to new Screen
        router.replace("/(tabs)/home");
      })
      .catch((e) => {
        console.log(e.message);
        ToastAndroid.show("Incorrect Email & Password", ToastAndroid.BOTTOM);
        setLoading(false);
      });
  };
  // function to get user detail when user is successfully logged in
  const getUserDetail = async () => {
    const result = await getDoc(doc(db, "users", fieldInput.email));
    console.log(result.data());

    if (result.exists()) {
      setUserDetail(result.data());
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
      />
      <Text style={styles.text}>Log In !</Text>

      <TextInput
        keyboardType="email-address"
        onChangeText={(text) => setFieldInput({ ...fieldInput, email: text })}
        placeholder="Email"
        style={styles.textinput}
      />
      <TextInput
        placeholder="Password"
        onChangeText={(text) =>
          setFieldInput({ ...fieldInput, password: text })
        }
        secureTextEntry={true}
        style={styles.textinput}
      />

      <TouchableOpacity
        disabled={loading}
        onPress={handleSignIn}
        style={styles.button}
      >
        {!loading ? (
          <Text style={styles.buttonText}>Sign In</Text>
        ) : (
          <ActivityIndicator
            animating={loading}
            color={Colors.WHITE}
            size="small"
          />
        )}
      </TouchableOpacity>
      <View style={styles.sign_container}>
        <Text style={styles.sign_text}>Don't have an account</Text>
        <Pressable onPress={() => router.push("/auth/SignUp")}>
          <Text style={styles.sign_button}>Sign Up here </Text>
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
