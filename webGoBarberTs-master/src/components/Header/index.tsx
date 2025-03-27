import React, { useContext, useCallback } from 'react';
import Switch from 'react-switch';
import { ThemeContext } from 'styled-components';
import { shade } from 'polished';

import { Container } from './styles';
import { useTheme } from '../../hooks/theme';

const Header: React.FC = () => {
  const { theme, changeTheme } = useTheme();
  const { colors } = useContext(ThemeContext);
  const handleChangeTheme = useCallback(() => {
    if (theme && theme.name === 'light') {
      changeTheme({ name: 'dark' });
    } else {
      changeTheme({ name: 'light' });
    }
  }, [changeTheme, theme]);

  return (
    <Container>
      Hello word
      <Switch
        onChange={handleChangeTheme}
        checked={false}
        checkedIcon={false}
        uncheckedIcon={false}
        height={10}
        width={40}
        handleDiameter={20}
        offColor={shade(0.15, colors.primary)}
        onColor={colors.secundary}
      />
    </Container>
  );
};

export default Header;
