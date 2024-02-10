import { useState } from 'react';
import { FlatList, View } from 'react-native';
import { IBanner } from 'src/mocks/app-banners-data';

import { Banner } from './Banner';

type BannersContainerProps = {
  banners: IBanner[];
};

export default function BannersContainer({ banners }: BannersContainerProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const renderItem = ({ item }) => (
    <Banner image={item.image} title={item.title} />
  );

  return (
    <View className="items-center gap-y-2">
      <FlatList
        data={banners}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={(event) => {
          // FIXME: This is maybe not the best way to calculate the active index
          setActiveIndex(Math.floor(event.nativeEvent.contentOffset.x / 370));
        }}
        scrollEventThrottle={16}
        className="w-screen gap-x-4"
      />
      <View className="flex-row gap-4">
        {banners.map((_, index) => (
          <View
            key={index}
            className={`h-4 w-4 rounded-full ${
              index === activeIndex
                ? 'bg-text_neutral'
                : 'border border-text_neutral bg-transparent'
            }`}
          />
        ))}
      </View>
    </View>
  );
}
