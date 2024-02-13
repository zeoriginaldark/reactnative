import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  SectionList,
  ActivityIndicator,
  Image,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const applyOffsetLimit = (data, offset, limit) => {
  return data.slice(offset, offset+limit);
}

function ProductsScreen() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const offset = 0;
  const limit = 10;

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      setLoading(true);
      // const responsed = await axios.get('http://172.18.19.140:8044/api/Product/GetFood?offset=0&limit=10');
      // const responsed = await axios.get(`http://172.18.19.140:8044/api/Product/GetFoodCategory?offset=${(page - 1) * 10}&limit=10`);
      const responsed = require('./food.json');
      const response = applyOffsetLimit(responsed, offset, limit);

      const newData = response;
      if (newData.length === 0) {
        // No more data available
        console.log('No more data available.');
        return;
      }
      console.log('API Response:', response);

      const transformedSections = transformData(newData);
      console.log('Transformed Sections:', transformedSections);
      setSections(transformedSections);

      // setSections(prevSections => [...prevSections, ...transformedSections]);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderSectionHeader = ({ section: { title } }) => (
    <View>
      <Text style={styles.taskTitle}>{title}</Text>
    </View>
  );

  const ItemSeparatorView = () => {
    return (
      <View style={styles.separator} />
    );
  };

  const renderItem = ({ item: { foodName, description, price } }) => (
    <View style={styles.itemContainer}>
          <View style={styles.itemContainer}>
            {/* <Image source={{ uri: imagePath }} style={styles.itemImage} /> */}
            <View>
              <Text>{foodName}</Text>
              <Text>{description}</Text>
              <Text>${price}</Text>
            </View>
          </View>
    </View>
  );

  const renderFooter =()=>{
    if (!loading) return null;

    return(
      <View style={styles.separator}>
        <ActivityIndicator animating size={'large'}/>
      </View>
    );
  }

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <SectionList
            sections={sections}
            keyExtractor={(item, index) => item.foodId.toString() + index.toString()}
            renderSectionHeader={renderSectionHeader}
            ItemSeparatorComponent={ItemSeparatorView}
            ListFooterComponent={renderFooter}
            onEndReachedThreshold={0.1}
            onEndReached={()=>{
              if (!loading){
                setPage(prevPage=> prevPage+1);
              }
            }}
            renderItem={renderItem}
            //stickySectionHeadersEnabled
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const transformData = (data) => {
  const groupedData = data.reduce((acc, item) => {
    const category = item.categoryName || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  const sections = Object.entries(groupedData).map(([title, data]) => ({
    title,
    data,
  }));

  return sections;
};


const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: '#f5f5f5',
  },
  taskTitle: {
    backgroundColor: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 15,
    elevation: 4,
    margin: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  taskItem: {
    padding: 15,
    marginVertical: 8,
    fontSize: 18,
    backgroundColor: '#ffffff',
    elevation: 2,
    borderRadius: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  separator: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#C8C8C8',
  },
});

export default ProductsScreen;
