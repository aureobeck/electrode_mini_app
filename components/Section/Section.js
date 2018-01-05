import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Modal from 'react-native-modal';

export default class Section extends Component {
  render() {
    const { title, children } = this.props;
    return (
      <View style={styles.root}>
        <Text style={styles.title}>{title}</Text>
        {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'column',
    marginBottom: 10,
    marginTop: 10,
  },
  title: {
    fontSize: 15,
    alignSelf: 'flex-start',
    padding: 10,
    fontWeight: 'bold',
  },
});
