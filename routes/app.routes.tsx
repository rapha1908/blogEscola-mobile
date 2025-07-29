import CreatePost from "@/components/screens/CreatePost";
import EditPost from "@/components/screens/EditPost";
import Home from "@/components/screens/Home";
import Login from "@/components/screens/Login";
import PostDetails from "@/components/screens/PostDetails";
import Register from "@/components/screens/Register";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const { Navigator, Screen } = createNativeStackNavigator();
export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="login" component={Login} />
      <Screen name="home" component={Home} />
      <Screen name="register" component={Register} />
      <Screen name="create" component={CreatePost} />
      <Screen name="detail" component={PostDetails} />
      <Screen name="edit" component={EditPost} />


    </Navigator>
  );
}
