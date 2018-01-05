import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Modal from 'react-native-modal';

export default class CustomButton extends Component {
  render() {
    const { title, onPress } = this.props;

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.button}>
          <Text style={styles.text}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#D81B60',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 15,
    backgroundColor: '#EC407A',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
