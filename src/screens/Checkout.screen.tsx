/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Button from '../components/Button';
import {StackEnum} from '../enums/stackEnums';
import {RootStackParamList} from '../routes/Root.stack';

const Checkout = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const animatedValue = useRef(new Animated.Value(0)).current;

  const moveRightX = () => {
    Animated.timing(animatedValue, {
      toValue: 50,
      duration: 4000,
      useNativeDriver: false,
    }).start(moveLeftX);
  };

  const moveLeftX = () => {
    Animated.timing(animatedValue, {
      toValue: -50,
      duration: 4000,
      useNativeDriver: false,
    }).start(moveRightX);
  };

  useEffect(() => {
    moveRightX();
  }, []);

  return (
    <Animated.View style={styles.container}>
      <Animated.Text
        style={[
          styles.text,
          {
            transform: [{translateX: animatedValue}],
          },
        ]}>
        Thanks For Shopping with us :)
      </Animated.Text>

      <Button
        buttonStyle={styles.button}
        textStyle={{color: '#fff'}}
        title="Home"
        onClick={() => {
          navigation.navigate(StackEnum.HOME);
        }}
      />
    </Animated.View>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    backgroundColor: '#2A4BA0',
    borderColor: '#2A4BA0',
    width: 150,
    height: 50,
    marginTop: 100,
  },
  text: {
    fontSize: 20,
    color: '#153075',
  },
});
