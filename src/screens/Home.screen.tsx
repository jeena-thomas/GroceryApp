/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {Cart, Search} from '../assets';
import ProductCard from '../components/ProductCard';
import productSlice, {ProductList} from '../redux/slices/product.slice';
import {RootState} from '../redux/store/root.reducer';
import Card from '../components/Card';
import {StackEnum} from '../enums/stackEnums';
import useDebounce from '../hooks/useDebounce';
import {RootStackParamList} from '../routes/Root.stack';

const Home = () => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [searchValue, setSearchValue] = useState<string>('');
  const [products, setProducts] = useState<ProductList[]>([]);

  const {
    productList: {data, loading},
    cartItems,
  } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    dispatch(productSlice.actions.getAllProducts());
  }, []);

  useEffect(() => {
    setProducts(data);
  }, [data]);

  useDebounce(
    () => {
      setProducts(
        data.filter((item: ProductList) =>
          item.title.toLowerCase().includes(searchValue.toLowerCase()),
        ),
      );
    },
    [data, searchValue],
    800,
  );

  const renderItem = ({item}: {item: ProductList}) => {
    return <ProductCard {...item} />;
  };

  const emptyComponent = () => {
    return (
      <View style={style.empty}>
        <Text style={{color: '#000'}}> No Products Found!!!</Text>
      </View>
    );
  };

  const loaderComponent = () => {
    return <ActivityIndicator />;
  };

  /** Navigate to the cart screen */
  const handleAddToCart = () => {
    navigation.navigate(StackEnum.CART);
  };

  return (
    <View style={style.container}>
      <View style={style.headerContainer}>
        <View style={style.header}>
          <Text style={style.title}>Hey, Rahul</Text>
          <TouchableOpacity
            style={{position: 'relative'}}
            onPress={handleAddToCart}>
            <Cart />
            <View style={style.round}>
              <Text style={style.text}>{cartItems?.length}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={style.search}>
          <Search />
          <TextInput
            value={searchValue}
            onChangeText={setSearchValue}
            placeholder="Search Products or store"
            style={style.searchInput}
            placeholderTextColor={'#889'}
          />
        </View>
        <View style={style.addressContainer}>
          <View>
            <Text style={style.delivery}>Delivery to</Text>
            <Text style={style.address}>Green Way 3000, Sylhet</Text>
          </View>
          <View>
            <Text style={style.delivery}>Within</Text>
            <Text style={style.address}>1 Hour</Text>
          </View>
        </View>
      </View>
      <View style={{margin: 20, flex: 1}}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{maxHeight: 130, minHeight: 130}}>
          <Card />
          <Card />
        </ScrollView>
        <Text style={style.recomnd}>Recommended</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={products}
          numColumns={2}
          columnWrapperStyle={style.row}
          renderItem={renderItem}
          ListEmptyComponent={loading ? loaderComponent : emptyComponent}
        />
      </View>
    </View>
  );
};

export default Home;

const width = Dimensions.get('screen').width;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  headerContainer: {
    backgroundColor: '#2A4BA0',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? width / 4 : width / 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    fontFamily: 'Manrope',
  },
  search: {
    backgroundColor: '#153075',
    borderRadius: 28,
    paddingVertical: 2,
    paddingHorizontal: 15,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    color: '#8891A5',
    fontSize: 14,
    fontFamily: 'Manrope',
    paddingLeft: 10,
  },
  addressContainer: {
    marginTop: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  delivery: {
    textTransform: 'uppercase',
    color: '#DDDCDA',
    fontSize: 11,
    fontWeight: '800',
    fontFamily: 'Manrope',
  },
  address: {
    fontSize: 14,
    fontFamily: 'Manrope',
    fontWeight: '500',
    color: '#F8F9FB',
    paddingVertical: 5,
  },
  recomnd: {
    fontFamily: 'Manrope',
    fontSize: 30,
    fontWeight: '400',
    paddingVertical: 10,
    color: '#000',
  },
  row: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: 'space-around',
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
  },
  text: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
