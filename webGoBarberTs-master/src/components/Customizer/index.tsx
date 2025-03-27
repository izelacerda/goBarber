import React, { useContext, useCallback, useState } from 'react';
import Switch from 'react-switch';
import { FiSettings, FiX } from 'react-icons/fi';
import { ThemeContext } from 'styled-components';
import { shade } from 'polished';
import {
  Container,
  CustomizerToggle,
  OpenIcon,
  TitleContainer,
  Title,
  Description,
  ConfigurationContainer,
  ConfigurationTitle,
  ConfigurationContent,
} from './styles';

import { useTheme } from '../../hooks/theme';
import Radio from '../Radio/index';

const Customizer: React.FC = (children, props) => {
  const [customizerState, setCustomizerState] = useState(true);
  const { theme, changeTheme } = useTheme();
  const { colors } = useContext(ThemeContext);

  const handleCustomizer = useCallback(state => {
    setCustomizerState(state);
  }, []);
  const handleThemeMode = useCallback(
    (type, state) => {
      console.log(state);
      changeTheme({ ...theme, [type]: state });
    },
    [changeTheme, theme],
  );

  return (
    <Container isOpen={customizerState}>
      <CustomizerToggle>
        <OpenIcon>
          <button
            type="button"
            onClick={() => handleCustomizer(!customizerState)}
          >
            <FiSettings size={14} />
          </button>
        </OpenIcon>
      </CustomizerToggle>
      <TitleContainer>
        <Title>
          <h4>Theme Customizer</h4>
          <button type="button" onClick={() => handleCustomizer(false)}>
            <FiX size={20} />
          </button>
        </Title>
        <Description>
          <small>Customize & Preview in Real Time</small>
        </Description>
      </TitleContainer>
      <hr />
      <ConfigurationContainer>
        <ConfigurationTitle>
          <h2>Menu Colors</h2>
        </ConfigurationTitle>
        <ConfigurationContent>
          <ul className="list-inline">
            <li
              className={`color-box bg-primary ${
                theme && theme.menuColor === 'primary' ? 'selected' : ''
              }`}
              onClick={() => handleThemeMode('menuColor', 'primary')}
            />
            <li
              className={`color-box bg-success ${
                theme && theme.menuColor === 'success' ? 'selected' : ''
              }`}
              onClick={() => handleThemeMode('menuColor', 'success')}
            />
            <li
              className={`color-box bg-danger ${
                theme && theme.menuColor === 'danger' ? 'selected' : ''
              }`}
              onClick={() => handleThemeMode('menuColor', 'danger')}
            />
            <li
              className={`color-box bg-info ${
                theme && theme.menuColor === 'info' ? 'selected' : ''
              }`}
              onClick={() => handleThemeMode('menuColor', 'info')}
            />
            <li
              className={`color-box bg-warning ${
                theme && theme.menuColor === 'warning' ? 'selected' : ''
              }`}
              onClick={() => handleThemeMode('menuColor', 'warning')}
            />
            <li
              className={`color-box bg-dark ${
                theme && theme.menuColor === 'dark' ? 'selected' : ''
              }`}
              onClick={() => handleThemeMode('menuColor', 'dark')}
            />
          </ul>
        </ConfigurationContent>
      </ConfigurationContainer>
      <hr />
      <ConfigurationContainer>
        <ConfigurationTitle>
          <div>
            <h2>Theme Layout</h2>
            <div className="d-inline-block">
              <div className="mr-1 mt-1">
                <Radio
                  label="Vertical"
                  color="primary"
                  checked={theme && theme.layout === 'vertical'}
                  defaultChecked={theme && theme.layout === 'vertical'}
                  name="themeLayout"
                  onChange={() => handleThemeMode('layout', 'vertical')}
                />
              </div>
              <div className="mr-1 mt-1">
                <Radio
                  label="Horizontal"
                  color="primary"
                  checked={theme && theme.layout === 'horizontal'}
                  defaultChecked={theme && theme.layout === 'horizontal'}
                  name="themeLayout"
                  onChange={() => handleThemeMode('layout', 'horizontal')}
                />
              </div>
            </div>
          </div>
        </ConfigurationTitle>
        <ConfigurationContent />
      </ConfigurationContainer>
      <hr />
      <ConfigurationContainer>
        <ConfigurationTitle>
          <div>
            <h2>Theme Mode</h2>
            <div className="d-inline-block">
              <div className="mr-1 mt-1">
                <Radio
                  label="Light"
                  color="primary"
                  checked={theme && theme.name === 'light'}
                  defaultChecked={theme && theme.name === 'light'}
                  name="themeMode"
                  onChange={() => handleThemeMode('name', 'light')}
                />
              </div>
              <div className="mr-1 mt-1">
                <Radio
                  label="Dark"
                  color="primary"
                  checked={theme && theme.name === 'dark'}
                  defaultChecked={theme && theme.name === 'dark'}
                  name="themeMode"
                  onChange={() => handleThemeMode('name', 'dark')}
                />
              </div>
              <div className="mr-1 mt-1">
                <Radio
                  label="Semi-Dark"
                  color="primary"
                  checked={theme && theme.name === 'semidark'}
                  defaultChecked={theme && theme.name === 'semidark'}
                  name="themeMode"
                  onChange={() => handleThemeMode('name', 'semidark')}
                />
              </div>
            </div>
          </div>
        </ConfigurationTitle>
        <ConfigurationContent />
      </ConfigurationContainer>
      <hr />
      <ConfigurationContainer>
        <ConfigurationTitle>
          <h2>Collapse Sidebar</h2>
          <Switch
            onChange={checked => handleThemeMode('sidebarCollapsed', checked)}
            checked={theme && theme.sidebarCollapsed === true}
            checkedIcon={false}
            uncheckedIcon={false}
            height={10}
            width={30}
            handleDiameter={18}
            offColor={shade(0.15, colors.primary)}
            onColor={colors.secundary}
          />
        </ConfigurationTitle>
        <ConfigurationContent />
      </ConfigurationContainer>
      <hr />
      <ConfigurationContainer>
        <ConfigurationTitle>
          <h2>Navbar Colors</h2>
        </ConfigurationTitle>
        <ConfigurationContent>
          <ul className="list-inline">
            <li
              className={`color-box bg-default ${
                theme && theme.navbarColor === 'default' ? 'selected' : ''
              }`}
              onClick={() => handleThemeMode('navbarColor', 'default')}
            />
            <li
              className={`color-box bg-primary ${
                theme && theme.navbarColor === 'primary' ? 'selected' : ''
              }`}
              onClick={() => handleThemeMode('navbarColor', 'primary')}
            />
            <li
              className={`color-box bg-success ${
                theme && theme.navbarColor === 'success' ? 'selected' : ''
              }`}
              onClick={() => handleThemeMode('navbarColor', 'success')}
            />
            <li
              className={`color-box bg-danger ${
                theme && theme.navbarColor === 'danger' ? 'selected' : ''
              }`}
              onClick={() => handleThemeMode('navbarColor', 'danger')}
            />
            <li
              className={`color-box bg-info ${
                theme && theme.navbarColor === 'info' ? 'selected' : ''
              }`}
              onClick={() => handleThemeMode('navbarColor', 'info')}
            />
            <li
              className={`color-box bg-warning ${
                theme && theme.navbarColor === 'warning' ? 'selected' : ''
              }`}
              onClick={() => handleThemeMode('navbarColor', 'warning')}
            />
            <li
              className={`color-box bg-dark ${
                theme && theme.navbarColor === 'dark' ? 'selected' : ''
              }`}
              onClick={() => handleThemeMode('navbarColor', 'dark')}
            />
          </ul>
        </ConfigurationContent>
      </ConfigurationContainer>
      <hr />
      <ConfigurationContainer>
        <ConfigurationTitle>
          <div>
            <h2>Navbar Type</h2>
            <div className="d-inline-block">
              <div className="mr-1 mt-1">
                <Radio
                  label="Hidden"
                  color="primary"
                  checked={theme && theme.navbarType === 'hidden'}
                  defaultChecked={theme && theme.navbarType === 'hidden'}
                  name="navbarType"
                  onChange={() => handleThemeMode('navbarType', 'hidden')}
                />
              </div>
              <div className="mr-1 mt-1">
                <Radio
                  label="Static"
                  color="primary"
                  checked={theme && theme.navbarType === 'static'}
                  defaultChecked={theme && theme.navbarType === 'static'}
                  name="navbarType"
                  onChange={() => handleThemeMode('navbarType', 'static')}
                />
              </div>
              <div className="mr-1 mt-1">
                <Radio
                  label="Sticky"
                  color="primary"
                  checked={theme && theme.navbarType === 'sticky'}
                  defaultChecked={theme && theme.navbarType === 'sticky'}
                  name="navbarType"
                  onChange={() => handleThemeMode('navbarType', 'sticky')}
                />
              </div>
              <div className="mr-1 mt-1">
                <Radio
                  label="Floating"
                  color="primary"
                  checked={theme && theme.navbarType === 'floating'}
                  defaultChecked={theme && theme.navbarType === 'floating'}
                  name="navbarType"
                  onChange={() => handleThemeMode('navbarType', 'floating')}
                />
              </div>
            </div>
          </div>
        </ConfigurationTitle>

        <ConfigurationContent />
      </ConfigurationContainer>
      <hr />
      <ConfigurationContainer>
        <ConfigurationTitle>
          <div>
            <h2>Footer Type</h2>
            <div className="d-inline-block">
              <div className="mr-1 mt-1">
                <Radio
                  label="Hidden"
                  color="primary"
                  checked={theme && theme.footerType === 'hidden'}
                  defaultChecked={theme && theme.footerType === 'hidden'}
                  name="footerType"
                  onChange={() => handleThemeMode('footerType', 'hidden')}
                />
              </div>
              <div className="mr-1 mt-1">
                <Radio
                  label="Static"
                  color="primary"
                  checked={theme && theme.footerType === 'static'}
                  defaultChecked={theme && theme.footerType === 'static'}
                  name="footerType"
                  onChange={() => handleThemeMode('footerType', 'static')}
                />
              </div>
              <div className="mr-1 mt-1">
                <Radio
                  label="Sticky"
                  color="primary"
                  checked={theme && theme.footerType === 'sticky'}
                  defaultChecked={theme && theme.footerType === 'sticky'}
                  name="footerType"
                  onChange={() => handleThemeMode('footerType', 'sticky')}
                />
              </div>
            </div>
          </div>
        </ConfigurationTitle>
        <ConfigurationContent />
      </ConfigurationContainer>
      <hr />
      <ConfigurationContainer>
        <ConfigurationTitle>
          <h2>RTL</h2>
          <Switch
            onChange={checked =>
              handleThemeMode('direction', checked ? 'rtl' : 'ltl')}
            checked={theme && theme.direction === 'rtl'}
            checkedIcon={false}
            uncheckedIcon={false}
            height={10}
            width={30}
            handleDiameter={18}
            offColor={shade(0.15, colors.primary)}
            onColor={colors.secundary}
          />
        </ConfigurationTitle>
        <ConfigurationContent />
      </ConfigurationContainer>
      <hr />
      <ConfigurationContainer>
        <ConfigurationTitle>
          <h2>Hide Scroll To Top</h2>
          <Switch
            onChange={checked => handleThemeMode('hideScrollToTop', checked)}
            checked={theme && theme.hideScrollToTop === true}
            checkedIcon={false}
            uncheckedIcon={false}
            height={10}
            width={30}
            handleDiameter={18}
            offColor={shade(0.15, colors.primary)}
            onColor={colors.secundary}
          />
        </ConfigurationTitle>
        <ConfigurationContent />
      </ConfigurationContainer>
    </Container>
  );
};

export default Customizer;
