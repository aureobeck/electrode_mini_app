import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Modal from 'react-native-modal';

export default class Subsection extends Component {
  render() {
    const { title, children } = this.props;

    return (
      <View style={styles.root}>
        <Text>{title}</Text>
        {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
});
