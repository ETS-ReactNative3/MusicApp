import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Animated,
  TextInput,
} from 'react-native';
import {connect, useSelector} from 'react-redux';
import {mapStateToProps} from '../../common/StoreUtils';
import Images from '../../../assets/Images';
import Fonts from '../../../assets/Fonts';
import Colors from '../../../assets/Colors';
import Icon from 'react-native-vector-icons/Feather';
import {postData} from '../../redux/actions/AppActions';
import Common from '../../common/Common';
import Header from '../../components/Header';

const App = props => {
  const {navigation} = props;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nodata, setNoData] = useState('');

 const musicFiles = useSelector((state)=>state?.AppReducer?.musicFiles);

  const selectTrack = item => {
    navigation.navigate('Player', {data: item});
  };

  const renderList = ({item}) => {
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.listContainer}
          onPress={() => selectTrack(item)}>
          <View style={styles.audioContainer}>
            <Icon name="play-circle" size={30} color="white" />
          </View>
          <Image/>
          <View style={styles.nameContainer}>
            <Text style={styles.songname} numberOfLines={1}>
              {item.trackName}
            </Text>
            {item.artistName != '' && item.artistName != '<unknown>' ? (
              <Text style={styles.duration}>{item.artistName}</Text>
            ) : null}
          </View>
        </TouchableOpacity>
      </>
    );
  };

  const ItemSeperator = () => {
    return <View style={styles.seperator} />;
  };

 useEffect(()=>{
       setData(musicFiles)
 },[])

  return (
    <>
      <View style={styles.safearea}>
        <Header title={'Favourites'} />
        <Text style={styles.subtitle}>Listen to your favourite songs</Text>
        {loading ? (
          <View style={{marginVertical: 15}}>
            <ActivityIndicator size="small" color={Colors.buttonColor} />
          </View>
        ) : null}

        {data?.length == 0 ? (
          <View style={styles.container}>
            <Text style={[styles.subtitle,{color:Colors.white}]}>Add songs to your favourite list</Text>
          </View>
        ) : null}
        {!loading && nodata == '' ? (
          <FlatList
            style={{marginTop: 10}}
            data={data}
            numColumns={2}
            renderItem={renderList}
            keyExtractor={(item, index) => index.toString()}
            // ItemSeparatorComponent={ItemSeperator}
          />
        ) : null}

        {nodata != '' ? <Text style={styles.nodata}>{nodata}</Text> : null}
      </View>
    </>
  );
};
export default connect(mapStateToProps)(App);

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: Colors.bgcolor,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    // borderWidth: 1,
    // borderColor:'white',
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: Colors.bgcolor,
    width:'42%'
  },
  songname: {
    fontSize: Fonts.fontSize_15,
    fontFamily: Fonts.Medium,
    color: 'white',
  },
  duration: {
    fontSize: 12,
    fontFamily: Fonts.Medium,
    color: 'grey',
  },
  audioContainer: {
    height: 150,
    width: 150,
    borderRadius: 5,
    backgroundColor: Colors.buttonColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameContainer: {
    paddingVertical:5,
    flex: 1,
  },
  nodata: {
    color: Colors.white,
    marginTop: 20,
    fontSize: Fonts.fontSize_13,
    fontFamily: Fonts.Regular,
    alignSelf: 'center',
  },
  seperator: {
    width: '91%',
    borderWidth: 0.6,
    borderColor: Colors.borderColor,
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.white,
    marginHorizontal: 20,
    borderRadius: 5,
    padding: 10,
    color: Colors.white,
    height: 40,
  },
  title: {
    color: Colors.buttonColor,
    fontSize: Fonts.fontSize_18,
    fontFamily: Fonts.Medium,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.3)',
    fontSize: Fonts.fontSize_14,
    fontFamily: Fonts.Medium,
    marginLeft:20
  },
});
