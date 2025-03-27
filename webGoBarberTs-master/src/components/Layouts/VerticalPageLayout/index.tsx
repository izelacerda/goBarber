import React from 'react';

import { Container } from './styles';

const VerticalPageLayout: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default VerticalPageLayout;
