import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Alert,Modal  } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { NavigationContainer,useFocusEffect,useNavigation  } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Ionicons from "@expo/vector-icons/Ionicons";
import { Home } from "./Pages/Home/Home";
import { Invoice } from "./Pages/Invoices/Invoice";
import { MyRates } from "./Pages/My Rates/MyRates";
import { Profile } from "./Pages/Profile/Profile";
import {AppSlides} from "./Pages/OnBoarding/AppSlides/AppSlides";
import { Orders } from "./Pages/Orders/Orders";
import { Login } from "./Pages/Login/Login";
import { SignUp } from "./Pages/SignUp/Signup";
import { Feather } from '@expo/vector-icons'; 
import { StartScreen } from './Pages/OnBoarding/StartScreen/StartScreen';
import { OTPVerify } from './Pages/OnBoarding/OTP_Verification/OTPVerify';
import { RegisterAs } from './Pages/SignUp/Registration/Registeras';
import { PersonalDetails } from './Pages/SignUp/Registration/PersonalDetails';
import { UplodeShopImage } from './Pages/SignUp/Registration/UplodeShopImage';
import { RegisterSuccessfull } from './Pages/SignUp/Registration/RegisterSuccessfull';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Inventory } from './Pages/Inventory/Inventory';
import { Octicons } from '@expo/vector-icons'; 
import { OrderDetail } from './Pages/Orders/OrderDetail';
import { AppProvider, useAppContext } from './Context/AppContext';
import * as SplashScreen from 'expo-splash-screen';
import { WelcomeScreen } from './Pages/OnBoarding/SplashScreen/WelcomeScreen';
import { Schedule } from './Pages/Schedule/Schedule';
import { AboutCompany } from './Pages/Profile/ProfileTabs/AboutCompany';
import { TermsCondition } from './Pages/Profile/ProfileTabs/TermsCondition';
import { UpgradeTo } from './Pages/Profile/ProfileTabs/UpgradeTo';
// import { Address } from './Pages/Profile/ProfileTabs/Address/Address';
import { VerifyProfile, VerifyProfileStatus } from './Pages/SignUp/Registration/VerifyProfileStatus';
import { VerificationDetails } from './Pages/SignUp/Registration/VerificationDetails';
import { PendingOrderDetails } from './Pages/Orders/PendingOrderDetails';
import { AntDesign } from '@expo/vector-icons'; 
import { Market } from './Pages/Market/Market';
import { RateDetails } from './Pages/Market/RateDetails';
import { OrderStatus } from './Pages/Market/OrderStatus';
import { InCommingOrderDetails } from './Pages/Orders/InCommingOrderDetails';
import { PrivacyPolicy } from './Pages/Profile/ProfileTabs/PrivacyPolicy';
import { WebViewApp } from './Pages/WebViewPage/WebView';
import { KYC } from './Pages/Profile/ProfileTabs/Kyc';
import { LiveRating } from './Pages/LiveRating/LiveRating';
import { DailyRates } from './Pages/LiveRating/DailyRates';
import LiveRatestwo from './Components/Cards/LiveRatestwo';
import * as Notifications from 'expo-notifications';
import usePushNotifications from './usePushNotifications';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Tabs = ({navigation}) => {
  const {userDetails} = useAppContext()
  return (
 
<Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#239456',
      tabBarInactiveTintColor :'grey',
      tabBarLabelStyle:{color:"black"},
      tabBarStyle: { backgroundColor: '#FFF',color:"#fff",position:'absolute',bottom:0,paddingTop:2,paddingBottom:3},
    }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (

          
            <Ionicons name="home" color={color} size={size}  />
          ),
          headerShown: false,
        }}
       
     
      />
      {
        (userDetails.registerAs !== "Collectors" || userDetails.registerAs !== "Factory") && 
        <Tab.Screen
        name="Trading"
        component={Market}
        options={{
          tabBarIcon: ({ color, size }) => (
          
            <MaterialCommunityIcons name="tag" size={size} color={color} />
          ),
          headerShown: false,
        }}
      
       
      />
      }
      
     {
            userDetails.registerAs !== "Collectors"  && <Tab.Screen
            name="My Rates"
            component={MyRates}
            options={{
              tabBarIcon: ({ color, size }) => (
               
                
                <AntDesign name="barschart" size={size} color={color} />
              ),
              headerShown: false,
            }}
           
          />
     }
    

      



{/* <Tab.Screen
        name="Schedule"
        component={Schedule}
        options={{
          tabBarIcon: ({ color, size }) => (
            // <FontAwesome name="bookmark" size={size} color={color} />
            <Feather name="file-text" size={size} color={color} />
          ),
          
          headerShown: false,
        }}
      
       
      /> */}
<Tab.Screen
        name="Orders"
        component={Orders}
        options={{
          tabBarIcon: ({ color, size }) => (
            // <FontAwesome name="bookmark" size={size} color={color} />
            <FontAwesome name="shopping-bag" size={size} color={color} />
          ),
          headerShown: false,
        }}
      
       
      />
       <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            // <FontAwesome name="bookmark" size={size} color={color} />
            <FontAwesome name="user" size={size} color={color} />
          ),
          headerShown: false,
        }}
      
       
      />
{/* <Tab.Screen
        name="Inventory"
        component={Inventory}
        options={{
          tabBarIcon: ({ color, size }) => (
            // <FontAwesome name="bookmark" size={size} color={color} />
            
            <Octicons name="checklist" size={size} color={color} />
          ),
          headerShown: false,
        }}
       
       
      /> */}



{/* <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            // <FontAwesome name="bookmark" size={size} color={color} />
            <FontAwesome name="user" size={size} color={color} />
          ),
         
        }}
        listeners={{
          tabPress: (e) => {
            handleTabPress(e,'Saved');
          },
        }}
       
      /> */}
      {/* <Tab.Screen
        name="Trips"
        component={Profile }
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="line-graph" size={size} color={color} />
          ),
          
        }}
        listeners={{
          tabPress: (e) => {
            // e.preventDefault();
            handleTabPress(e,'Trips');
          },
        }}
        
       
      /> */}
       {/* <Tab.Screen
        name="Wallet"
        component={ Market}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-wallet" size={size} color={color} />
          ),
         
        }}

        listeners={{
          tabPress: (e) => {
            // e.preventDefault();
            handleTabPress(e,'Wallet');
          },
        }}
        

       
       
      />  */}
      
    </Tab.Navigator>

 
    
  );
};
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
export default function App() {
  const { expoPushToken, notification } = usePushNotifications();
  const data = JSON.stringify(notification, undefined, 2);
  const [Auth, setAuth]=useState(null);
  const [isAppFirstLaunched, setIsAppFirstLaunched] =useState(null);
  const [appIsReady, setAppIsReady] = useState(false);


  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);
 
 

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        // await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync()
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(()=>{
    const checkAuthAndFirstLaunch = async () => {
       try {
         // Check authentication status
         const authStatus = await AsyncStorage.getItem('Auth') || null;
         setAuth(authStatus === 'true');
 
         // Check if app is launched for the first time
         const appData = await AsyncStorage.getItem('isAppFirstLaunched') || null;
         if (appData === null) {
           setIsAppFirstLaunched(true);
           await AsyncStorage.setItem('isAppFirstLaunched', 'false');
         } else {
           setIsAppFirstLaunched(false);
         }
       } catch (err) {
         console.log('Error while checking Auth and First Launch:', err);
       }
     };
 
     checkAuthAndFirstLaunch();
   },[])
   
   if (!appIsReady) {
    return <WelcomeScreen/>
  }
 
  return (
    <AppProvider>
<NavigationContainer onLayout={onLayoutRootView} >
      {/* {
       isAppFirstLaunched !== null && Auth !== null && */}
         <Stack.Navigator initialRouteName={isAppFirstLaunched ? 'AppSlides' : Auth ? 'Tabs' : 'Login'}>
         {/* <Stack.Navigator initialRouteName={'AppSlides'}> */}
        {/* <Stack.Screen name="Home" component={Home}
        options={{
          headerShown: false,
        }}
        /> */}
           

         <Stack.Screen name="StartScreen" component={StartScreen}
          options={{
            headerShown: false,
          }}
        />

<Stack.Screen name="Order Details" component={OrderDetail}
          options={{
            headerShown: true,
          }}
        />

<Stack.Screen name="Rate Details" component={RateDetails}
          options={{
            headerShown: true,
          }}
        />

<Stack.Screen name="Live Market Rates" component={LiveRating}
          options={{
            headerShown: true,
          }}
        />

<Stack.Screen name="Live Rates" component={LiveRatestwo}
          options={{
            headerShown: true,
          }}
        />        

<Stack.Screen name="Daily Rates" component={DailyRates}
          options={{
            headerShown: true,
          }}
        />

<Stack.Screen name="Order Status" component={OrderStatus}
          options={{
            headerShown: true,
          }}
        />


<Stack.Screen name="Pending Order" component={PendingOrderDetails}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen name="In Comming Orders" component={InCommingOrderDetails}
          options={{
            headerShown: true,
          }}
        />
     <Stack.Screen name="OTPVerify" component={OTPVerify}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen name="Register As" component={RegisterAs}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen name="FillPersonalDetails" component={PersonalDetails}
          options={{
            headerShown: false,
          }}
        />

<Stack.Screen name="VerificationDetails" component={VerificationDetails}
          options={{
            headerShown: false,
          }}
        />

<Stack.Screen name="VerifyProfileStatus" component={VerifyProfileStatus}
          options={{
            headerShown: false,
          }}
        />

<Stack.Screen name="UplodeShopImage" component={UplodeShopImage}
          options={{
            headerShown: false,
          }}
        />

<Stack.Screen name="RegisterSuccessfull" component={RegisterSuccessfull}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="AppSlides" component={AppSlides}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{
            headerShown: false,
          }}
        />

<Stack.Screen name="Scrap On Wheels" component={WebViewApp}
          options={{
            headerShown: true,
          }}
        />
       
        <Stack.Screen name="Login" component={Login} options={{
            headerShown: false,
          }}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{
            headerShown: false,
          }}/>

<Stack.Screen name="About Company" component={AboutCompany} options={{
            headerShown: true,
          }}/>

<Stack.Screen name="Privacy Policy" component={PrivacyPolicy} options={{
            headerShown: true,
          }}/>
    
    <Stack.Screen name="Terms and Condition" component={TermsCondition} options={{
            headerShown: true,
          }}/>
           <Stack.Screen name="Upgrade Profile" component={UpgradeTo} options={{
            headerShown: true,
          }}/>

<Stack.Screen name="Update Kyc" component={KYC} options={{
            headerShown: true,
          }}/>

{/* <Stack.Screen name="Address" component={Address} options={{
            headerShown: true,
          }}/> */}
      
      </Stack.Navigator>
      {/* } */}
     
    </NavigationContainer>
   </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
