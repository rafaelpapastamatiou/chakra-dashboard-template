import React, { ReactNode } from 'react'

import { Flex, SimpleGrid, Box, Text, theme, Button, useBreakpointValue } from "@chakra-ui/react";

import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({
  children
}: LayoutProps) {
  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false
  })

  return (
    <Flex direction='column' minH='100vh' maxWidth={1920} mx='auto'>
      <Header />

      <Flex w='100%' my='6' mx='auto' px='6' mt='24'>
        <Sidebar />

        <Flex flex='1' ml={isDrawerSidebar ? 0 : 256} >
          {children}
        </Flex>
      </Flex>
    </Flex>      
  )
}
