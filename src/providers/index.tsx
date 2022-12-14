import React from 'react';

import NavProvider from './nav';
import SettingsProvider from './settings';
import ApiProvider from './api';
import DBProvider from './database';

import {FlashProvider} from './flash';

export {default as FormProvider} from './form';

export {
  FlashProvider,
}

const Component = ({children}) => (
  <ApiProvider>
    <DBProvider>
      <SettingsProvider>
        <NavProvider>
          <FlashProvider>
            {children}
          </FlashProvider>
        </NavProvider>
      </SettingsProvider>
    </DBProvider>
  </ApiProvider>
);



export default Component;