import { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Alert, TextInput, KeyboardAvoidingView, StyleSheet} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function ChatScreen() {
  const [webMessages, setWebMessages] = useState([]);
  const [userName, setUserName] = useState('');
  const [userMessage, setUserMessage] = useState('');

  const addChat = async() => {
    let formData = new FormData();
    formData.append('name', userName);
    formData.append('message', userMessage);
    const result = await fetch('https://cpsc345final.jayshaffstall.com/add_chat.php', {
        method: 'POST',
        body: formData
    });
    if(result.ok){
        const data = await result.json()
        console.log('Status:', data.status)
        console.log('add_chat data:', data);
        if (data.status == "error"){
            Alert.alert('Oops!', String(data.error), [
                {text: 'OK'}]);
            return;
        }
        else{
          setUserName('');
          setUserMessage('');
          getChats();
        }   
    }
    else{
        Alert.alert('Oops! Something went wrong with the API. Please try again, or come back another time.', String(result.status), [
            {text: 'OK'}]);
        return;
    }
  }

  const getChats = async() => {
    let formData = new FormData();
    formData.append('name', userName);
    formData.append('message', userMessage);
    const result = await fetch('https://cpsc345final.jayshaffstall.com/get_chats.php', {
        method: 'POST',
        body: formData
    });
    if(result.ok){
        const data = await result.json()
        console.log('Status:', data.status)
        console.log('get_chats data:', data);
        if (data.status == "error"){
            Alert.alert('Oops!', String(data.error), [
                {text: 'OK'}]);
            return;
        }
        else{
          setWebMessages(data.messages)
        }   
    }
    else{
        Alert.alert('Oops! Something went wrong with the API. Please try again, or come back another time.', String(result.status), [
            {text: 'OK'}]);
        return;
    }
  }

  return (
    <KeyboardAvoidingView behavior='position' style={styles.container} contentContainerStyle={{alignItems: 'center'}}>
      <Text style={{fontWeight:'bold', fontSize: 30, textAlign:'center'}}>
        Nick's Chat Client
      </Text>
      <Text style={{fontWeight:'200', fontSize: 20, marginTop: 15, marginBottom: 15, textAlign:'center'}}>
        Enter a name and message, then hit send to send a chat to others.{"\n"}Press fetch to load other users' chats.{"\n"}They will be loaded in oldest to newest, scroll to see more.
      </Text>
      <View style={{height:300, width: 300, alignContent: 'center'}}>
      <FlatList
        style={{marginTop: 10, alignContent: 'center'}}
        data = {webMessages}
        renderItem ={({item}) => (
        <View>
          <Text style={{fontSize: 20, marginTop: 10, marginBottom: 10, textAlign:'center'}}>
              Name: {item.name}{"\n"}Message: {item.message}
          </Text>
        </View>
        
      )}
      keyExtractor={(item, index) => index}
      />
      </View>
      <AntDesign.Button onPress={getChats} name='sync'>
        Fetch
      </AntDesign.Button>
      <TextInput value={userName} style={{width: 300, height: 30, backgroundColor: '#D3D3D3', marginTop:20, marginBottom: 10}} onChangeText={text => setUserName(text)} placeholderTextColor='#000000' textAlign='center' placeholder='Enter your Name here:'/>
      <TextInput value={userMessage} style={{width: 300, height: 30, backgroundColor: '#D3D3D3', marginBottom: 10}} onChangeText={text => setUserMessage(text)} placeholderTextColor='#000000' textAlign='center' placeholder='Enter your Message here:'/>
      <AntDesign.Button onPress={addChat} name='message1'>
        Send
      </AntDesign.Button>
      
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
