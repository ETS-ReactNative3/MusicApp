import React ,{} from 'react';
import {Text,View,StyleSheet} from 'react-native';
import Colors from '../../assets/Colors';
import Fonts from '../../assets/Fonts';

const Header =(props)=>{
   const {title} = props

    return(
        <View style={styles.content}>             
           <Text style={styles.title}>{title}</Text>
        </View>
    )

}

export default Header

const styles=StyleSheet.create({
    content: {
        padding: 20,
        backgroundColor: Colors.bgcolor
    },
    title: {
        color: Colors.buttonColor,
        fontSize: Fonts.fontSize_18,
        fontFamily: Fonts.Medium,
    },
})