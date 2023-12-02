import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

/**
 * Custom Card Component.
 * Displays a card with an image and promotional text.
 */

const Card = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/png/image.png')} />
      <View>
        <Text style={styles.title}>Get</Text>
        <Text style={styles.title1}>50% OFF</Text>
        <Text style={styles.title2}>on first 03 Order</Text>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9B023',
    borderRadius: 10,
    width: 250,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 10,
  },
  title: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'Manrope',
    fontWeight: '300',
  },
  title1: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 26,
    fontFamily: 'Manrope',
    fontWeight: '800',
  },
  title2: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 13,
    fontFamily: 'Manrope',
    fontWeight: '300',
  },
});
