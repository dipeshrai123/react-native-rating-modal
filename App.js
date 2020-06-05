import React, { useState, useRef, useEffect } from "react";
import { 
  StyleSheet, 
  Text, 
  View,
  Button,
  Animated,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
  Keyboard
} from "react-native";
import { AirbnbRating } from "react-native-ratings";
import Icon from "react-native-vector-icons/AntDesign";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export default function App() {

  const modalAnimation = useRef(new Animated.Value(0)).current;
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ ratingFeedback, setRatingFeedback ] = useState("");

  const ratingCompleted = async () => {
    setRatingFeedback("Thank you for your feedback!");
  };

  const openRatingModal = () => {
    Animated.spring(modalAnimation, {
      toValue: 1,
    }).start();
  };

  const closeRatingModal = () => {
    Animated.timing(modalAnimation, {
      toValue: 0,
      duration: 200,
    }).start(() => {
      setModalVisible(false);
    });
  };

  useEffect(() => {
    if(modalVisible) {
      openRatingModal();
    }
  }, [ modalVisible ]);

  const modalContainerInterpolate = modalAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const modalTopContainerInterpolate = modalAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 0],
  });

  const modalBottomContainerInterpolate = modalAnimation.interpolate(
    {
      inputRange: [0, 1],
      outputRange: [50, 0],
    },
  );

  const closeButtonInterpolate = modalAnimation.interpolate({
    inputRange: [0.5, 1],
    outputRange: [-80, 0]
  });

  const modalContainerStyle = {
    opacity: modalContainerInterpolate,
  };

  const modalTopContainerStyle = {
    transform: [{ translateY: modalTopContainerInterpolate }],
  };

  const modalBottomContainerStyle = {
    transform: [{ translateY: modalBottomContainerInterpolate }],
  };

  const closeButtonStyle = {
    transform: [
      { translateY: closeButtonInterpolate },
      { translateX: -45 / 2 }
    ]
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>

        {
          modalVisible 
          &&
          <Animated.View
            style={[styles.modalContainer, modalContainerStyle]}
          >
            <Animated.View
              style={[styles.modalRating, modalTopContainerStyle]}>
              <View style={styles.modalRatingHeader}>
                <Text style={styles.modalRatingHeaderText}>Rating Modal</Text>
              </View>

              <View style={styles.ratingIconContainer}>
                <View style={styles.ratingIcon}>
                  <View style={styles.extraHeight} />

                  <AirbnbRating
                    selectedColor="#009933"
                    count={5}
                    showRating={false}
                    size={16}
                    defaultRating={4}
                    onFinishRating={ratingCompleted}
                  />
                </View>

                <Text style={[styles.ratingDescription]}>{ ratingFeedback }</Text>
              </View>
            </Animated.View>

            <Animated.View
              style={[styles.writeReviewContainer, modalBottomContainerStyle]}
            >
              <View style={styles.reviewText}>
                <TextInput 
                  style={styles.reviewTextInput} 
                  placeholder="Write your review..." 
                />
              </View>

              <TouchableOpacity style={styles.publishButton}>
                <Text style={styles.publichButtonText}>
                  PUBLISH
                </Text>
              </TouchableOpacity>
            </Animated.View>

            <TouchableWithoutFeedback onPress={closeRatingModal}>
              <Animated.View style={[styles.closeButton, closeButtonStyle]}>
                <Icon name="closecircle" size={40} color="#007E34" />
              </Animated.View>
            </TouchableWithoutFeedback>
          </Animated.View>
        }      

        <Button 
          title="Open Modal"
          onPress={() => setModalVisible(true)}
          color="#27D"
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 2,
    alignItems: 'center',
    paddingTop: 150
  },
  modalRating: {
    backgroundColor: '#FFF',
    width: SCREEN_WIDTH * 0.8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    marginTop: 80,
  },
  modalRatingHeader: {
    borderBottomColor: '#E2F2E8',
    borderBottomWidth: 1,
  },
  modalRatingHeaderText: {
    paddingTop: 18,
    paddingBottom: 15,
    textAlign: 'center',
    color: '#353535',
    fontSize: 20,
    fontWeight: "bold",
  },
  ratingIconContainer: {
    paddingVertical: 10,
  },
  ratingIcon: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  ratingIconImage: {
    width: 120,
    resizeMode: 'contain',
  },
  ratingDescription: {
    textAlign: 'center',
    paddingBottom: 10,
    color: '#007E34',
  },
  writeReviewContainer: {
    marginTop: 6,
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    width: SCREEN_WIDTH * 0.8,
    elevation: 10,
  },
  reviewText: {
    padding: 26,
  },
  reviewTextInput: {
    borderWidth: 1,
    borderColor: '#E1E1E1',
    padding: 18,
    borderRadius: 4,
  },
  publishButton: {
    marginHorizontal: 26,
    height: 60,
    paddingVertical: 18,
    borderColor: '#E1E1E1',
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 4,
    marginBottom: 26,
    shadowOffset: { width: 0, height: 10 },
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 1,
  },
  publichButtonText: {
    color: '#007E34',
    textAlign: 'center',
    borderRadius: 4,
    fontWeight: "bold"
  },
  closeButton: {
    backgroundColor: "#FFF",
    width: 50,
    height: 50,
    position: "absolute",
    top: 160,
    left: "50%",
    paddingTop: 4,
    borderRadius: 60 / 2,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6
  },
  extraHeight: {
    height: 10
  }
});
