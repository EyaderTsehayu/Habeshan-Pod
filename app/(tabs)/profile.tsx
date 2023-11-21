import { Link } from "expo-router";
import { View, Text, Button, SafeAreaView, StyleSheet } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import Colors from "@/constants/Colors";

const Page = () => {
  const { signOut, isSignedIn } = useAuth();
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          // headerStyle: { backgroundColor: Colors.primary },
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />

      <View style={styles.ctaContainer}>
        <Button title="Log Out" onPress={() => signOut()} />
        {!isSignedIn && (
          <Link href={"/(modals)/login"}>
            <Text>Login</Text>
          </Link>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  ctaContainer: {
    padding: 50,
  },
});
