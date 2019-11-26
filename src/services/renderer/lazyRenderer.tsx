import React, { Suspense } from 'react';

import { Loader } from '../../components/shared/Loader';

export const lazyRenderer = (Child: any, props: any) => (
  <Suspense fallback={<Loader />}>
          <Child {...props} />
  </Suspense>
);
