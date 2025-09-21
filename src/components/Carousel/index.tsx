import { Image } from 'expo-image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, type ListRenderItem, View } from 'react-native';
import type { IBanner } from 'src/types';

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
    const handleBannerChange = () => {
      const nextBanner = (activeBanner + 1) % banners.length;
      setActiveBanner(nextBanner);

      FlatlistRef.current?.scrollToIndex({
        index: nextBanner,
        animated: true,
      });
    };
    const timeoutId = setTimeout(handleBannerChange, 3000);
    return () => clearTimeout(timeoutId);
  }, [activeBanner, banners.length]);

  const renderItem: ListRenderItem<IBanner> = useCallback(
    ({ item }) => (
      <View
        className="mx-4 h-48 items-center bg-slate-400"
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
          <View
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
