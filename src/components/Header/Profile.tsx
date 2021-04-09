import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileInfo?: boolean;
}

export function Profile({
  showProfileInfo = false
}: ProfileProps) {
  return (
    <Flex
      align='center'
    >
      {showProfileInfo && (
        <Box mr='4' textAlign='right'>
        <Text>Rafael Papastamatiou</Text>
        <Text 
          color='gray.300' 
          fontSize='small'
        >
          rafaelpapastamatiou@gmail.com
        </Text>
        </Box>
      )}

      <Avatar size='md' name='Rafael Papastamatiou' src='https://github.com/rafaelpapastamatiou.png'/>
    </Flex>
  )
}