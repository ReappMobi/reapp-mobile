import { useQueryClient } from '@tanstack/react-query';
import { debounce } from 'es-toolkit/function';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Paperclip } from 'lucide-react-native';
import { View } from 'react-native';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import {
  GET_PROJECTS_KEY,
  useToggleFavoriteProject,
} from '@/services/project/project.service';

type ExploreProjectCardProps = {
  title: React.ReactNode;
  image: string;
  placeholder: string;
  id: number;
  isFavorite: boolean;
  categoryName?: string;
};

const ExploreProjectCard = ({
  title,
  image,
  placeholder,
  id,
  isFavorite,
  categoryName,
}: ExploreProjectCardProps) => {
  const queryClient = useQueryClient();

  const { mutate: toggleFavorite } = useToggleFavoriteProject({
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [GET_PROJECTS_KEY] });
    },
  });

  const handleFavorite = () => {
    toggleFavorite(id);
  };

  return (
    <Card className="w-36 h-44 p-2 gap-1">
      <Link
        href={{
          pathname: 'project',
          params: {
            projectId: id,
          },
        }}
      >
        <View className="gap-1">
          <CardHeader>
            <View className="w-20 h-20 rounded-full bg-muted items-center justify-center">
              <Image
                source={image}
                placeholder={{ blurhash: placeholder }}
                className="w-full h-full rounded-full"
                contentFit="cover"
              />
              {!image && (
                <Icon
                  as={Paperclip}
                  className="w-7 h-7 text-muted-foreground absolute"
                />
              )}
            </View>
          </CardHeader>
          <CardContent className="p-0.5 w-full">
            <View className="gap-y-0.5">
              <Text
                className="text-center"
                variant="small"
                numberOfLines={1}
                lineBreakMode="clip"
              >
                {title}
              </Text>
              {categoryName && (
                <Text
                  className="text-center text-xs text-muted-foreground"
                  variant="muted"
                  numberOfLines={1}
                >
                  {categoryName}
                </Text>
              )}
            </View>
          </CardContent>
        </View>
      </Link>
      <CardFooter className="p-0">
        <Button
          variant="default"
          size="sm"
          className={cn('h-8 w-full', isFavorite && 'bg-secondary')}
          onPress={debounce(handleFavorite, 150)}
        >
          <Text>{isFavorite ? 'Favorito' : 'Favoriar'}</Text>
        </Button>
      </CardFooter>
    </Card>
  );
};

export { ExploreProjectCard };
