import { useRef } from 'react';
import { Animated } from 'react-native';

type LoadingBoxProps = {
  customStyle: string;
};

const LoadingBox = ({ customStyle }: LoadingBoxProps) => {
  const pulseValue = useRef(new Animated.Value(0.2)).current;

  const pulseAnimation = Animated.loop(
    Animated.sequence([
      Animated.timing(pulseValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(pulseValue, {
        toValue: 0.2,
        duration: 1000,
        useNativeDriver: true,
      }),
    ])
  );

  pulseAnimation.start();

  return (
    <Animated.View
      className={customStyle}
      style={{
        opacity: pulseValue.interpolate({
          inputRange: [0.2, 1],
          outputRange: [0.5, 1],
        }),
      }}
    />
  );
};

export default LoadingBox;
