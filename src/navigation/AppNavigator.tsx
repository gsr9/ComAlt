import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryScreen from '../screens/CategoryScreen'
import SelectModeScreen from '../screens/SelectModeScreen'
import EditionMainScreen from '../screens/EditionMainScreen';
import EditionAddScreen from '../screens/EditionAddScreen';
import EditionCategoriesScreen from '../screens/EditionCategoriesScreen';
import EditionCategoryScreen from '../screens/EditionCategoryScreen';
import EditionReplaceScreen from '../screens/EditionReplaceScreen';

export default createAppContainer(
  // createSwitchNavigator({
  //   // You could add another route here for authentication.
  //   // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  //   Main: MainTabNavigator,
  // })
  createStackNavigator({
    // Login: LoginScreen,
    SelectMode: SelectModeScreen,
    Home: HomeScreen,
    Categories: CategoriesScreen,
    Category: CategoryScreen,
    EditionMain: EditionMainScreen,
    AddScreen: EditionAddScreen,
    EditCategories: EditionCategoriesScreen,
    EditCategory: EditionCategoryScreen,
    EditReplace: EditionReplaceScreen
  })
);
