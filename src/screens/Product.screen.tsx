import React from 'react';
import {
  Dimensions,
  Image,
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import Carousel from 'react-native-snap-carousel';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {Back, CartBlack, Favourites, SelectedFav} from '../assets';
import Button from '../components/Button';
import {RootState} from '../redux/store/root.reducer';
import productSlice, {ProductList} from '../redux/slices/product.slice';
import {StackEnum} from '../enums/stackEnums';
import {RootStackParamList} from '../routes/Root.stack';

const width = Dimensions.get('screen').width;

const Product = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  const {product, cartItems, favourites} = useSelector(
    (state: RootState) => state.product,
  );

  if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const renderItem = ({item}: {item: string}) => {
    return (
      <Image
        source={{uri: item}}
        width={width / 1.1}
        height={250}
        style={{borderRadius: 10, marginRight: 10}}
      />
    );
  };

  /** Function to add the product to the cart */
  const handleAddToCart = () => {
    const itemIndex = cartItems.findIndex(
      (item: ProductList) => item?.id === product?.id,
    );

    if (itemIndex === -1) {
      dispatch(
        productSlice.actions.setCartItems([
          ...cartItems,
          {...product, quantity: 1},
        ]),
      );
    } else {
      navigation.navigate(StackEnum.CART);
    }
  };

  /** Function to handle favorites items */
  const handleFavourites = () => {
    if (
      favourites?.findIndex((item: ProductList) => item?.id === product?.id) ===
      -1
    ) {
      dispatch(productSlice.actions.setFavourites([...favourites, product]));
    } else {
      const newFav = favourites?.filter(
        (item: ProductList) => item?.id !== product?.id,
      );
      dispatch(productSlice.actions.setFavourites([...newFav]));
      LayoutAnimation.configureNext(layoutAnimConfig);
    }
  };

  const layoutAnimConfig = {
    duration: 300,
    update: {
      type: LayoutAnimation.Types.easeInEaseOut,
    },
    delete: {
      duration: 100,
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Back />
        </TouchableOpacity>
        <TouchableOpacity
          style={{position: 'relative'}}
          onPress={() => {
            navigation.navigate(StackEnum.CART);
          }}>
          <CartBlack />
          <View style={styles.round}>
            <Text style={styles.favText}>{cartItems?.length}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 10}}>
        <Text style={{fontSize: 20, fontWeight: '400', color: '#000'}}>
          {product.brand}
        </Text>
        <Text style={{fontSize: 30, fontWeight: '800', color: '#000'}}>
          {product.title}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <StarRatingDisplay
            rating={product.rating}
            maxStars={5}
            starSize={25}
          />
          <Text style={styles.review}>110 Reviews</Text>
        </View>
        <View style={{position: 'relative'}}>
          <TouchableOpacity style={styles.fav} onPress={handleFavourites}>
            {favourites?.findIndex(
              (item: ProductList) => item?.id === product?.id,
            ) === -1 ? (
              <Favourites />
            ) : (
              <SelectedFav />
            )}
          </TouchableOpacity>
          <Carousel
            data={product.images}
            renderItem={renderItem}
            sliderWidth={width}
            itemWidth={width}
          />
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${product.price}</Text>
          <View style={styles.percentage}>
            <Text style={{color: '#FFF'}}>
              {product.discountPercentage} % OFF
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          buttonStyle={styles.cart}
          title={
            cartItems.findIndex(
              (item: ProductList) => item?.id === product?.id,
            ) !== -1
              ? 'Go to Cart'
              : 'Add To Cart'
          }
          onClick={() => handleAddToCart()}
        />
        <Button
          buttonStyle={styles.buy}
          textStyle={{color: '#FFF'}}
          title={'Buy Now'}
          onClick={() => {
            navigation.navigate(StackEnum.CHECKOUT);
          }}
        />
      </View>
      <View style={{marginVertical: 20}}>
        <Text style={styles.details}>Details</Text>
        <Text style={styles.desc}>{product.description}</Text>
      </View>
    </ScrollView>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: Platform.OS === 'ios' ? width / 5 : 10,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 10,
  },
  round: {
    position: 'absolute',
    top: -8,
    right: -10,
    backgroundColor: '#F9B023',
    width: 20,
    height: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  favText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  fav: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    height: 58,
    width: 58,
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  desc: {
    fontSize: 16,
    fontWeight: '400',
    color: '#8891A5',
    paddingVertical: 5,
    textAlign: 'justify',
  },
  cart: {
    borderRadius: 20,
    borderColor: '#2A4BA0',
    width: 150,
    height: 50,
  },
  buy: {
    borderRadius: 20,
    backgroundColor: '#2A4BA0',
    borderColor: '#2A4BA0',
    width: 150,
    height: 50,
  },
  review: {
    fontSize: 14,
    fontWeight: '400',
    color: '#A1A1AB',
  },
  priceContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    alignItems: 'center',
  },
  price: {
    color: '#2A4BA0',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 10,
  },
  percentage: {
    backgroundColor: '#2A4BA0',
    borderRadius: 70,
    padding: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  details: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
  },
});
