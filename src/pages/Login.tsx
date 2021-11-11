import { Button } from '@chakra-ui/button';
import { FormLabel } from '@chakra-ui/form-control';
import { Image } from '@chakra-ui/image';
import { Input } from '@chakra-ui/input';
import { Flex, Stack } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import { useState } from 'react';
import { useHistory } from 'react-router';

import { useAuth } from '../services/hooks/useAuth';


export function Login() {

    const toast = useToast();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const { signIn } = useAuth();

    async function signInUser() {

        const error = await signIn(email, password);

        if (error === true) {
            toast({
                title: 'E-mail ou senha invállidos, tente novamente.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
        if (error === false) {
            history.push('/dashboard');
        }
    }

    return (
        <Flex w="100vw" h="100vh" align="center" justify="center">
            <Image src="logo.png" />
            <Flex ml="40" as="form" width="100%" maxWidth={360} bg="#00293A" p="8" borderRadius={8} flexDir="column">
                <Stack spacing="2">
                    <FormLabel color="white" fontWeight="semibold">Nome</FormLabel>
                    <Input name="email" type="email" label="E-mail" textColor="white" onChange={event => setEmail(event.target.value)} />
                    <FormLabel color="white" fontWeight="semibold">Senha</FormLabel>
                    <Input name="password" type="password" label="Senha" textColor="white" onChange={event => setPassword(event.target.value)} />
                </Stack>
                <Button type="button" mt="6" onClick={signInUser} bgColor="white" size="lg"   >Entrar</Button>
            </Flex>
        </Flex>
    )
}
