import { Image } from 'expo-image';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  View,
  Dimensions,
} from 'react-native';
import Animated, {
  FadeInLeft,
  FadeOutRight,
  Layout,
} from 'react-native-reanimated';
import { IBanner } from 'src/types';
import { Image } from 'expo-image';

type BannersContainerProps = {
  banners: IBanner[];
};

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const Carousel = ({ banners }: BannersContainerProps) => {
  const [activeBanner, setActiveBanner] = useState<number>(0);

  const FlatlistRef = useRef<FlatList<IBanner>>(null);

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveBanner(viewableItems[0].index);
    }
  }, []);

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: {
        itemVisiblePercentThreshold: 80,
      },
      onViewableItemsChanged,
    },
  ]);

  useEffect(() => {
    const nextBanner = activeBanner + 1;
    const isLastBanner = nextBanner >= banners.length;
    const targetIndex = isLastBanner ? 0 : nextBanner;

    const timeId = setTimeout(() => {
      FlatlistRef.current?.scrollToIndex({
        index: targetIndex,
        animated: true,
      });
      setActiveBanner(isLastBanner ? 0 : nextBanner);
    }, 3000);
    return () => clearTimeout(timeId);
  }, [activeBanner]);

  const renderItem: ListRenderItem<IBanner> = useCallback(({ item }) => {
    return (
      <View
        className="mx-4 h-48 items-center"
        style={{
          width: Dimensions.get('screen').width * 0.85,
        }}
      >
        <Image
          source={item.image}
          contentFit="cover"
          placeholder={blurhash}
          aria-label={item.title}
          className="h-full w-full flex-1 self-center"
        />
      </View>
    ),
    []
  );

  return (
    <View className="items-center gap-y-1">
      <FlatList<IBanner>
        data={banners}
        ref={FlatlistRef}
        renderItem={renderItem}
        contentContainerStyle={{
          alignSelf: 'center',
        }}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
      />
      <FlatList
        data={banners}
        renderItem={({ index }) => (
          <Animated.View
            layout={Layout}
            entering={FadeInLeft}
            exiting={FadeOutRight}
            className={`mx-1 h-3 w-3 rounded-full ${
              activeBanner === index ? 'bg-black' : 'bg-slate-400'
            }`}
          />
        )}
        scrollEnabled={false}
        horizontal
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

export default Carousel;
