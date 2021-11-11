//Chakra
import { Box, Heading, Flex, Progress } from '@chakra-ui/react';

export function Loading(): JSX.Element {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      h="100vh"
      flexDir="column"
    >
      <Box>
        <Heading>Carregando imóveis...</Heading>
        <Progress
          mt={4}
          size="xs"
          isIndeterminate
          bgColor="transparent"
          colorScheme="facebook"
        />
      </Box>
    </Flex>
  )
}
