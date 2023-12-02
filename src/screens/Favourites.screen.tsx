import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store/root.reducer';
import {ProductList} from '../redux/slices/product.slice';
import ProductCard from '../components/ProductCard';

const Favourites = () => {
  const {favourites} = useSelector((state: RootState) => state.product);

  const renderItem = ({item}: {item: ProductList}) => {
    return <ProductCard {...item} />;
  };

  const emptyComponent = () => {
    return <Text style={{color: '#000'}}> No Products Found!!!</Text>;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favourites</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={favourites}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={renderItem}
        ListEmptyComponent={emptyComponent}
        contentContainerStyle={!favourites?.length ? styles.empty : null}
      />
    </View>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  header: {
    color: '#000',
    fontSize: 22,
    fontWeight: '600',
    fontFamily: 'Manrope',
  },
  row: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: 'space-around',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
