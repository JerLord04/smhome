import { registerRootComponent } from 'expo';

import App from './App';
import ImagePickerExample from './test';
import test1 from './test1'
import Homepage from './Screen/Homepage'
import MyApp from './modal';
import addView from './addview';
import Dropdown from './dropDown';
import MyApp111 from './deleteCom'

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
