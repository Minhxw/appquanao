import React, {useState,useEffect} from 'react';
import {View,TouchableOpacity,TextInput,Image,Text,FlatList} from 'react-native'
import { SearchComponent,SearchHeader } from '../components';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

function Search() {
  const navigation = useNavigation()
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);


  const fetchSearchResults = async () => {
    try {
      if (searchKeyword) {
        const querySnapshot = await firestore()
          .collection('products')
          .where('productName', '>=', searchKeyword.toUpperCase())
          .orderBy('productName')
          .get();
  
        const results = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    fetchSearchResults();
  }, [searchKeyword]);

  const SearchResultItem = ({ item }) => (
    <TouchableOpacity
      style={{ height: 50, justifyContent: 'center', paddingLeft: 20 }}
      onPress={() => {
        console.log('Selected:', item.category);
        navigation.navigate('Categories', { category: item.category });
      }}
    >
      <View>
        <Text style={{ fontSize: 16, color: '#000' }}>{item.productName}</Text>
   
      </View>
    </TouchableOpacity>
  );
  

 
    return ( 
        <View style={{backgroundColor:'#fff',flex:1}}>
            <SearchHeader searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword}/>
           
            <View style={{flex:1,marginTop:5}}>
            {searchKeyword && (
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <SearchResultItem item={item} />}
          />

        )}
          {searchKeyword&&(
            <TouchableOpacity style={{ height: 50, justifyContent: 'center' }}>
            
          </TouchableOpacity>
          )}
            </View>
           
            <View>

            </View>
        </View>
     );
}

export default Search;