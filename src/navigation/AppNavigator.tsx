import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import CategoriesScreen from '../screens/CategoriesScreen'

export default createAppContainer(
  // createSwitchNavigator({
  //   // You could add another route here for authentication.
  //   // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  //   Main: MainTabNavigator,
  // })
  createStackNavigator({
    // Login: LoginScreen,
    Home: HomeScreen,
    Categories: CategoriesScreen
    // SelectedCategory: SelectedCategoryScreen
    // Settings: SettingsScreen
  })
);
