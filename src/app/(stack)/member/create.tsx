import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { CircleX } from 'lucide-react-native';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator } from 'react-native';

import { ScreenContainer } from '@/components';
import { ControlledInput } from '@/components/app/form/controlled-input';
import { Form } from '@/components/app/form/form';
import { AvatarPicker } from '@/components/ui/avatar-picker';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useAuth } from '@/hooks/useAuth';
import { THEME } from '@/lib/theme';
import { showToast } from '@/lib/toast-config';
import { MemberFormData, memberSchema } from '@/schemas/members/member.schema';
import { RequestMedia } from '@/services/account/account.types';
import { useCreateMember } from '@/services/members/members.service';
import { CreateMemberData, MemberType } from '@/services/members/members.types';

const MEMBER_LABELS: Record<MemberType, string> = {
  COLLABORATOR: 'Colaborador',
  VOLUNTEER: 'Voluntário',
  PARTNER: 'Parceiro',
};

export default function MemberCreate() {
  const queryClient = useQueryClient();

  const { user } = useAuth();

  const { type } = useLocalSearchParams<{ type: MemberType }>();
  const [selectedImage, setSelectedImage] = useState<RequestMedia | null>(null);

  const form = useForm<MemberFormData>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      name: '',
      memberType: type || 'COLLABORATOR',
    },
  });

  const { mutate: createMember, isPending } = useCreateMember({
    onSuccess: () => {
      showToast({
        type: 'success',
        header: `${MEMBER_LABELS[type]} cadastrado`,
        description: `${MEMBER_LABELS[type]} cadastrado com suceesso!`,
        icon: CircleX,
      });
      queryClient.invalidateQueries({
        queryKey: ['members', type, user.institution?.id],
      });
      router.back();
    },
    onError: () => {
      showToast({
        type: 'error',
        header: `Erro ao cadastrar ${MEMBER_LABELS[type].toLocaleLowerCase()}`,
        description: `Houve um erro ao cadastrar o ${MEMBER_LABELS[type].toLocaleLowerCase()}!`,
        icon: CircleX,
      });
    },
  });

  const onSubmit = (data: CreateMemberData) => {
    createMember({
      ...data,
      file: selectedImage
        ? {
            uri: selectedImage.uri,
            name: selectedImage.name,
            type: selectedImage.type,
          }
        : undefined,
    });
  };

  return (
    <ScreenContainer className="items-center gap-y-4">
      <Text variant="h4">Cadastrar {MEMBER_LABELS[type]}</Text>

      <AvatarPicker
        onImageSelected={setSelectedImage}
        className="h-24 w-24 mb-8"
      />

      <Form form={form} onSubmit={onSubmit} className="w-full gap-y-4">
        <ControlledInput
          name="name"
          label={`Nome do ${MEMBER_LABELS[type]}`}
          placeholder="Digite o nome completo"
        />

        <Button onPress={form.handleSubmit(onSubmit)} disabled={isPending}>
          {isPending ? (
            <ActivityIndicator size="small" color={THEME.light.foreground} />
          ) : (
            <Text>Cadastrar {MEMBER_LABELS[type]}</Text>
          )}
        </Button>
      </Form>
    </ScreenContainer>
  );
}
