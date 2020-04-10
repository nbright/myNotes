import React, { memo, useState } from 'react';
import {StyleSheet, Alert} from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { theme } from '../core/theme';
import {noteValidator} from '../core/utils';
//amplify
import Auth from '@aws-amplify/auth'
import API, { graphqlOperation } from '@aws-amplify/api';
import * as mutations from '../graphql/mutations';


const Dashboard = ({ navigation }) => {

  const [note, setNote] = useState({ value: '', error: '' });
  const [bad, setBad] = useState({ value: '', error: '' });
  const [good, setGood] = useState({ value: '', error: '' });
  const [tomorrow, setTomorrow] = useState({ value: '', error: '' });
  
  const noteToSend = {
    bad: bad.value,
    good: good.value,
    tomorrow: tomorrow.value,
    description: note.value,
    username: navigation.getParam('username')
  };

  async function addNote () {
      await API.graphql(graphqlOperation(mutations.createNote, {input: noteToSend}))
         .then(() => {
          Alert.alert('Note saved')
          setBad('')
          setNote('');
          setGood('');
          setTomorrow('');
        })
        .catch(err => {
          if (! err.message) {
            console.log('Error while saving the note. ', err)
            alert('Error while saving the note.')
          } else {
            console.log('Error while saving the note. ', err.message)
            alert('Error while saving the note.')
          }
        })

  };

  //add a note
  const _onAddNotePressed = () => {
    const noteError = noteValidator(note.value);

    if (noteError) {
      setNote({ ...note, error: noteError });
      return;
    }

    addNote();
  }

  //list notes
  const _onListNotesPressed = () => {
    navigation.navigate('ListNotesScreen', {username:  navigation.getParam('username')}); 
  }

  //log out
  const _onLogOutPressed = () => {
    Auth.signOut()
    .then(data => {
      console.log(data)
      navigation.navigate('HomeScreen');      
    })
    .catch(err => console.log(err));
  }

  return (
    <Background>
      <Logo />
      <Paragraph>
        대시보드 입니다.
      </Paragraph>
      <TextInput
          label="Bad"
          returnKeyType="next"
          value={bad.value}
          onChangeText={text => setBad({ value: text, error: '' })}
          error={!!bad.error}
          errorText={bad.error}
        />
        <TextInput
          label="Good"
          returnKeyType="next"
          value={good.value}
          onChangeText={text => setGood({ value: text, error: '' })}
          error={!!good.error}
          errorText={good.error}
        />
        <TextInput
          label="Tomorrow"
          returnKeyType="next"
          value={tomorrow.value}
          onChangeText={text => setTomorrow({ value: text, error: '' })}
          error={!!tomorrow.error}
          errorText={tomorrow.error}
        />
      <TextInput
          label="Note"
          returnKeyType="next"
          value={note.value}
          onChangeText={text => setNote({ value: text, error: '' })}
          error={!!note.error}
          errorText={note.error}
        />
        <Button mode="contained" onPress={_onAddNotePressed} style={styles.button}>
          Add note
        </Button>
        <Button mode="contained" onPress={_onListNotesPressed} style={styles.button}>
          List notes
        </Button>

      <Button mode="outlined" onPress={_onLogOutPressed}>
        Logout
      </Button>
    </Background>
  );

}

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(Dashboard);
