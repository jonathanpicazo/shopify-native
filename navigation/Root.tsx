import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeTab, CartTab } from "./tabs";
import { CartProvider } from "../contexts/CartContext";
import { StripeProvider } from "@stripe/stripe-react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { STRIPE_PUBLISHABLE_KEY } from "@env";
import { CheckoutScreen } from "./screens";
import { SafeAreaProvider } from "react-native-safe-area-context";
const Root = () => {
  const Tab = createBottomTabNavigator();

  return (
    <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
      <CartProvider>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName={"Home"}
            screenOptions={({ route }) => ({
              tabBarStyle: {
                backgroundColor: "#802A19",
              },
              tabBarItemStyle: {
                height: 70,
              },
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                let rn = route.name;

                if (rn === "Home") {
                  iconName = focused ? "home" : "home-outline";
                } else if (rn === "Cart") {
                  iconName = focused ? "cart" : "cart-outline";
                }

                // You can return any component that you like here!
                //@ts-ignore
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: "white",
              tabBarInactiveTintColor: "grey",
              tabBarLabelStyle: {
                paddingBottom: 5,
                fontSize: 10,
              },
            })}
          >
            <Tab.Screen name="Home" component={HomeTab} />
            <Tab.Screen name="Cart" component={CartTab} />
          </Tab.Navigator>
        </NavigationContainer>
      </CartProvider>
    </StripeProvider>
  );
};

export default Root;
