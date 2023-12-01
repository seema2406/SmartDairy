import React from 'react';
import AppRoute from './navigation/AppRoute';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { store } from './store';
import { Provider } from 'react-redux';
import { AppContext, AppProvider } from './context/AppContext';
const globalProps: any = global;

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <AppProvider>
          <AppContext.Consumer>
            {func => {
              globalProps.props = func;
              return <AppRoute />;
            }}
          </AppContext.Consumer>
        </AppProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
