import {lazy} from 'react';
import {FallBackUi, withIconSuspense} from '../utils/LazyIcon';

export const Cart = withIconSuspense(
  lazy(() => import('./svg/cart.svg')),
  FallBackUi,
);

export const Search = withIconSuspense(
  lazy(() => import('./svg/search.svg')),
  FallBackUi,
);

export const Favourites = withIconSuspense(
  lazy(() => import('./svg/favourites.svg')),
  FallBackUi,
);

export const Plus = withIconSuspense(
  lazy(() => import('./svg/plus.svg')),
  FallBackUi,
);

export const SelectedFav = withIconSuspense(
  lazy(() => import('./svg/selectedFav.svg')),
  FallBackUi,
);

export const Back = withIconSuspense(
  lazy(() => import('./svg/back.svg')),
  FallBackUi,
);

export const CartBlack = withIconSuspense(
  lazy(() => import('./svg/cartBlack.svg')),
  FallBackUi,
);

export const Home = withIconSuspense(
  lazy(() => import('./svg/home.svg')),
  FallBackUi,
);

export const HomeActive = withIconSuspense(
  lazy(() => import('./svg/homeActive.svg')),
  FallBackUi,
);

export const Heart = withIconSuspense(
  lazy(() => import('./svg/heart.svg')),
  FallBackUi,
);

export const Category = withIconSuspense(
  lazy(() => import('./svg/category.svg')),
  FallBackUi,
);
