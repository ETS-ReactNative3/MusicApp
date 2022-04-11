import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, Image, Animated } from 'react-native';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../common/StoreUtils';
import Images from '../../../assets/Images';
import Fonts from '../../../assets/Fonts'
import Colors from '../../../assets/Colors'
import Header from '../../components/Header';
import SplashScreen from 'react-native-splash-screen'

const App = (props) => {
  
    useEffect(()=>{
      setTimeout(() => {
          SplashScreen.hide()
      }, 2500);
    },[])

    return (
        <>
            <View style={styles.container}>
              <Header title={'Home'}/>
            </View>
        </>
    )
}
export default connect(mapStateToProps)(App)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bgcolor
    },

})