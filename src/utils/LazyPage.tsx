import React, {Suspense} from 'react';
import {View, ActivityIndicator} from 'react-native';

export const withPageSuspense = (Component: any, PageFallBackUi: any) => {
  return (props: any) => {
    return (
      <Suspense fallback={<PageFallBackUi />}>
        <Component {...props} />
      </Suspense>
    );
  };
};

export const PageFallBackUi = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator size={'large'} color={'blue'} />
    </View>
  );
};
