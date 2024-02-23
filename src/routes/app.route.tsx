import { Octicons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from 'src/constants/Colors';
import {
  DonationConfirmScreen,
  DonationMethodScreen,
  DonationScreen,
  DonationTaxReceiptScreen,
  Explore,
  FavoritePage,
  HomeScreen,
  InstitutionProfile,
  ProfileSavedScreen,
  ProfileStatisticsScreen,
  ProjectPage,
  TransparencyScreen,
  UserProfilePage,
} from 'src/screens';

const DonationScreens = {
  DonationScreen,
  DonationMethodScreen,
  DonationTaxReceiptScreen,
  DonationConfirmScreen,
};

const HomeScreenNavigator = () => {
  const HomeScreenStack = createStackNavigator();
  return (
    <HomeScreenStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeScreenStack.Screen name="HomeScreen" component={HomeScreen} />
      {Object.entries(DonationScreens).map(([name, component]) => (
        <HomeScreenStack.Screen key={name} name={name} component={component} />
      ))}
    </HomeScreenStack.Navigator>
  );
};

const ExploreNavigator = () => {
  const ExploreStack = createStackNavigator();
  return (
    <ExploreStack.Navigator screenOptions={{ headerShown: false }}>
      <ExploreStack.Screen name="ExploreScreen" component={Explore} />

      <ExploreStack.Screen
        name="InstitutionProfile"
        component={InstitutionProfile}
      />
      <ExploreStack.Screen name="ProjectPage" component={ProjectPage} />

      {Object.entries(DonationScreens).map(([name, component]) => (
        <ExploreStack.Screen key={name} name={name} component={component} />
      ))}
    </ExploreStack.Navigator>
  );
};

const FavoriteNavigator = () => {
  const FavoriteStack = createStackNavigator();

  return (
    <FavoriteStack.Navigator screenOptions={{ headerShown: false }}>
      <FavoriteStack.Screen name="FavoritePage" component={FavoritePage} />
      <FavoriteStack.Screen
        name="InstitutionProfile"
        component={InstitutionProfile}
      />
      {Object.entries(DonationScreens).map(([name, component]) => (
        <FavoriteStack.Screen key={name} name={name} component={component} />
      ))}
    </FavoriteStack.Navigator>
  );
};

const UserProfileNavigator = () => {
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
        name="Home"
        component={HomeScreenNavigator}
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
        component={ExploreNavigator}
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
        component={FavoriteNavigator}
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
        component={UserProfileNavigator}
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
