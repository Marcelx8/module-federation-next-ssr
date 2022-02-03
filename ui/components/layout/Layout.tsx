import React from 'react';
import classes from './Layout.module.scss';
import { Box, Container, Flex } from '@chakra-ui/react'
import Nav from '../Nav'
import Header from './Header'
// const Header = (await import('ui/Header')).default

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