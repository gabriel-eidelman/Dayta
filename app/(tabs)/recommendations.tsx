import { View, Dimensions, Text, Platform, SafeAreaView, Button, Animated, Easing} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import {useState, useEffect, useRef} from 'react'
import FetchDayActivities from '@/Data/FetchDayActivities';
import { useAuth } from '@/contexts/AuthContext';
import { Activity, Card } from '@/Types/ActivityTypes';
import { useCustomSet } from '@/Data/CustomSet';
import { useAppContext } from '@/contexts/AppContext';
import Swiper from 'react-native-deck-swiper';
import LogicModal from '@/components/Modals/LogicModal'
import CustomButton from '@/components/Custom/CustomButton'
import {PremadeCards} from '@/Data/PremadeCards'
import layout_styles from '@/styles/reusable/layoutStyles';
import font_styles from '@/styles/reusable/typography';
import styles from '@/styles/recommendationsStyles'

//import firestore from '@react-native-firebase/firestore'

const { width, height } = Dimensions.get('window');
const buttonWidth = width/6.25

//pass in activities, times
//convert to local time

const decimalToTime = (decimal: number): string => {
  // Extract hours and minutes from the decimal number
  const hours = Math.floor(decimal);
  const minutes = Math.round((decimal - hours) * 60);

  // Format minutes to always be two digits
  const formattedMinutes = minutes.toString().padStart(2, '0');

  // Return time in 'H:MM' format
  return `${hours}:${formattedMinutes}`;
};

export default function Recommendations() {
  const {state} = useCustomSet();
  const {sleepSum, avgLoggedTimeDaily} = state
  const [logicModalVisible, setLogicModalVisible] = useState<boolean>(false);

  const calculateExerciseScore = (light: number, mod: number, vig: number) => {
    const lightScore = light/300;
    const modScore = mod/150;
    const vigScore = vig/75;

    const totalScore = (lightScore+modScore+vigScore)
    return totalScore
  }

  const [cards, setCards] = useState<Card[]>(PremadeCards);

  const generateCards = () => {

    let customizedCards: Card[] = []
    const wasEnteredSleepDay = (val: any[]) => {
      if(val[1][0]>0) {
        if(val[2][0]>0) {
          return 1
        }
        else {
          return 0
        }
      }
      else {
        return 0
      }

    }
    const numEnteredSleepDays = sleepSum.reduce((accumulator, currentValue) => accumulator + (wasEnteredSleepDay(currentValue)), 0)
    
    if(avgLoggedTimeDaily<8) {
      if (numEnteredSleepDays<=4) {
      const impact = 10
      customizedCards = [{...PremadeCards[0], impactScore: impact, recDetails: `In order to generate meaningful recommendations, we need enough information. This is gathered completely through the journal. Over the last two weeks, you have only logged an average of ${Math.round(avgLoggedTimeDaily/3600)} hours each day. The benchmark to aim for is 8 hours a day. We believe this is realistic and will give us enough to generate real stats and recommendations. The more the merrier though! We additionally see that you have only entered both sleep and wake times for ${numEnteredSleepDays} of the past 12 days. It's very easy and quick to enter this so get in the habit of doing it! For now, recommendations will be general and untailored. Feel free to scroll nonetheless to learn about the most important principles! For detailed suggestions on improving your logging habits, click below!`}, ...PremadeCards]
    }
      else {
      const impact = 8
      customizedCards = [{...PremadeCards[0], impactScore: impact, recDetails: `In order to generate meaningful recommendations, we need enough information. This is gathered completely through the journal. Over the last two weeks, you have only logged an average of ${Math.round(avgLoggedTimeDaily/3600)} hours each day. The benchmark to aim for is 8 hours a day. We believe this is realistic and will give us enough to generate real stats and recommendations. The more the merrier though! Since you have entered adequate data about sleep (great job!), we are able to offer some sleep-related recommendations. Feel free to scroll nonetheless for these, as well as general ones to learn! For detailed suggestions on improving your logging habits, click below!`}, ...PremadeCards]

      }
    }
  
    else {
      //here's where we can get down to the nitty gritty, generating statistics from the day/sleep info and then offering related recs.
      customizedCards = [PremadeCards[1], PremadeCards[2], PremadeCards[3], PremadeCards[4]]
      // customizedCards.sort((a, b) => b.impactScore-a.impactScore)
    }
    
    setCards(customizedCards)
  }

  useEffect(() => {
    generateCards()
  }, [avgLoggedTimeDaily])
  const swiperRef = useRef<any>(null);
  const [cardIndex, setCardIndex] = useState(0);

  const diveInPressed = () => {
    setLogicModalVisible(true);
  }

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.jumpToCardIndex(cardIndex);
    }
  }, [cardIndex]);

  const onSwipedRight = () => {
    if (cardIndex > 0) {
      setCardIndex(cardIndex - 1);
    }
  };

  const onSwipedLeft = () => {
    if (cardIndex < cards.length - 1) {
      setCardIndex(cardIndex + 1);
    }
  };
  
  const arrowTranslateX = useRef(new Animated.Value(-50)).current; // Start with the arrow off-screen

  const animateArrow = () => {
    Animated.sequence([
      Animated.timing(arrowTranslateX, {
        toValue: 0, // Move the arrow into view
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(arrowTranslateX, {
        toValue: -50, // Move the arrow back out of view
        duration: 800,
        delay: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Loop the animation
      animateArrow();
    });
  };
  useEffect(() => {
    animateArrow();
  }, [cardIndex]);
  const {user} = useAuth();
  // useEffect(() => {
  //   FetchDayActivities(user, 0, justActivities, setTodayActivities, true)
  // }, [justActivities])


  const renderCard = (card: any) => {
    return (
      <View style={styles.recContainer}>
        <View style={styles.recTitle}>
          <Text style={font_styles.h2}>{card.title}</Text>
        </View>
        <View style={styles.recCategory}>
          <Text style={font_styles.h3}>Category: </Text>
          <Text style={font_styles.body}>{card.recCategory}</Text>
        </View>
        <View style={styles.recCategory}>
          <Text style={font_styles.h3}>Impact Score: </Text>
          <Text style={font_styles.body}>{card.impactScore}/10</Text>
        </View>
        <View style={styles.recCategory}>
          {/* <Text style={[font_styles.h3, {gap: 10}]}>Details: </Text> */}
          <Text style={font_styles.body}>{card.recDetails}</Text>
        </View>
        <View style={styles.diveInButtonContainer}>
          <Button title="Dive In" onPress={diveInPressed} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.layoutContainer}>
      {/* Modals */}
      <LogicModal visible={logicModalVisible} card={cards[cardIndex]} onClose={() => setLogicModalVisible(false)}/>

      <View style={layout_styles.titleContainer}>
        <Text style={font_styles.headerStyle}>Recommendations</Text>
      </View>
      <View style={styles.bodyContainer}>
          <Swiper
            ref={swiperRef}
            cards={cards}
            cardIndex={cardIndex}
            renderCard={renderCard}
            onSwipedRight={onSwipedRight}
            onSwipedLeft={onSwipedLeft}
            stackSize={1}
            disableTopSwipe
            disableBottomSwipe
            disableRightSwipe={cardIndex <= 0} // Disable right swipe at the last card
            disableLeftSwipe={cardIndex >= cards.length - 1} // Disable left swipe at the first card
            animateCardOpacity
            cardHorizontalMargin={0}
            cardVerticalMargin={0}
            // useViewOverflow={Platform.OS === 'ios'}
            infinite={false}
            showSecondCard={false}
            backgroundColor='transparent'
            key={cardIndex}  // Force re-render on card index change
            stackSeparation={15}
            // overlayLabels={{
            //   left: {
            //     title: 'Next',
            //     style: {
            //       label: {
            //         backgroundColor: 'green',
            //         borderColor: 'green',
            //         color: 'white',
            //         borderWidth: 1,
            //       },
            //       wrapper: {
            //         flexDirection: 'column',
            //         alignItems: 'flex-end',
            //         justifyContent: 'flex-start',
            //         marginTop: 20,
            //         marginLeft: -20,
            //       },
            //     },
            //   },
            //   right: {
            //     title: 'Prev',
            //     style: {
            //       label: {
            //         backgroundColor: 'green',
            //         borderColor: 'green',
            //         color: 'white',
            //         borderWidth: 1,
            //       },
            //       wrapper: {
            //         flexDirection: 'column',
            //         alignItems: 'flex-start',
            //         justifyContent: 'flex-start',
            //         marginTop: 20,
            //         marginLeft: 20,
            //       },
            //     },
            //   },
            // }}
          />
          </View>
        <Animated.View style={[styles.arrowContainer, { transform: [{ translateX: arrowTranslateX }] }]}>
        <Text style={styles.arrowText}>→</Text>
      </Animated.View>
    </View>
  );
}