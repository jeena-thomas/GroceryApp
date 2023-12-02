/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ComingSoon = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const forward = () => {
    Animated.timing(animatedValue, {
      toValue: 40,
      duration: 4000,
      useNativeDriver: false,
    }).start(backward);
  };

  const backward = () => {
    Animated.timing(animatedValue, {
      toValue: -50,
      duration: 4000,
      useNativeDriver: false,
    }).start(forward);
  };

  useEffect(() => {
    forward();
  }, []);

  return (
    <LinearGradient colors={['#2A4BA0', '#FFC83A']} style={styles.container}>
      <Animated.Text
        style={[
          styles.text,
          {
            fontSize: animatedValue,
          },
        ]}>
        Coming soon !!!
      </Animated.Text>
    </LinearGradient>
  );
};

export default ComingSoon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#153075',
  },
});
