import React, { useEffect, useRef } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, View,Dimensions,TouchableOpacity, Image,Animated } from 'react-native'
import { StatusBar } from 'expo-status-bar';
const {width, height} = Dimensions.get('window');
import Asset21 from "../../Images/Onbording.png"
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
const slides =[
  {
    id:'1',
    image:Asset21,
    title1:"Scrap, Craft, ",
    title2:"",
    colorTitle:"Adore",
    subtitle:`The EV market is extremely fragmented and challenging for consumers to navigate because it is made up of multiple Charge Point Operators each providing their own charging options,making it tedious for users`
  },
  {
    id:'2',
    image:Asset21,
    title1:"Scrap Treasures ",
    title2:"",
    colorTitle:"Await!",
    subtitle:`With an increase in charge point operators every year, this fragmentation and complexity will grow deeper! The eMobility market will be more complicated without an open eRoaming network, hence the need for Open Collaboration`
  },
  {
    id:'3',
    image:Asset21,
    title1:"Scrap Collection ",
    title2:"",
    colorTitle:"Bliss",
    subtitle:`With the largest user base of EV owners, InterCharge network will be the easiest approach to grow your business and access new markets.`
  }
]

const Slide = ({item}) => {
  return (
    <View style={{alignItems:"left",marginTop:30,width:width}}>
      <View style={{alignItems:"left",padding:10,height:"30%",justifyContent:"center"}}>
      <Text style={{fontSize:39,fontWeight:500}}>{item?.title1}</Text>
      {item.title2 !== "" && <Text style={{fontSize:39,fontWeight:500}}>{item?.title2}</Text>}
      <Text style={{fontSize:35,color:"#FF4000",fontWeight:600}}>{item?.colorTitle}</Text>
      </View>
      

      <View style={{alignItems:"center",height:"45%"}}>
      <Image
        source={item?.image}
        style={{resizeMode: 'contain'}}
      />
      </View>
    </View>
  );
};
export const AppSlides = ({navigation}) => {
  
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({offset});
    setCurrentSlideIndex(lastSlideIndex);
  };
  const HandelGetStarted=()=>{
    navigation.replace("Login")
  }


  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.15,
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
        {/* Indicator container */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          {/* Render indicator */}
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor:"#40A99E",
                  width: 10
                },
              ]}
            />
          ))}
        </View>

        {/* Render buttons */}
        <View style={{marginBottom: 20}}>
          {currentSlideIndex == slides.length - 1 ? (
            <View style={{height: 50}}>
              <TouchableOpacity
                style={styles.btn}
                onPress={HandelGetStarted}>
                <Text style={{fontWeight: 'bold', fontSize: 15,color:"#FFF"}}>
                  GET STARTED
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.btn,
                  {
                    borderColor:"black",
                    borderWidth: 1,
                    backgroundColor: 'transparent',
                  },
                ]}
                onPress={skip}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    color:"black",
                  }}>
                  SKIP
                </Text>
              </TouchableOpacity>
              <View style={{width: 15}} />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={goToNextSlide}
                style={styles.btn}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    color:"#FFF"
                  }}>
                  NEXT
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  const DoneButton=({...props})=>{
    return(
       <TouchableOpacity style={styles.DoneButton} {...props}>
        <Text style={{fontWeight:"bold"}}>Done</Text>
       </TouchableOpacity>
    )
  }

  const NextButton=({...props})=>{
    return(
       <TouchableOpacity style={styles.DoneButton} {...props}>
        <Text style={{fontWeight:"bold"}}>Next</Text>
       </TouchableOpacity>
    )
  }
  const Square = ({ isLight, selected }) => {
    let backgroundColor;
    if (isLight) {
      backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';
    } else {
      backgroundColor = selected ? '#fff' : 'rgba(255, 255, 255, 0.5)';
    }
    return (
      <View
        style={{
          width: 6,
          height: 6,
          marginHorizontal: 3,
          backgroundColor,
        }}
      />
    );
  };
  const SkipButton=({...props})=>{
    return(
       <TouchableOpacity style={styles.SkipButton} {...props}>
        <Text style={{fontWeight:"bold"}}>Skip</Text>
       </TouchableOpacity>
    )
  }
  const animationRef = useRef(null);
  useEffect(() => {
    animationRef.current?.play();

    // Or set a specific startFrame and endFrame with:
    animationRef.current?.play(10, 80);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
        <StatusBar style="dark" hidden={true} />
      <Onboarding
      onDone={HandelGetStarted}
      onSkip={HandelGetStarted}
      containerStyles={{paddingHorizontal:15}}
      bottomBarHighlight={false}
      DoneButtonComponent={DoneButton}
      NextButtonComponent={NextButton}
      SkipButtonComponent={SkipButton}
      titleStyles={{fontWeight:"bold",color: '#333333' }}
      subTitleStyles={{color: '#333333' }}
      // DotComponent={Square}
  pages={[
    {
      backgroundColor: '#a7f3d0',
      image:(
        <View>
           <LottieView
      ref={animationRef}
      style={styles.lottie}
     
      
      source={require('../../../assets/Animations/Animation - 1694769143135.json')}
      autoPlay={true} loop={true}
    />
         
          
        </View>
      ),
      title: 'Buying Your Scrap at  Your Doorstep ',
      subtitle: '',
  
    },
    {
      backgroundColor: '#fef3c7',
      image:(
        <View>
           <LottieView
         style={styles.lottie}
         source={require('../../../assets/Animations/Animation - 1694768707423.json')}
      autoPlay loop
    />
         
          
        </View>
      ),
      title: 'Maximum Price for Scrap Guaranteed',
      subtitle: '',
      
    },
    {
      backgroundColor: '#FFE5E5',
      image:(
        <View>
           <LottieView
   source={require('../../../assets/Animations/Animation - 1694769001609.json')}
      style={styles.lottie}
     
      autoPlay loop
    />
         
          
        </View>
      ),
      title: '100% Secured & Tested Weighing Scales ',
      subtitle: '',
    },

  ]}
/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:"#FFF"
  },
  lottie:{
  width:width*0.9,
  height:width
  },
  DoneButton:{
   padding:20,
   backgroundColor:"white",
   borderRadius:50,
   borderTopEndRadius:0,
   borderBottomEndRadius:0
  },
  SkipButton:{
    padding:20,
    backgroundColor:"white",
    borderRadius:50,
    borderTopStartRadius:0,
    borderBottomStartRadius:0
   },
  subtitle: {
    color:"black",
    fontSize: 20,
    marginTop: 10,
  
    textAlign: 'left',
    lineHeight: 23,
    letterSpacing:0.3
  },
  title: {
    color:"black",
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  indicator: {
    height: 10,
    width: 10,
    backgroundColor: 'grey',
    marginHorizontal: 3,
    borderRadius: 52,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#40A99E',
    justifyContent: 'center',
    alignItems: 'center',
  },

  });
