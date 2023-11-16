import { Link } from "expo-router";
import { View, Text } from "react-native";

const Page = () => {
  return (
    <View>
      <Link href={"/(modals)/login"}>Login</Link>

      <Text>Explore</Text>
    </View>
  );
};

export default Page;
