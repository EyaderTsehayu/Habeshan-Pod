import { useCallback } from "react";
import { db } from "@/firebaseConfig";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { defaultStyles } from "@/constants/Styles";
import { useAuth, useOAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { collection, getDocs, addDoc } from "firebase/firestore";

// enum Strategy {
//   Google = "oauth_google",
//   Apple = "oauth_apple",
//   Facebook = "oauth_facebook",
// }
// interface User{

// }

const Login = () => {
  // const [useri, setUser] = useState(null);
  const router = useRouter();
  const { isSignedIn } = useAuth();

  // setUser(user);

  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const onGoogleAuth = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
      let emailExists = false;
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.back();
        //console.log("user", user);
        if (signUp?.emailAddress !== null) {
          //  console.log("user", signUp);
          try {
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
              if (signUp?.emailAddress == doc.data().email) {
                console.log("duplicated email");
                emailExists = true;
              }
            });

            if (!emailExists) {
              const docRef = await addDoc(collection(db, "users"), {
                userId: signUp?.createdUserId,
                firstName: signUp?.firstName,
                lastName: signUp?.lastName,
                email: signUp?.emailAddress,
              });
              console.log("Document written with ID: ", docRef.id);
            }
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        } else {
          console.log("nullll");
        }
        // router.push("/(tabs)/");
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
      router.back();
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View style={defaultStyles.container}>
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        style={[defaultStyles.inputField, { marginBottom: 30 }]}
      />
      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>

      <View style={styles.seperatorView}>
        <View
          style={{
            flex: 1,
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={styles.seperator}>or</Text>
        <View
          style={{
            flex: 1,
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>
      <View style={{ gap: 20 }}>
        <TouchableOpacity style={styles.btnOutline} onPress={onGoogleAuth}>
          <Ionicons
            name="md-logo-google"
            size={24}
            style={defaultStyles.btnIcon}
          />
          <Text style={styles.btnOutlineText}>Continue with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 26,
  },

  seperatorView: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 30,
  },
  seperator: {
    fontFamily: "dm-sb",
    color: "#000", //
    fontSize: 16,
  },
  btnOutline: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000", //
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "dm-sb",
  },
});
