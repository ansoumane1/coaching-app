import { View, Text, Platform, FlatList } from 'react-native'
import React from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { CourseCategory } from '../../constants/Option'
import CourseListByCategory from '../../components/explore/CourseListByCategory'

const explore = () => {
  return (
    <FlatList 
    data={[]}
    renderItem={null}
    style={{
      backgroundColor: Colors.WHITE,
      flex:1,
    }}
    ListHeaderComponent={() => (
      <View style={{
        flex: 1,
        backgroundColor: Colors.WHITE,
        padding:25,
      }}>
        <Text style={{
          fontSize: 30,
          marginTop:  Platform.OS === "ios" ? 50 : 10,
          fontFamily: "outfit-bold",
         
        }}>explore More Courses</Text>
  
        {
          // display courses category
          CourseCategory.map((category,index)=>(
            <View key={index} style={{
              marginTop: 20,
            }}>
              {/* <Text style={{
                fontSize: 20,
                fontFamily: "outfit-bold",
              }}>{category}</Text> */}
              <CourseListByCategory category={category} />
            </View>
  
          ))
        }
      </View>
    )}
    
    />
  )
}

export default explore