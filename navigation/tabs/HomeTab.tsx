import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CollectionScreen, ProductScreen } from "../screens";

const HomeTab = ({ navigation }: { navigation: any }) => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Collection"
      // screenOptions={{
      //   headerShown: false,
      // }}
    >
      <Stack.Screen name="Collection" component={CollectionScreen} />
      <Stack.Screen name="Product" component={ProductScreen} />
    </Stack.Navigator>
  );
};
export default HomeTab;
