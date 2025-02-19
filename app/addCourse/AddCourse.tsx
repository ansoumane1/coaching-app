import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import { Colors } from "../../constants/Colors";
import Button from "../../components/shared/Button";
import {
  GenerateCourseAIModel,
  GenerateTopicsAIModel,
} from "../../config/AiModel";
import { Prompt } from "../../constants/Prompt";
import { ScrollView } from "react-native";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { UserDetailContext } from "../../context/UserDetailContext";
import { useRouter } from "expo-router";

export default function AddCourse() {
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [courseTopics, setCourseTopics] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const router = useRouter();

  const onGenerateTopic = async () => {
    try {
      setLoading(true);
      if (!userInput.trim()) {
        alert("Veuillez entrer un nom de cours");
        return;
      }

      const PROMPT = userInput + Prompt.IDEA;
      const aiResponse = await GenerateTopicsAIModel.sendMessage(`${PROMPT}`);
      //console.log("Réponse reçue:", aiResponse);

      const responseText = JSON.parse(aiResponse.response.text());
      //console.log(responseText);
      setCourseTopics(responseText?.course_titles);

      setUserInput("");
    } catch (error) {
      console.error("Erreur lors de la génération:", error);
      alert(
        "Une erreur est survenue lors de la génération du cours. Veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleTopicSelection = (topic: string) => {
    const isAlreadySelected = selectedTopics.find((item) => item === topic);
    if (!isAlreadySelected) {
      setSelectedTopics((prev) => [...prev, topic]);
    } else {
      const topics = selectedTopics.filter((item) => item !== topic);
      setSelectedTopics(topics);
    }
  };

  const isTopicSelected = (topic: string) => {
    const iselected = selectedTopics.find((item) => item === topic);
    return iselected ? true : false;
  };

  /**
   * Used to Generate Course using AI Model
   */

  const onGenerateCourse = async () => {
    setLoading(true);
    const PROMPT = selectedTopics + Prompt.COURSE;
    //console.log(PROMPT);
    try {
      const aiResponse = await GenerateCourseAIModel.sendMessage(`${PROMPT}`);
      const response = JSON.parse(aiResponse.response.text());
      console.log(response);
      const courses = response[0]?.courses;
      console.log("JSON", courses);

      //save course to database
      courses?.forEach(async (course: any) => {
        const docId = Date.now().toString();
        await setDoc(doc(db, "courses", docId), {
          ...course,
          createdOn: new Date(),
          createdBy: userDetail?.email,
          docId: docId,
        });
      });
      router.push("/(tabs)/home");
    } catch (error) {
      //console.error("Erreur lors de la génération:", error);
      alert(
        "Une erreur est survenue lors de la génération du cours. Veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.bigTitle}>Create New Course </Text>

      <Text style={styles.smallTitle}>What you want to learn today?</Text>
      <Text style={styles.description}>
        What course you want to create (ex.Learn python, Django)
      </Text>
      <TextInput
        style={styles.textInput}
        numberOfLines={3}
        multiline={true}
        placeholder="Enter Course Name (ex.learn python)"
        value={userInput}
        onChangeText={(text: string) => setUserInput(text)}
      />

      <Button
        text="Generate Topic"
        type="outline"
        onPress={() => onGenerateTopic()}
        loading={loading}
      />

      <View style={styles.topicsContainer}>
        <Text style={[styles.smallTitle, { marginBottom: 10, fontSize: 20 }]}>
          Select all the topics you want to add in the course
        </Text>
        <View style={styles.topics}>
          {courseTopics.map((topic, index) => (
            <Pressable
              key={index}
              style={[
                styles.topic,
                {
                  backgroundColor: isTopicSelected(topic)
                    ? Colors.PRIMARY
                    : Colors.WHITE,
                },
              ]}
              onPress={() => handleTopicSelection(topic)}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "outfit",
                  color: isTopicSelected(topic) ? Colors.WHITE : Colors.PRIMARY,
                }}
              >
                {topic}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
      {selectedTopics.length > 0 && (
        <Button
          text="Generate Course"
          type="fill"
          onPress={() => onGenerateCourse()}
          loading={loading}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  bigTitle: {
    fontFamily: "outfit-bold",
    fontSize: 30,
  },
  smallTitle: {
    fontFamily: "outfit",
    fontSize: 25,
  },
  description: {
    fontFamily: "outfit",
    fontSize: 20,
    marginTop: 12,
    color: Colors.GRAY,
  },
  textInput: {
    borderWidth: 1,
    padding: 15,
    height: 100,
    borderRadius: 8,
    marginTop: 12,
    borderColor: Colors.GRAY,
  },
  topicsContainer: {
    marginTop: 20,
  },
  topics: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  topic: {
    borderWidth: 0.8,
    padding: 7,
    borderColor: Colors.PRIMARY,
    borderRadius: 8,
    paddingHorizontal: 15,
  },
});
