import { View, Text, Platform, Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { Colors } from '../../constants/Colors'
import { UserDetailContext } from '../../context/UserDetailContext'
import { ProfileMenu } from '../../constants/Option'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebaseConfig'


const profile = () => {
  const {userDetail, setUserDetail} = useContext(UserDetailContext);
  const onRedirect = async (path:string) => {
    if(path !== "/login"){
      router.replace(path); 
      return ;
    }else{
      await signOut(auth);
      setUserDetail(null);
      router.replace('/auth/SignIn');
    }
    console.log(path);
  }

  return (
    <View  style={{
      flex: 1,
      backgroundColor: Colors.WHITE,
      padding:25,
    }}>
      <Text style={{
        fontSize: 25,
        fontFamily: "outfit-bold",
        marginTop: Platform.OS === "ios" ? 40 : 10,
      }}>profile</Text>

      <View style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
      }}>
        <Image source={require('../../assets/images/logo.png')}  style={{
          width: 200,
          height: 200,
          resizeMode: "contain",
        }}/>
        <View>
          <Text style={{
            fontSize: 20,
            fontFamily: "outfit-bold",
          }}>{userDetail?.name}</Text>
          <Text style={{
            fontSize: 15,
            fontFamily: "outfit",
          }}>{userDetail?.email}</Text>
        </View>

      </View>
      <View style={{
        marginTop: 20,
        }}>
        {
          ProfileMenu.map((menu,index)=>(
            <View key={index}>
              <TouchableOpacity onPress={()=>onRedirect(menu?.path)} style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                marginBottom: 20,
              }}>
                  <View style={{
                    backgroundColor: Colors.BG_GRAY,
                    padding: 10,
                    borderRadius: 10,
                  }}>
                  <Ionicons name={menu?.icon} size={24} color={Colors.PRIMARY} />
                </View>
                <Text style={{
                  fontSize: 18,
                  fontFamily: "outfit-bold",
                }}>{menu?.name}</Text>
              
              </TouchableOpacity>
            </View>
          ))
        }
      </View>
    </View>
  )
}

export default profile