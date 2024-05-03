import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  // useColorScheme,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
  ImageBackground,
  // Platform,
  // Constants,
  Dimensions,
  Linking,
} from 'react-native';
// import {Colors} from 'react-native/Libraries/NewAppScreen';

function ProfileScreen() {
  // const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    flex: 1,
    backgroundColor: 'transparent',
  };

  const [isFollowed, setIsFollowed] = useState(false);

  const handleButtonPress = () => {
    setIsFollowed(!isFollowed);
  };

  const handleButtonPressTwt = () => {
    Linking.openURL('https://twitter.com'); // Replace with your Twitter URL
  };

  const handleButtonPressPnt = () => {
    Linking.openURL('https://twitter.com'); // Replace with your Twitter URL
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={styles.container}>
          <ImageBackground
            source={require('../../assets/bgimg.jpeg')}
            resizeMode="cover"
            style={styles.backgroundImage}>
            <View style={styles.txtcontainr}>
              <View style={styles.imgcontainer}>
                <Image
                  source={{
                    uri: 'https://i.pinimg.com/564x/b4/46/22/b44622ed5fe74d2062244466e1d7b1c3.jpg',
                  }}
                  style={styles.smallLogo}
                />
              </View>
              <Text style={styles.header}>Mr. Bombastic</Text>
            </View>
          </ImageBackground>
          <View style={styles.buttoncontainer}>
            <TouchableOpacity
              onPress={handleButtonPress}
              style={{
                backgroundColor: isFollowed ? '#888888' : '#ff8601',
                borderRadius: 30,
                paddingHorizontal: 20,
                paddingVertical: 10,
                marginVertical: 10,
                alignItems: 'center',
                justifyContent: 'center',
                height: 60,
                width: 110,
              }}>
              <Text style={styles.buttonText}>
                {isFollowed ? 'Followed' : 'Follow'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleButtonPressTwt}
              style={styles.circbutton}>
              <Image
                source={require('../../assets/twiter.png')}
                style={styles.circimage}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleButtonPressPnt}
              style={styles.circbutton}>
              <Image
                source={require('../../assets/pinter.png')}
                style={styles.circimage}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.straycontainer}>
            <Text style={styles.headerb}>About Me</Text>
          </View>
          <View style={styles.straycontainer}>
            <Text>Sire Bombastic is a distinguished gentleman.</Text>
            <Text>Sire Bombastic is a distinguished gentleman.</Text>
          </View>
          <View style={styles.straycontainer}>
            <Text>Sire Bombastic is a distinguished gentleman.</Text>
            <Text>Sire Bombastic is a distinguished gentleman.</Text>
          </View>
          <View style={styles.straycontainer}>
            <Text>Sire Bombastic is a distinguished gentleman.</Text>
            <Text>Sire Bombastic is a distinguished gentleman.</Text>
          </View>
          <View style={styles.straycontainer}>
            <Text>Sire Bombastic is a distinguished gentleman.</Text>
            <Text>Sire Bombastic is a distinguished gentleman.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const {height} = Dimensions.get('window');
const imageHeight = height * 0.5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txtcontainr: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 32,
  },
  button: {
    backgroundColor: '#888888',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: 110,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'white',
  },
  headerb: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
  },
  backgroundImage: {
    flex: 1,
    flexDirection: 'row',
    height: imageHeight,
    backgroundColor: 'transparent',
    paddingTop: StatusBar.currentHeight,
    justifyContent: 'center',
  },
  buttoncontainer: {
    top: -40,
    alignItems: 'center',
    marginLeft: 90,
    flexDirection: 'row',
    flex: 1,
  },
  imgcontainer: {
    alignItems: 'center',
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    // marginLeft: 150,
  },
  straycontainer: {
    flex: 1,
    alignItems: 'center',
  },
  smallLogo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  circbutton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#888888',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  circimage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  followedButton: {
    backgroundColor: '#FF8601',
  },
});

export default ProfileScreen;
