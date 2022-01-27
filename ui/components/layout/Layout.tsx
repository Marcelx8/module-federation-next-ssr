// import React from 'react';
// import classes from './Layout.module.scss';
import { Box, Container, Flex } from '@chakra-ui/react'
import Nav from 'ui/Nav';
import Header from 'ui/Header';

function Layout({ children }: { children: React.ReactNode }) {
  // const [menuContext, setMenuContext] = useContext(MenuContext);
  return (
    <>
    <Header>
      <Nav />
    </Header>
      {/* <MainNavigation /> */}
      <Container maxW='container.lg'>
        <Flex>
          <Box mr="2" flexBasis="242px">
            {/* SubNavigation */}
            {/* <SubNavigation subItems={menuContext} /> */}
          </Box>
          <Box flexBasis="calc(100% - 250px)" maxWidth="calc(100% - 250px)">
            {children}
            {/* <main className={classes.main}>{children}</main> */}
          </Box>
        </Flex>
      </Container>
      {/* <Footer /> */}
    </>
  );
}

export default Layout