import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

import {Favourites, SelectedFav} from '../assets';
import productSlice, {ProductList} from '../redux/slices/product.slice';
import {StackEnum} from '../enums/stackEnums';
import {RootState} from '../redux/store/root.reducer';
import {RootStackParamList} from '../routes/Root.stack';

const ProductCard = (props: ProductList) => {
  const {images, title, price, id, thumbnail} = props;
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {favourites, cartItems} = useSelector(
    (state: RootState) => state.product,
  );

  /** Function to handle product click, dispatches an action and navigates to the product screen. */
  const onProductClick = () => {
    dispatch(productSlice.actions.getProduct(id));
    navigation.navigate(StackEnum.PRODUCT);
  };

  /** Function to handle adding/removing products from favorites. */
  const handleFavourites = () => {
    if (favourites?.findIndex((item: ProductList) => item?.id === id) === -1) {
      dispatch(productSlice.actions.setFavourites([...favourites, props]));
    } else {
      const newFav = favourites?.filter((item: ProductList) => item?.id !== id);
      dispatch(productSlice.actions.setFavourites([...newFav]));
    }
  };

  /** Function to toggle adding/removing products from the cart. */
  const toggleCartItems = () => {
    const itemIndex = cartItems.findIndex(
      (item: ProductList) => item?.id === id,
    );

    if (itemIndex === -1) {
      dispatch(
        productSlice.actions.setCartItems([
          ...cartItems,
          {...props, quantity: 1},
        ]),
      );
    } else {
      const newCart = cartItems?.filter((item: ProductList) => item?.id !== id);
      dispatch(productSlice.actions.setCartItems([...newCart]));
    }
  };

  return (
    <TouchableOpacity style={style.container} onPress={onProductClick}>
      <TouchableOpacity style={{marginBottom: 5}} onPress={handleFavourites}>
        {favourites?.findIndex((item: ProductList) => item?.id === id) ===
        -1 ? (
          <Favourites />
        ) : (
          <SelectedFav />
        )}
      </TouchableOpacity>
      {images.length ? (
        <Image
          source={{uri: thumbnail}}
          width={100}
          height={100}
          style={style.image}
        />
      ) : (
        <Image
          source={require('../assets/png/image.png')}
          tintColor={'#A1ABC0'}
          style={{alignSelf: 'center'}}
        />
      )}
      <View style={style.priceContainer}>
        <View>
          <Text style={style.price}>${price}</Text>
          <Text style={style.title}>{title}</Text>
        </View>
        <TouchableOpacity onPress={toggleCartItems}>
          <View style={style.cart}>
            <Text style={{color: '#FFF', fontSize: 15, fontWeight: '400'}}>
              {cartItems?.findIndex((item: ProductList) => item?.id === id) ===
              -1
                ? '+'
                : '-'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const style = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FB',
    borderRadius: 12,
    width: 160,
    padding: 15,
  },
  image: {
    borderRadius: 10,
    marginRight: 10,
    alignSelf: 'center',
  },
  title: {
    fontFamily: 'Manrope',
    fontSize: 12,
    fontWeight: '400',
    color: '#616A7D',
    paddingVertical: 5,
  },
  cart: {
    backgroundColor: '#2A4BA0',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Manrope',
    color: '#1E222B',
  },
});
