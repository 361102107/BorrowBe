import React from "react";
import { View, Animated } from "react-native";

let inter;

class Carousel extends React.PureComponent {
  state = {
    translateY: new Animated.Value(0)
  };

  componentDidMount() {
    let translateY = 0;
    let singleDis = this.props.height; //单次需要移动的距离

    inter = setInterval(() => {
      Animated.timing(this.state.translateY, {
        toValue: (translateY -= singleDis),
        duration: 1000,
        useNativeDriver: true
      }).start(() => {
        // 动画完成后回调，如果轮播到最后一个时，立马回到第一个去
        const children = this.props.children;
        if (
          translateY < 0 &&
          Array.isArray(children) &&
          Math.abs(translateY / singleDis) === children.length
        ) {
          this.setState({
            translateY: new Animated.Value(0)
          });

          translateY = 0;
        }
      });
    }, 3000);
  }

  componentWillUnmount() {
    inter = null;
    clearInterval(inter);
  }

  render() {
    const { children, height } = this.props;

    return (
      <View
        style={{
          overflow: "hidden",
          height
        }}
      >
        <Animated.View
          style={{
            transform: [
              {
                translateY: this.state.translateY
              }
            ]
          }}
        >
          {children}
          {Array.isArray(children) && children.length > 1 && children[0]}
        </Animated.View>
      </View>
    );
  }
}

export default Carousel;
