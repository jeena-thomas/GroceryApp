import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Back} from '../assets';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store/root.reducer';
import productSlice, {ProductList} from '../redux/slices/product.slice';
import Button from '../components/Button';
import {StackEnum} from '../enums/stackEnums';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../routes/Root.stack';

const width = Dimensions.get('screen').width;

const Cart = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  const {cartItems} = useSelector((state: RootState) => state.product);

  /** Function to remove a product from the cart */
  const onRemoveItem = (id: string) => {
    dispatch(productSlice.actions.removeProduct(id));
  };

  /** Function to add a quantity of a product in the cart */
  const onAddItem = (id: string) => {
    dispatch(productSlice.actions.addProduct(id));
  };

  const renderItem = ({item}: {item: ProductList}) => {
    return (
      <View style={styles.card}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={{uri: item.thumbnail}}
            width={36}
            height={36}
            style={styles.image}
          />

          <View style={{alignItems: 'flex-start'}}>
            <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
              <Text style={[styles.text, {width: width / 2}]}>
                {item?.title}
              </Text>
            </View>
            <Text style={styles.text}>${item?.price}</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={styles.round}
            onPress={() => onRemoveItem(item?.id)}>
            <Text style={styles.text}>-</Text>
          </TouchableOpacity>
          <Text style={{marginHorizontal: 1, color: '#000'}}>
            {item?.quantity ?? 1}
          </Text>
          <TouchableOpacity
            style={styles.round}
            onPress={() => onAddItem(item?.id)}>
            <Text style={styles.text}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Calculate total price of items in the cart
  const calculateTotalPrice = (items: ProductList[]): number => {
    return items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };
  const totalPrice: number = calculateTotalPrice(cartItems);

  // Calculate total discount on items in the cart
  const calculateTotalDiscount = (items: ProductList[]): number => {
    return items.reduce((total, item) => {
      const itemPrice = item.price * (1 - item.discountPercentage / 100);
      const originalPrice = item.price * item.quantity;
      const itemDiscount = originalPrice - itemPrice * item.quantity;
      return total + itemDiscount;
    }, 0);
  };
  const totalDiscount = calculateTotalDiscount(cartItems);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Back />
        </TouchableOpacity>
        <Text style={styles.title}>Shopping Cart ({cartItems.length})</Text>
      </View>
      {cartItems?.length ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            style={{padding: 20, paddingTop: 0}}
            showsVerticalScrollIndicator={false}
          />
          <View style={styles.footer}>
            <View style={styles.footerContainer}>
              <View style={styles.row}>
                <Text style={styles.greyColor}>SubTotal</Text>
                <Text style={styles.text}>${Math.round(totalPrice)}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.greyColor}>Discount</Text>
                <Text style={styles.text}>-${Math.round(totalDiscount)}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.greyColor}>Delivery</Text>
                <Text style={styles.text}>$100</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.greyColor}>Total</Text>
                <Text style={styles.text}>
                  ${Math.round(totalPrice - totalDiscount + 100)}
                </Text>
              </View>
            </View>
            <Button
              title={'Proceed To Checkout'}
              buttonStyle={styles.button}
              textStyle={{color: '#FFF'}}
              onClick={() => {
                navigation.navigate(StackEnum.CHECKOUT);
              }}
            />
          </View>
        </>
      ) : (
        <View style={styles.nodata}>
          <Text style={styles.nodataText}>Your Cart is Empty!!!</Text>
        </View>
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: Platform.OS === 'ios' ? width / 5 : 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    borderRadius: 10,
    marginRight: 20,
  },
  round: {
    backgroundColor: '#F8F9FB',
    width: 40,
    height: 40,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Manrope',
    color: '#000',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#EBEBFB',
    paddingVertical: 20,
  },
  footer: {
    backgroundColor: '#F8F9FB',
    borderRadius: 30,
    paddingHorizontal: 30,
    margin: 10,
  },
  footerContainer: {
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  nodata: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nodataText: {
    color: '#000',
    fontSize: 15,
    fontWeight: '700',
  },
  text: {
    color: '#000',
  },
  button: {
    backgroundColor: '#2A4BA0',
    borderRadius: 20,
    paddingVertical: 15,
    borderColor: '#2A4BA0',
  },
  greyColor: {
    color: '#616A7D',
  },
});
