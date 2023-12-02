import React, {Suspense} from 'react';

export const withIconSuspense = (Icon: any, FallBackUi: any) => {
  return (props: any) => {
    return (
      <Suspense fallback={<FallBackUi />}>
        <Icon {...props} />
      </Suspense>
    );
  };
};

export const FallBackUi = () => {
  return null;
};
