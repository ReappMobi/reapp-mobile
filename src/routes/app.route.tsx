import { Octicons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from 'src/constants/Colors';
import ExploreProjectsScreen from 'src/screens/Explore/ExploreProjectsScreen';
import ExploreScreen from 'src/screens/Explore/ExploreScreen';
import FavoritePage from 'src/screens/FavoritePage';
import HomeScreen from 'src/screens/HomeScreen';
import ProfileSavedScreen from 'src/screens/ProfileSavedScreen';
import ProfileStatisticsScreen from 'src/screens/ProfileStatisticsScreen';
import TransparencyScreen from 'src/screens/TransparencyScreen';
import UserProfilePage from 'src/screens/UserProfilePage';

const Explore = () => {
  const ExploreStack = createStackNavigator();
  return (
    <ExploreStack.Navigator screenOptions={{ headerShown: false }}>
      <ExploreStack.Screen
        name="ExploreInstitutions"
        component={ExploreScreen}
      />
      <ExploreStack.Screen
        name="ExploreProjects"
        component={ExploreProjectsScreen}
      />
    </ExploreStack.Navigator>
  );
};

const UserProfile = () => {
  const UserStack = createStackNavigator();

  return (
    <UserStack.Navigator screenOptions={{ headerShown: false }}>
      <UserStack.Screen name="UserProfileScreen" component={UserProfilePage} />
      <UserStack.Screen
        name="UserDonations"
        component={ProfileStatisticsScreen}
      />
      <UserStack.Screen name="UserSavedPosts" component={ProfileSavedScreen} />
    </UserStack.Navigator>
  );
};

export function AppNavigator() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarActiveTintColor: Colors.color_primary,
          tabBarInactiveTintColor: Colors.text_neutral,
          tabBarShowLabel: false,
          tabBarIcon: ({ size, color }) => (
            <Octicons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarActiveTintColor: Colors.color_primary,
          tabBarInactiveTintColor: Colors.text_neutral,
          tabBarShowLabel: false,
          tabBarIcon: ({ size, color }) => (
            <Octicons name="search" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Favorite"
        component={FavoritePage}
        options={{
          tabBarActiveTintColor: Colors.color_primary,
          tabBarInactiveTintColor: Colors.text_neutral,
          tabBarShowLabel: false,
          tabBarIcon: ({ size, color }) => (
            <Octicons name="heart" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Transparency"
        component={TransparencyScreen}
        options={{
          tabBarActiveTintColor: Colors.color_primary,
          tabBarInactiveTintColor: Colors.text_neutral,
          tabBarShowLabel: false,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="receipt-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          tabBarActiveTintColor: Colors.color_primary,
          tabBarInactiveTintColor: Colors.text_neutral,
          tabBarShowLabel: false,
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
