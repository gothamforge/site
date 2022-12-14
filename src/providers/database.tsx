import React from 'react';

import {DatabaseInit} from '../data';
import {useApi} from './hooks';

const Context = React.createContext({
  contactus: null,
})

const Provider = ({children}) => {
  const api = useApi();
  const dbs = DatabaseInit(api);

  const [db, _setDb] = React.useState(dbs);

  return (
    <Context.Provider value={db}>
      {children}
    </Context.Provider>
  );
}

export const useDatabase = () => React.useContext(Context);

export default Provider;