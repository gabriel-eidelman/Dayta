import {getUserData } from '@/utils/firestore';
import {useAuth} from '@/contexts/AuthContext'
import {useState, useEffect} from 'react'
import {StyleSheet, View, Text} from 'react-native'
import layout_styles from '@/styles/reusable/layoutStyles';
import font_styles from'@/styles/reusable/typography'

export default function Info() {
    const [userData, setUserData] = useState<any>(null);
    const {user} = useAuth()
    //fetch user data (e.g. settings data)
    useEffect(() => {
    if (user) {
      // Fetch user data when the component mounts

      getUserData(user.uid).then((data) => {
        if (data) {
          setUserData(data);
        }
      });
    }
  }, [user]);

  return(
    <View style={layout_styles.layoutContainer}>
      <View style={layout_styles.titleContainer}>
        <Text style={font_styles.headerStyle}>Info</Text>
      </View>
      <View style={layout_styles.bodyContainer}>
        {user && userData ? 
        <Text style={font_styles.body}>Email: {user.email}</Text> 
        : 
        <Text>Add "Data" To Firestore</Text>}
      </View>
      </View>
  );
}