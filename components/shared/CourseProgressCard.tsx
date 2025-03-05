import { View, Text , Image} from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Colors } from '../../constants/Colors';
import { imageAssets } from '../../constants/Option';
import * as Progress from 'react-native-progress';

interface CourseProgressCardProps {
  item: any;
  width?: any;
}

export default function CourseProgressCard({item, width=280}:CourseProgressCardProps) {
     const getProgressPerc = (course: any) => {
        const completedChapter = course?.completedChapter?.length;
        const totalChapter = course?.chapters?.length;
        const progress = (completedChapter / totalChapter) * 100;
        return progress;
      };
  return (
          <View  style={[styles.progress, { width: width }]}>
          
              <View style={styles.progressContainer}>
                <Image
                  source={imageAssets[item?.banner_image]}
                  style={styles.progressImage}
                />
                <View style={{ flex: 1 }}>
                  <Text
                    numberOfLines={2}
                    style={{
                      fontSize: 17,
                      fontFamily: "outfit-bold",
                      flexWrap: "wrap",
                    }}
                  >
                    {item?.courseTitle}
                  </Text>
                  <Text style={{ fontSize: 15, fontFamily: "outfit" }}>
                    {item?.chapters?.length} Chapters
                  </Text>
                </View>
              </View>
              <View style={{ marginTop: 7 }}>
                <Progress.Bar progress={getProgressPerc(item)} width={width - 30} />
                <Text style={{ fontFamily: "outfit", marginTop: 2 }}>
                  {item?.completedChapter?.length ?? 0} out of{" "}
                  {item?.chapters?.length} Chapter completed
                </Text>
              </View>

          </View>
  )
}


const styles = StyleSheet.create({

  progressTitle: {
    fontSize: 25,
    fontFamily: "outfit-bold",
    color: Colors.WHITE,
  },
  progressImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  progressContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  progress: {
    margin: 7,
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 15,

  },
});
