
import { TailwindProvider } from 'tailwind-rn';
import utilities from './tailwind.json';
import RootNavigation from './src/navigation/RootNavigation';
import { Provider } from 'react-redux';
import store from './src/redux/Store';
import UserProvider from './src/providers/UserProvider';


const tailwindExtensions = {
  "box-card-shadow": {
    style: {
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      borderRadius: 10,
      borderWidth: 0,
      elevation: 3,
    }
  },
  "elevation-5": {
    style: {
      elevation: 5,
    },
  }
}

export default function App() {

  return (
    <Provider store={store}>
      <UserProvider>
        <TailwindProvider utilities={{ ...utilities, ...tailwindExtensions }}>
          <RootNavigation />
        </TailwindProvider>
      </UserProvider>
    </Provider>
  );
}

