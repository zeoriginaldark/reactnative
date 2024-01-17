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
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const MemoizedProductItem = React.memo(({item, onPress}) => {
  return (
    <View>
      <Text style={styles.taskItem} onPress={() => onPress(item)}>
        {item.title}
      </Text>
    </View>
  );
});

function ProductsScreen() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://dummyjson.com/products');
      const {products: newProducts, total, limit} = response.data;
      const newSections = [
        {
          title: 'Products', // You can customize this header
          data: newProducts,
        },
      ];

      setSections(prevSections => [...prevSections, ...newSections]);
      setTotalPages(Math.ceil(total / limit));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const renderFooter = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }
    return null;
  };

  const renderSectionHeader = ({section: {title}}) => (
    <View>
      <Text style={styles.taskTitle}>{title}</Text>
    </View>
  );

  // eslint-disable-next-line react/no-unstable-nested-components
  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View style={styles.separator} />
    );
  };

  const getItem = item => {
    //Function for click on an item
    // eslint-disable-next-line no-alert
    alert('Id : ' + item.id + ' Title : ' + item.title);
  };

  const renderItem = ({item}) => {
    // Render each product item here
    return <MemoizedProductItem item={item} onPress={getItem} />;
  };

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

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
            keyExtractor={(item, index) => item.id.toString() + index}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            ItemSeparatorComponent={ItemSeparatorView}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.1}
            ListFooterComponent={renderFooter}
            stickySectionHeadersEnabled
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 32,
    backgroundColor: '#eafffe',
  },
  itemStyle: {
    padding: 20,
    fontSize: 16,
    color: 'black', // Adjust as needed
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
    backgroundColor: 'white',
  },
  separator: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#C8C8C8',
  },
  taskItem: {
    padding: 10,
    marginVertical: 15,
    fontSize: 16,
  },
  taskTitle: {
    backgroundColor: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    elevation: 4,
    margin: 10,
    marginBottom: 0,
    borderRadius: 10,
  },
});

export default ProductsScreen;
