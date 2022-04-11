import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Animated } from 'react-native';
import { connect,useSelector } from 'react-redux';
import { mapStateToProps } from '../../common/StoreUtils';
import Images from '../../../assets/Images';
import Fonts from '../../../assets/Fonts'
import Colors from '../../../assets/Colors'
import Slider from 'react-native-slider';
import Icon from 'react-native-vector-icons/Feather'
import IconFont from 'react-native-vector-icons/FontAwesome'
import TrackPlayer, { State,useProgress }  from 'react-native-track-player';
import Common from '../../common/Common';
import { addToFavourites, removeFromFavourites } from '../../redux/actions/AppActions';

const App = (props) => {
    const { navigation, route } = props;
    const [title, setTilte] = useState('');
    // const [duration, setDuration] = useState(3)
    const [trackFile,setTrackFile] = useState('')
    const [artist, setArtist] = useState('')
    const [value, setValue] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isFavourite,setIsFavourite] = useState(false)

    const musicFiles = useSelector((state)=>state?.AppReducer?.musicFiles);
    const { position, buffered, duration } = useProgress()
  
    useEffect(() => {
        if (route?.params?.data) {
            let Data = route?.params?.data
            checkFavourites(Data)
            setTrackFile(Data)
            start(Data)
        }
    }, [route?.params?.data])

    const start = async (item) => {
        setArtist(item?.artistName)
        setTilte(item?.trackName)
        await TrackPlayer.setupPlayer();
        await TrackPlayer.add({
            url: require('../../../assets/customData/Kalimba.mp3')
        });
        await TrackPlayer.play();
        setIsPlaying(true)
    };

    checkFavourites=(item)=>{
        if(musicFiles?.length>0){
           if(musicFiles.includes(item)){
               setIsFavourite(true)
           }
           else{
            setIsFavourite(false) 
           }
        }
    }

    const onTrackPlay = async () => {
        setIsPlaying(!isPlaying)
        if (isPlaying) {
            await TrackPlayer.pause();
            setIsPlaying(false)

        }
        else {
            await TrackPlayer.play(); 
            setIsPlaying(true)
        }
    }

    const onPrevTrack = async () => {
    }
    
    const onNxtTrack = async () => {

    }

    const onChangeSlider = async (val) => {
        console.log('--seek value--', val);
        await TrackPlayer.play();
        await TrackPlayer.seekTo(val);
        setValue(parseInt(val)) 
        setIsPlaying(true)
    }

    const handleFavourites=(tag)=>{
       setIsFavourite(!isFavourite)
       if(tag == true){
           addToFavourites(trackFile)
        }
        else{
            removeFromFavourites(trackFile)
        }
    }

    const onPressBack=()=>{
      navigation.goBack()
    }

    useEffect(()=>{
      if(position>0){
        
          setValue(parseInt(position))
      }
    },[position])

    return (
        <>
            <View style={styles.container}>
             <View style={{flexDirection:'row',justifyContent:'space-between'}}>
             <TouchableOpacity style={{ margin: 20 ,paddingTop:10}} onPress={onPressBack}>
                    <Image source={Images.backArrow} style={styles.back} resizeMode="contain" />
                </TouchableOpacity>

                {isFavourite ==false ?
                <TouchableOpacity style={{ margin: 20,paddingTop:10 }} onPress={()=>handleFavourites(true)}>
                  <Icon name='heart' size={20} color='white' />
                </TouchableOpacity>:
                <TouchableOpacity style={{ margin: 20,paddingTop:10 }} onPress={()=>handleFavourites(false)}>
                  <IconFont name='heart' size={20} color={Colors.buttonColor} />
                </TouchableOpacity>
                } 
             </View>

                <View style={styles.subContainer}>
                    <View style={styles.thumbnail} >
                        <Image source={Images.appLogo} style={styles.thumbnail} />
                    </View>
                    <View style={styles.titleContainer}>
                        <Text numnumberOfLines={1}ber style={styles.titleText}>{title}</Text>
                        <Text style={styles.duration}>{artist}</Text>
                    </View>


                </View>
                <View style={styles.track}>
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={345}
                        value={value}
                        onSlidingComplete={(val) => onChangeSlider(val)}
                        minimumTrackTintColor={Colors.sliderColor}
                        maximumTrackTintColor={'#005679'}
                        thumbTintColor={Colors.sliderColor}
                    />
                    <View style={styles.trackvalueContainer}>
                        <Text style={{ color: 'white' }}>{Common.secondsToMins(parseInt(position))}</Text>
                        <Text style={{ color: 'white' }}>{Common.secondsToMins(345)}</Text>
                    </View>

                    <View style={styles.navContainer}>
                        <TouchableOpacity activeOpacity={.7} style={[styles.prevContainer, { marginTop: 15 }]} onPress={onPrevTrack}>
                            <Icon name='skip-back' size={20} color='white' />
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={.7} style={styles.playContainer} onPress={onTrackPlay}>
                            <Icon name={isPlaying ? 'pause' : 'play'} size={25} color='white' />
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={.7} style={[styles.prevContainer, { marginTop: 15 }]} onPress={onNxtTrack}>
                            <Icon name='skip-forward' size={20} color='white' />
                        </TouchableOpacity>
                    </View>
                </View>
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
    subContainer: {
        // flex: 1,
        alignItems: "center",
        marginTop: 30
    },
    thumbnail: {
        height: 200,
        width: 200,
        backgroundColor: Colors.bgcolor,
        borderRadius: 10
    },
    titleContainer: {
        marginVertical: 20
    },
    titleText: {
        fontSize: Fonts.fontSize_15,
        fontFamily: Fonts.Medium,
        color: Colors.white
    },
    duration: {
        fontSize: Fonts.fontSize_12,
        fontFamily: Fonts.Medium,
        color: 'grey',
        alignSelf: 'center',
        paddingTop: 5
    },
    track: {
        // flex: 1,
        marginTop: 15,
        paddingHorizontal: 15,
    },
    slider: {
    },
    navContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    prevContainer: {
        backgroundColor: '#005679',
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    },
    playContainer: {
        height: 70,
        width: 70,
        borderRadius: 70 / 2,
        backgroundColor: Colors.buttonColor,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    },
    back: {
        width: 20,
        height: 20,
    },
    trackvalueContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})