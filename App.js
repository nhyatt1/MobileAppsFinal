import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';



import ChatScreen from './chat.js';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={ChatScreen}
              options={{title: "Home"}}
            />
          </Stack.Navigator>
        </NavigationContainer>
  )
}
