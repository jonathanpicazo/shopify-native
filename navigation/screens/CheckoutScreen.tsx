import {
  View,
  Button,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useStripe } from "@stripe/stripe-react-native";
import { CartContext } from "../../contexts/CartContext";

const CheckoutScreen = () => {
  // const publisableKey = STRIPE_PUBLISHABLE_KEY;
  const { checkout } = useContext(CartContext);
  const API_URL = "http://localhost:4242";
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [generatePopup, setGeneratePopup] = useState(false);

  const customStripeAppearance = {
    colors: {
      primary: "#802A19",
    },
  };

  const fetchPaymentSheetParams = async () => {
    try {
      const url = new URL(`${API_URL}/payment-sheet`);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ...checkout }),
      });
      const { paymentIntent, ephemeralKey, customer } = await response.json();

      return {
        paymentIntent,
        ephemeralKey,
        customer,
      };
    } catch (error) {
      console.log("error while fetching params", error);
    }
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer, publishableKey }: any =
      await fetchPaymentSheetParams();
    const { error } = await initPaymentSheet({
      appearance: customStripeAppearance,
      merchantDisplayName: "Example, Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: "Jane Doe",
      },
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert("Success", "Your order is confirmed!");
    }
  };

  useEffect(() => {
    console.log("calling use effect in CollectionScreen");
    initializePaymentSheet();
  }, [checkout]);

  return (
    <View>
      <TouchableOpacity
        disabled={!loading}
        style={styles.button}
        onPress={openPaymentSheet}
      >
        <Text style={styles.buttonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 250,
    width: 250,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#802A19",
    borderRadius: 2,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  picker: {
    width: 200,
    fontSize: 10,
  },
});

export default CheckoutScreen;
