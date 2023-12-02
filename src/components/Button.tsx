import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';

/**
 * Custom Button Component.
 *
 * @param {object} props - The component's properties.
 * @param {ViewStyle} props.buttonStyle - Custom style for the button container.
 * @param {TextStyle} props.textStyle - Custom style for the button text.
 * @param {string} props.title - The text to be displayed on the button.
 * @param {() => void} props.onClick - The function to be called when the button is pressed.
 */

const Button = ({
  buttonStyle,
  textStyle,
  title,
  onClick,
}: {
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  title: string;
  onClick: () => void;
}) => {
  return (
    <TouchableOpacity style={[style.container, buttonStyle]} onPress={onClick}>
      <Text style={[style.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const style = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2A4BA0',
  },
});
