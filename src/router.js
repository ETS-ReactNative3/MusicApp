import * as React from 'react';
import { View ,TouchableOpacity,Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from './screens/search'
import { navigationRef } from '../rootnavigation';
import Player from './screens/player';
import Icon from 'react-native-vector-icons/Feather'
import Colors from '../assets/Colors';
import Home from './screens/home';
import Favourites from './screens/favourites';
import Account from './screens/account';
import Fonts from '../assets/Fonts';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Navigation() {
 function MyTabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        let iconName = null;
        if(route.name == 'Home'){
          iconName = 'home'
        }
        else if(route.name == 'Player'){
          iconName = 'play-circle'
        }
        else if(route.name == 'Favourites'){
          iconName = 'heart'
        }
        else if(route.name == 'Search'){
          iconName = 'search'
        }
        else if(route.name == 'Account'){
          iconName = 'user'
        }
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
       
        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={label}
            activeOpacity={1}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 ,height:70,alignItems:'center',justifyContent:'center',backgroundColor:Colors.bottomBarColor,paddingTop:10}}
          >
          <Icon name={iconName} size={20} color={isFocused ? Colors.iconColor : 'rgba(255, 255, 255, 0.3)'}/>
            <Text style={{ color: isFocused ? Colors.iconColor : 'rgba(255, 255, 255, 0.3)' ,marginVertical:5,fontFamily:Fonts.Medium}}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

 const BottomTab =()=>{
   return(
    <Tab.Navigator  tabBar={props => <MyTabBar {...props} />}
       initialRouteName="Home">
       <Tab.Screen name="Home" component={Home} options={{headerShown:false}}/>
       <Tab.Screen name="Favourites" component={Favourites} options={{headerShown:false}}/>
       <Tab.Screen name="Search" component={Search} options={{headerShown:false}}/>
       <Tab.Screen name="Account" component={Account} options={{headerShown:false}}/>
    </Tab.Navigator>
   )
 }
 
  return (
     <NavigationContainer ref={navigationRef}>
      <Stack.Navigator  tabBar={props => <MyTabBar {...props} />}
        initialRouteName="HomeTab">
           <Stack.Screen name="HomeTab" component={BottomTab} options={{headerShown:false}}/>
           <Stack.Screen name="Player" component={Player} options={{headerShown:false ,tabBarVisible:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
