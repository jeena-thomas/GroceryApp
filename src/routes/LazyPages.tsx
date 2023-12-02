import React from 'react';
import {PageFallBackUi, withPageSuspense} from '../utils/LazyPage';

const LazyHomePage = withPageSuspense(
  React.lazy(() => import('../screens/Home.screen')),
  PageFallBackUi,
);

const LazyProductPage = withPageSuspense(
  React.lazy(() => import('../screens/Product.screen')),
  PageFallBackUi,
);

const LazyCartPage = withPageSuspense(
  React.lazy(() => import('../screens/Cart.screen')),
  PageFallBackUi,
);

const LazyCheckoutPage = withPageSuspense(
  React.lazy(() => import('../screens/Checkout.screen')),
  PageFallBackUi,
);

const LazyComingSoonPage = withPageSuspense(
  React.lazy(() => import('../screens/ComingSoon.screen')),
  PageFallBackUi,
);

const LazyFavouritesPage = withPageSuspense(
  React.lazy(() => import('../screens/Favourites.screen')),
  PageFallBackUi,
);
export {
  LazyHomePage,
  LazyProductPage,
  LazyCartPage,
  LazyCheckoutPage,
  LazyComingSoonPage,
  LazyFavouritesPage,
};
