import React, { useCallback, useRef } from 'react';
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { useAuth } from '../../hooks/auth';
import getValidatationErrors from '../../util/getValidatationErrors';

import Input from '../../componentes/Input';
import Button from '../../componentes/Button';

import logoImg from '../../assets/logo.png';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';

type SignInFormData = {
  email: string;
  password: string;
};

const SingIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const { signIn } = useAuth();
  // const handleSignIn = useCallback((data: object) => {
  //   console.log(data);
  // }, []);
  const handleSignIn = useCallback(
    async (data: SignInFormData): Promise<void> => {
      if (formRef.current !== null) {
        try {
          formRef.current.setErrors({});
          const schema = Yup.object().shape({
            email: Yup.string()
              .required('E-mail obrigatório')
              .email('Digite um e-mail válido'),
            password: Yup.string().required('Senha Obrigatória'),
          });

          await schema.validate(data, {
            abortEarly: false,
          });
          await signIn({ email: data.email, password: data.password });
          // history.push('/dashboard');
        } catch (error) {
          if (error instanceof Yup.ValidationError) {
            const errors = getValidatationErrors(error);
            formRef.current.setErrors(errors);
          }
          Alert.alert(
            'Erro na autenticação',
            'Ocorreu um erro ao fazer login, cheque as credenciais',
          );
        }
      }
    },
    [signIn],
  );
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
            <Image source={logoImg} />
            <View>
              <Title>Faça o seu logon</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />
              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
              <Button onPress={() => formRef.current?.submitForm()}>
                Entrar
              </Button>
            </Form>
            <ForgotPassword onPress={() => {}}>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
};

export default SingIn;

/* <Container>
            <Image source={logoImg} />
            <View>
              <Title>Faça o seu logon</Title>
            </View>
            <Controller
              control={control}
              render={() => (
                <Input
                  name="email"
                  icon="log-in"
                  placeholder="email"
                  ref={register}
                />
              )}
              name="email"
              rules={{ required: true }}
              defaultValue=""
            />
            <Controller
              control={control}
              render={() => (
                <Input name="password" icon="log-in" ref={register} />
              )}
              name="password"
              rules={{ required: true }}
              defaultValue=""
            />
            <Button title="Submit" onPress={handleSubmit(onSubmit)} />
            <ForgotPassword onPress={() => {}}>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container> */

/* <Button
        testID="submitButton"
        title="submit"
        onPress={handleSubmit(async ({ name }) => {
          console.log(name);
        })}
      /> */
