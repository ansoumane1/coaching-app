import { View, Text, Dimensions, StyleSheet } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Progress from "react-native-progress";
import { Colors } from "../../constants/Colors";
import Button from "../../components/shared/Button";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

export default function chapterView() {
  const params = useLocalSearchParams();
  const chapterParams = params.chapterParams;
  const docId = Array.isArray(params.docId) ? params.docId[0] : params.docId;
  const chapterIndex = params.chapterIndex;

  const chapters = JSON.parse(chapterParams as string);
  const width = Dimensions.get("screen").width;
  const [currentPage, setCurrentPage] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  console.log("============", docId);

  const GetProgress = (currentPage: number) => {
    const perc = currentPage / chapters?.content?.length;
    return perc;
  };

  const onChapterCompleted = async () => {
    if (!docId) {
      console.error("docId is required");
      return;
    }
    setLoading(true);
    try {
      // Save Chapter Complete
      const docRef = doc(db, "courses", docId);
      await updateDoc(docRef, {
        completedChapter: arrayUnion(chapterIndex),
      });
      // Go Back
      router.replace(`/courseView/${docId}/courseview`);  
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Progress.Bar progress={GetProgress(currentPage)} width={width * 0.85} />
      <View style={styles.chapterContainer}>
        <Text style={styles.chapterText}>
          {chapters?.content[currentPage]?.topic}
        </Text>
        <Text style={styles.chapterDesc}>
          {chapters?.content[currentPage]?.explain}
        </Text>

        {chapters?.content[currentPage]?.code && (
          <Text
            style={[
              styles.codeExampleText,
              { backgroundColor: Colors.BLACK, color: Colors.WHITE },
            ]}
          >
            {chapters?.content[currentPage]?.code}
          </Text>
        )}

        {chapters?.content[currentPage]?.example && (
          <Text style={styles.codeExampleText}>
            {chapters?.content[currentPage]?.example}
          </Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
        {chapters?.content?.length - 1 !== currentPage ? (
          <Button text="Next" onPress={() => setCurrentPage(currentPage + 1)} />
        ) : (
          <Button
            text="Finish"
            onPress={() => onChapterCompleted()}
            loading={loading}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  chapterContainer: {
    marginTop: 20,
  },
  chapterText: {
    fontSize: 25,
    fontFamily: "outfit-bold",
  },
  chapterDesc: {
    fontSize: 20,
    fontFamily: "outfit",
    marginTop: 7,
  },
  codeExampleText: {
    padding: 15,
    backgroundColor: Colors.BG_GRAY,
    borderRadius: 15,
    fontFamily: "outfit",
    fontSize: 18,
    marginTop: 15,
  },
  buttonContainer: {
    position: "absolute",
    width: "100%",
    bottom: 20,
    left: 25,
  },
});
