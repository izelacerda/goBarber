import React, { useCallback, useRef } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';

import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import api from '../../services/api';
import getValidatationErrors from '../../util/getValidatationErrors';
import avatarImg from '../../assets/avatar.png';

import Input from '../../componentes/Input';
import Button from '../../componentes/Button';

import {
  Container,
  Title,
  BackButton,
  UserAvatarButton,
  UserAvatar,
} from './styles';
import { useAuth } from '../../hooks/auth';

type ProfileForm = {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
};

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  const emailInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(
    async (data: ProfileForm): Promise<void> => {
      if (formRef.current !== null) {
        try {
          const schema = Yup.object().shape({
            name: Yup.string().required('Nome obrigatório'),
            email: Yup.string()
              .required('E-mail obrigatório')
              .email('Digite um e-mail válido'),
            old_password: Yup.string(),
            password: Yup.string().when('old_password', {
              is: val => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            }),
            password_confirmation: Yup.string()
              .when('old_password', {
                is: val => !!val.length,
                then: Yup.string().required('Campo obrigatório'),
                otherwise: Yup.string(),
              })
              .oneOf(
                [Yup.ref('password')],
                'Confirmação de senha difere da senha',
              ),
          });

          await schema.validate(data, {
            abortEarly: false,
          });
          const {
            name,
            email,
            old_password,
            password,
            password_confirmation,
          } = data;
          const formData = {
            name,
            email,
            ...(old_password
              ? {
                  old_password,
                  password,
                  password_confirmation,
                }
              : {}),
            profile: 1,
          };
          const response = await api.put('/profile', formData);

          updateUser(response.data);

          Alert.alert('Perfil atualizado com sucesso!');
          navigation.goBack();
        } catch (error) {
          if (error instanceof Yup.ValidationError) {
            const errors = getValidatationErrors(error);
            formRef.current.setErrors(errors);
          }
          Alert.alert(
            'Erro na atualização do perfil',
            'Ocorreu um erro ao atualizar o perfil, tente novamente',
          );
        }
      }
    },
    [navigation, updateUser],
  );
  const handleUpdateAvatar = useCallback(() => {
    ImagePicker.showImagePicker(
      {
        title: 'Selecione o avatar',
        cancelButtonTitle: 'cancelar',
        takePhotoButtonTitle: 'usar câmera',
        chooseFromLibraryButtonTitle: 'Escolher da Galeria',
      },
      async response => {
        if (response.didCancel) {
          return;
        }
        if (response.error) {
          Alert.alert('Erro ao atualizar o seu avatar.');
          return;
          // console.log('ImagePicker Error: ', response.error);
        }
        // if (response.customButton) {
        //   console.log('User tapped custom button: ', response.customButton);
        // }
        // const source = { uri: response.uri };
        const data = new FormData();

        data.append('avatar', {
          type: 'image/jpeg',
          name: `${user.id}.jpg`,
          uri: response.uri,
        });

        // data.append('file', {
        //   uri:
        //     Platform.OS === 'ios'
        //       ? response.uri.replace('file://', '/private')
        //       : response.uri,
        //   name: `${user.id}.jpg`,
        //   type: 'image/jpg',
        // });

        // console.log('aqui');
        // console.log(data);
        await api.patch('users/avatar', data).then(apiResponse => {
          updateUser(apiResponse.data);
        });

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      },
    );
  }, [updateUser, user.id]);
  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <BackButton onPress={handleGoBack}>
              <Icon name="chevron-left" size={24} color="#999591" />
            </BackButton>
            <UserAvatarButton onPress={handleUpdateAvatar}>
              <UserAvatar
                source={
                  user.avatar_url
                    ? {
                        uri: user.avatar_url,
                      }
                    : avatarImg
                }
              />
            </UserAvatarButton>
            <View>
              <Title>Meu perfil</Title>
            </View>
            <Form initialData={user} ref={formRef} onSubmit={handleSignUp}>
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />
              <Input
                ref={emailInputRef}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  oldPasswordInputRef.current?.focus();
                }}
              />
              <Input
                ref={oldPasswordInputRef}
                name="old_password"
                icon="lock"
                placeholder="Senha atual"
                secureTextEntry
                returnKeyType="next"
                textContentType="newPassword"
                containerStyle={{ marginTop: 16 }}
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Nova senha"
                secureTextEntry
                returnKeyType="next"
                textContentType="newPassword"
                onSubmitEditing={() => {
                  confirmPasswordInputRef.current?.focus();
                }}
              />
              <Input
                ref={confirmPasswordInputRef}
                name="password_confirmation"
                icon="lock"
                placeholder="Confirmar senha"
                secureTextEntry
                returnKeyType="send"
                textContentType="newPassword"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
              <Button onPress={() => formRef.current?.submitForm()}>
                Confirmar mudanças
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Profile;
