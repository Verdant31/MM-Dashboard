//Chakra
import { Box, Text, Flex, Image, Icon, IconButton } from "@chakra-ui/react"

//React
import { useInfiniteQuery } from 'react-query';
import { useState } from 'react';

//React Icons
import { FiLogOut } from 'react-icons/fi';


//Services
import { api } from '../services/api/api';
import firebase from 'firebase';

//Components
import { Immobile as Imovel } from '../components/Immobile';
import { CreateImmobileForm } from '../components/CreateImmobileForm';
import { useHistory } from 'react-router';
import { Loading } from '../components/Utility/Load/Loading';
import { Error } from '../components/Utility/Error/Error';


type Immobile = {
    id: string;
    images: string[];
    type: string;
    price: number;
    size: number;
    bathrooms: number;
    rooms: number;
    suites: number;
    slots: number;
    street: string;
    city: string;
    district: string;
    cep: number;
    isExclusive: string;
}[];


export function Dashboard() {
    let history = useHistory();
    const [immobiles, setImmobiles] = useState<Immobile>([]);

    async function signOut() {
        await firebase.auth().signOut().catch((err) => {
            console.log(err);
        })
        history.push('/');
    }

    const { isLoading, isError } =
        useInfiniteQuery(
            'imóveis',
            async () => {
                await api.get('products').then((response: any) => {
                    const data = response.data;
                    const newData = Object.keys(data).map(key => ({
                        id: key,
                        images: data[key].fotosDoTerreno,
                        type: data[key].tipo,
                        price: data[key].preco,
                        size: data[key].tamanho,
                        bathrooms: data[key].banheiros,
                        rooms: data[key].quartos,
                        suites: data[key].suites,
                        slots: data[key].vagas,
                        city: data[key].cidade,
                        district: data[key].bairro,
                        cep: data[key].cep,
                        street: data[key].rua,
                        isExclusive: data[key].exclusivo,

                    }))
                    setImmobiles(newData);
                })
            }
        );


    if (isError) {
        return <Error />
    }

    return (
        <>
            <Flex mt="8" justify="center" h="120px" w="100%" bgColor="white">
                <Image src="logo.png" mr="40" />
                <IconButton
                    _focus={{ outline: 'none' }}
                    icon={<Icon
                        as={FiLogOut}
                    />}
                    fontSize="60"
                    variant="unstyled"
                    onClick={signOut}
                    aria-label="Open Navigation"
                    mr="2"
                >
                </IconButton>
            </Flex>
            <Flex mt="12">
                <Box h="300px" w="50vw" >
                    <Text fontSize="24px" mt="4" align="center" fontWeight="semibold" color="#03292A">ADICIONAR NOVO IMÓVEL</Text>
                    <Box mt="4" ml="20">
                        <CreateImmobileForm />
                    </Box>
                </Box>
                <Box h="80vh" w="50vw">
                    <Text fontSize="24px" mt="4" align="center" fontWeight="semibold" color="#03292A">EDITAR/REMOVER IMÓVEIS</Text>
                    <Box mt="4" ml="20" height="100%">
                        {immobiles.map((imovel) => {
                            return (
                                <Box key={imovel.id}>
                                    <Imovel immobile={imovel} />
                                    <Box mb="8" mt="8" h="2px" bgColor="black" w="90%" />
                                </Box>
                            )
                        })}
                    </Box>
                </Box>
            </Flex>
        </>

    )
}



