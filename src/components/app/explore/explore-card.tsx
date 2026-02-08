import { useQueryClient } from '@tanstack/react-query';
import { debounce } from 'es-toolkit/function';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Building2 } from 'lucide-react-native';
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
  GET_INSTITUIONS_KEY,
  useFollowAccount,
  useUnfollowAccount,
} from '@/services/account/account.service';

type ExploreInstitutionCardProps = {
  title: React.ReactNode;
  image: string;
  placeholder: string;
  followers: number;
  id: number;
  following: boolean;
};
const ExploreInstitutionCard = ({
  title,
  image,
  placeholder,
  followers,
  id,
  following,
}: ExploreInstitutionCardProps) => {
  const queryClient = useQueryClient();

  const { mutate: follow } = useFollowAccount({
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [GET_INSTITUIONS_KEY] });
    },
  });
  const { mutate: unfollow } = useUnfollowAccount({
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [GET_INSTITUIONS_KEY] });
    },
  });

  const handleFollow = () => {
    if (following) {
      unfollow(id);
      return;
    }
    follow(id);
  };

  return (
    <Card className="w-36 h-44 p-2 gap-1">
      <Link
        href={{
          pathname: 'institution',
          params: {
            id,
          },
        }}
      >
        <View className="gap-1">
          <CardHeader>
            <View className="w-20 h-20 rounded-full bg-muted items-center justify-center">
              <Image
                source={image}
                placeholder={placeholder}
                className="rouded-full"
              />
              <Icon as={Building2} className="w-7 h-7 text-muted-foreground" />
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
              <Text
                className="text-center text-xs  text-muted-foreground"
                variant="muted"
                numberOfLines={1}
              >
                {followers} {followers > 1 ? 'seguidores' : 'seguidor'}
              </Text>
            </View>
          </CardContent>
        </View>
      </Link>
      <CardFooter className="p-0">
        <Button
          variant="default"
          size="sm"
          className={cn('h-8 w-full', following && 'bg-secondary')}
          onPress={debounce(handleFollow, 150)}
        >
          <Text>{following ? 'Seguindo' : 'Seguir'}</Text>
        </Button>
      </CardFooter>
    </Card>
  );
};

export { ExploreInstitutionCard };
