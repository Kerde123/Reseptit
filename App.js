import { StatusBar } from 'expo-status-bar';
import { Alert, FlatList, StyleSheet, Text, View, Button, TextInput, Image, ImageBackground } from 'react-native';
import React, { useState } from 'react';

export default function App() {

  const [keyword, setKeyword] = useState('');
  const [repositories, setRepositories] = useState([]);

  const getRepositories = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
    .then(response => response.json())
    .then(responseJson => setRepositories(responseJson.meals))
    .catch(error => { 
      Alert.alert('Error', error.message); 
    });    
  }

  const ItemSeparator = () => 
  <View style={{
      height: 1,
      width: "100%",
      backgroundColor: "grey"
    }}
    /> 

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <FlatList
      keyExtractor= {(item, index) => index.toString()}
      renderItem={({ item }) => 
      <View> 
        <Text>{item.strMeal}</Text>
        <Image 
        style={{width:100,height:100}} 
        source = {{uri: `${item.strMealThumb}`}}
        />
        </View>
        }
        data={repositories}
      ItemSeparatorComponent={ItemSeparator} />
      <TextInput style = {{fontSize: 20, width: 300}}
        placeholder = 'keyword'
        onChangeText = {text => setKeyword(text)}
        value = {keyword} />
      <Button title = "Find" onPress = {getRepositories} />
    </View>
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
