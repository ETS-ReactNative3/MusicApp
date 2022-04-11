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
import {connect} from 'react-redux';
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
  const [inputValue, setInputValue] = useState('');

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
            <Icon name="play-circle" size={20} color="white" />
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.songname} numberOfLines={1}>
              {item.trackName}
            </Text>
            {item.artistName != '' && item.artistName != '<unknown>' ? (
              <Text style={styles.duration}>{item.artistName}</Text>
            ) : null}
            <Text style={styles.duration}>
              {Common.millisToMinutesAndSeconds(item.trackTimeMillis)}
            </Text>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  const ItemSeperator = () => {
    return <View style={styles.seperator} />;
  };

  useEffect(() => {
    if (inputValue != '') {
      postData(inputValue).then(response => {
        setData(response);
        setLoading(false);
      });
    }
  }, [inputValue]);

  const handlesearch = val => {
    setInputValue(val);
    if (val.length > 1) {
      setLoading(true);
      setInputValue(val);
    } else {
      setData([]);
    }
  };

  return (
    <>
      <View style={styles.safearea}>
        <Header title={'Search'} />
        <TextInput
          value={inputValue}
          placeholder="Search for a song"
          placeholderTextColor={'grey'}
          style={styles.input}
          onChangeText={e => handlesearch(e)}
        />

        {loading ? (
          <View style={{marginVertical: 15}}>
            <ActivityIndicator size="small" color={Colors.buttonColor} />
          </View>
        ) : null}

        {data?.length == 0 ? (
          <View style={styles.container}>
            <Text style={styles.title}>Play some music</Text>
            <Text style={styles.subtitle}>Search for your favourite songs</Text>
          </View>
        ) : null}
        {!loading && nodata == '' ? (
          <FlatList
            style={{marginTop: 10}}
            data={data}
            renderItem={renderList}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeperator}
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
    // padding: 10,

    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: Colors.bgcolor,
    flexDirection: 'row',
    flex: 1,
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
    height: 50,
    width: 50,
    borderRadius: 5,
    backgroundColor: Colors.buttonColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameContainer: {
    marginLeft: 10,
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
    color: Colors.white,
    fontSize: Fonts.fontSize_14,
    fontFamily: Fonts.Medium,
  },
});
