import {
  Box,
  useBreakpointValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from '@chakra-ui/react';
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';
import { SidebarNav } from './SidebarNav';

export function Sidebar(): JSX.Element {
  const { isOpen, onClose } = useSidebarDrawer();

  const isDrawerSidebar = useBreakpointValue({
    base: true,
    xl: false,
  });

  if (isDrawerSidebar) {
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent background="gray.800" p="4">
            <DrawerCloseButton mt="6" />
            <DrawerHeader>Navegação</DrawerHeader>

            <DrawerBody>
              <SidebarNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }

  return (
    <Box as="aside" w={256} pos="fixed" pr="6">
      <SidebarNav />
    </Box>
  );
}
