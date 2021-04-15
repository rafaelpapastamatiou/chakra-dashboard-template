import Link from 'next/link'
import { Box, Button, Checkbox, Flex, Heading, Icon, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { useQuery } from 'react-query'

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

export default function ListUsers() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  const { data, isLoading, error } = useQuery('users', async() => {
    const response = await fetch('http://localhost:3000/api/users')
    const data = await response.json()
    
    return data.users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }))
  }, {
    staleTime: 1000 * 5 // 5 seconds
  })

  return (
    <Box>
      <Header/>

      <Flex w='100%' my='6' maxWidth={1480} mx='auto' px={['3', '3', '6']} >
        <Sidebar />

        <Box flex='1' borderRadius={8} bg='gray.800' p='8'>
          <Flex
            mb='8'
            justify='space-between'
            align='center'
          >
            <Heading size='lg' fontWeight='normal'>Usuários</Heading>

            <Link href='/users/create'>
              <Button 
                as='a' 
                size='sm' 
                fontSize='sm' 
                colorScheme='pink'
                leftIcon={<Icon as={RiAddLine} />}
              >
                Criar novo
              </Button>
            </Link>
          </Flex>

          { isLoading ? (
            <Flex justify='center'>
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify='center'>
              <Text>Erro ao obter dados dos usuários.</Text>
            </Flex>
          ) : (
            <>
              <Table
                colorScheme='whiteAlpha'
              >
              <Thead>
                <Tr>
                  <Th px={['4', '4', '6']} color='gray.300' width='8'>
                    <Checkbox colorScheme='pink' />
                  </Th>
                  <Th>
                    Usuário
                  </Th>
                  {isWideVersion && (
                    <Th>
                      Data de cadastro
                    </Th>
                  )}
                  {isWideVersion && (
                    <Th>
                      Ações
                    </Th>
                  )}
                </Tr>
              </Thead>
              <Tbody>
                {data.map(user => (
                  <Tr>
                  <Td px={['4', '4', '6']}>
                    <Checkbox colorScheme='pink' />
                  </Td>
                  <Td>
                    <Box>
                      <Text fontWeight='bold'>{user.name}</Text>
                      <Text fontSize='small' color='gray.300'>{user.email}</Text>
                    </Box>
                  </Td>
                  {isWideVersion && (
                    <Td>
                    <Text>
                      {user.createdAt}
                    </Text>
                    </Td>
                  )}
                  {isWideVersion && (
                    <Td>
                      <Button 
                        as='a' 
                        size='sm' 
                        fontSize='sm' 
                        colorScheme='pink'
                        variant={isWideVersion ? 'link' : 'solid'}
                        leftIcon={<Icon as={RiPencilLine} />}
                      >
                        Editar
                      </Button>
                    </Td>
                  )}
                </Tr>
                ))}
              </Tbody>
            </Table>
            <Pagination />
          </>
          )}
        </Box>
      </Flex>
    </Box>
  )
}