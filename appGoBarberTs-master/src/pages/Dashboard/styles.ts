import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Provider } from './index';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  background: #28262e;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
// Header.displayName = 'DashboardHeader'; para o flipper
export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  font-family: 'Roboto-Regular';
  line-height: 28px;
`;
export const UserName = styled.Text`
  color: #ff9000;
  font-family: 'Roboto-Medium';
`;

export const ProfileButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`;
export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 32px 24px 16px;
`;

export const ProvidersListTitle = styled.View`
  flex-direction: row;
  margin-left: 0px;
  justify-content: space-between;
  margin-bottom: 24px;
`;
export const ProvidersTitle = styled.Text`
  font-family: 'Roboto-Medium';
  font-size: 24px;
  color: #f4ede8;
`;
export const SignOutButton = styled.TouchableOpacity`
  margin-left: auto;
`;
export const ProviderContainer = styled(RectButton)`
  background: #3e3b47;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
`;

export const ProviderAvatar = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 36px;
`;
export const ProviderInfo = styled.View`
  flex: 1px;
  margin-left: 20px;
`;
export const ProviderName = styled.Text`
  font-family: 'Roboto-Medium';
  font-size: 18px;
  color: #f4ede8;
`;
export const ProviderMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;
export const ProviderMetaText = styled.Text`
  margin-left: 8px;
  color: #999591;
  font-family: 'Roboto-Regular';
`;
