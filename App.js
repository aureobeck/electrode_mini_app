import React, { Component } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
  FlatList,
  Switch,
  TextInput,
  DatePickerIOS,
} from 'react-native';
import Modal from 'react-native-modal';
import moment from 'moment';
import CustomButton from './components/CustomButton';
import Section from './components/Section';
import Subsection from './components/Subsection';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      android: true,
      ios: true,
      isCurrentDate: true,
      date: new Date(),
      openDateDialog: false,
      message: '',
    };
  }

  sendPush = () => {
    fetch(
      'http://10.0.0.228:8080/moblee/ralf-api/api/v1_1/event/20171010minhas936/push?source=ios',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from_person: 52,
          info: this.state.message,
          link: 'push',
          mode: 'entry',
          name: 'name',
          premium: 1,
          type: 'push',
          platform: 0,
        }),
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ message: '' });
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    const { android, ios, isCurrentDate, date, openDateDialog, message } = this.state;

    return (
      <View style={styles.root}>
        <Text style={styles.title}>{'Notificações'}</Text>
        <Section title={'Plataforma'}>
          <Subsection title={'Android'}>
            <Switch
              value={android}
              onValueChange={enabled => {
                this.setState({ android: enabled });
              }}
            />
          </Subsection>
          <Subsection title={'iOS'}>
            <Switch
              value={ios}
              onValueChange={enabled => {
                this.setState({ ios: enabled });
              }}
            />
          </Subsection>
        </Section>
        <Section title={'Data'}>
          <Subsection title={'Enviar Agora'}>
            <Switch
              value={isCurrentDate}
              onValueChange={enabled => {
                this.setState({ isCurrentDate: enabled });
              }}
            />
          </Subsection>
          <Subsection title={'Agendar envio'}>
            <Switch
              value={!isCurrentDate}
              onValueChange={enabled => {
                this.setState({ isCurrentDate: !enabled });
              }}
            />
          </Subsection>
          {!isCurrentDate && (
            <TextInput
              style={{ fontSize: 12 }}
              value={moment(this.state.date).format('DD/MM/YYYY hh:mm:ss')}
              onFocus={() => this.setState({ openDateDialog: true })}
            />
          )}
        </Section>
        <Modal isVisible={openDateDialog}>
          <View style={styles.modal}>
            <DatePickerIOS
              style={{ width: 250 }}
              onDateChange={date => this.setState({ date })}
              date={date}
            />
            <View style={styles.controlButtons}>
              <CustomButton title={'OK'} onPress={() => this.setState({ openDateDialog: false })} />
              <CustomButton
                title={'CANCEL'}
                onPress={() => this.setState({ openDateDialog: false })}
              />
            </View>
          </View>
        </Modal>
        <Section title={'Mensagem'}>
          <TextInput
            style={styles.message}
            value={message}
            onChangeText={message => this.setState({ message })}
            multiline={true}
          />
          <CustomButton title={'ENVIAR'} onPress={this.sendPush} />
        </Section>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 25,
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modal: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  message: {
    fontSize: 12,
    backgroundColor: '#e8e5ee',
    borderRadius: 5,
    height: 60,
    padding: 10,
  },
});
