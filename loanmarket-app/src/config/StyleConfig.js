import {Dimensions} from 'react-native';

export default class StyleConfig {
    static UI_WIDTH = 375;
    static UI_HEIGHT = 667;
    static DEVICE_WIDTH = Dimensions.get('window').width;
    static DEVICE_HEIGHT = Dimensions.get('window').height;
    static SCREEN_WIDTH = Dimensions.get('window').width;
    static SCREEN_HEIGHT = Dimensions.get('window').height;
    static SCALE = Math.min(Dimensions.get('window').height / 667, Dimensions.get('window').width / 375);
}
