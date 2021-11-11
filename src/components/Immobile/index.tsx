//React
import { useState } from 'react';

//Chakra
import { Button, Input, FormLabel, Stack, HStack, Box, RadioGroup, Radio } from "@chakra-ui/react"
import { useToast } from '@chakra-ui/toast';

//Services
import { api } from '../../services/api/api';




interface ImmobileProps {
    immobile: {
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
    }
}

export function Immobile({ immobile }: ImmobileProps) {
    const toast = useToast();

    const [listImagesURL] = useState<string[]>(immobile.images);
    const [type, setType] = useState(immobile.type);
    const [price, setPrice] = useState(immobile.price);
    const [size, setSize] = useState(immobile.size);
    const [bathrooms, setBathrooms] = useState(immobile.bathrooms);
    const [rooms, setRooms] = useState(immobile.rooms);
    const [suites, setSuites] = useState(immobile.suites);
    const [slots, setSlots] = useState(immobile.slots);
    const [street, setStreet] = useState(immobile.street);
    const [district, setDistrict] = useState(immobile.district);
    const [cep, setCep] = useState(immobile.cep);
    const [city, setCity] = useState(immobile.city);
    const [isExclusive, setIsExclusive] = useState(immobile.isExclusive);

    async function handleDeleteImmobile(id: string) {
        api.delete(`/deleteproduct/${id}`).then((response) => {
        }).catch((err) => {
            toast({
                title: err,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        })
        toast({
            title: 'Imóvel deletado!',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
        setTimeout(() => window.location.reload(), 1000)
    }

    async function handleEditImmobile(id: string) {
        api.put('/updateimmobile', {
            id,
            images: listImagesURL,
            type,
            price,
            size,
            bathrooms,
            rooms,
            suites,
            slots,
            street,
            district,
            cep,
            city
        }).catch((err) => {
            toast({
                title: err,
                status: 'error',
                duration: 300,
                isClosable: true,
            })
        })
        toast({
            title: 'Imóvel editado com sucesso!!',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
        setTimeout(() => window.location.reload(), 1000)
    }


    return (
        <Box mr="8" mb="40">
            <HStack spacing="12">
                <Stack w="45%">
                    <FormLabel color="#00293A">Tipo (Atual = {immobile.type})</FormLabel>
                    <Input
                        onChange={event => setType(event.target.value)}
                        placeholder="Tipo do imóvel"
                        name="type"
                        type="text"
                        textColor="#00293A"
                        borderColor="#00293A"
                    />
                </Stack>
                <Stack w="45%">
                    <FormLabel color="#00293A">Preço (Atual = {immobile.price?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })})</FormLabel>
                    <Input
                        onChange={event => setPrice(Number(event.target.value))}
                        placeholder="Preço do imóvel"
                        name="price"
                        type="number"
                        textColor="#00293A"
                        borderColor="#00293A"
                    />
                </Stack>
            </HStack>
            <HStack spacing="12" mt="6">
                <Stack w="45%">
                    <FormLabel color="#00293A">Tamanho (Atual = {immobile.size} m²)</FormLabel>
                    <Input
                        onChange={event => setSize(Number(event.target.value))}
                        placeholder="Tamanho do terreno"
                        name="Size"
                        type="number"
                        textColor="#00293A"
                        borderColor="#00293A"
                    />
                </Stack>
                <Stack w="45%">
                    <FormLabel color="#00293A">Banheiros (Atual = {immobile.bathrooms})</FormLabel>
                    <Input
                        onChange={event => setBathrooms(Number(event.target.value))}
                        placeholder="Quantidade de banheiros"
                        name="Bathrooms"
                        type="number"
                        textColor="#00293A"
                        borderColor="#00293A"
                    />
                </Stack>
            </HStack>
            <HStack spacing="12" mt="6">
                <Stack w="45%">
                    <FormLabel color="#00293A">Quartos (Atual = {immobile.rooms})</FormLabel>
                    <Input
                        onChange={event => setRooms(Number(event.target.value))}
                        placeholder="Quantidade de quartos"
                        name="Rooms"
                        type="number"
                        textColor="#00293A"
                        borderColor="#00293A"
                    />
                </Stack>
                <Stack w="45%">
                    <FormLabel color="#00293A">Suites (Atual = {immobile.suites})</FormLabel>
                    <Input
                        onChange={event => setSuites(Number(event.target.value))}
                        placeholder="Quantidade de suites"
                        name="Suites"
                        type=""
                        textColor="#00293A"
                        borderColor="#00293A"
                    />
                </Stack>
            </HStack>

            <HStack spacing="12" mt="6">
                <Stack w="45%">
                    <FormLabel color="#00293A">Vagas (Atual = {immobile.slots})</FormLabel>
                    <Input
                        onChange={event => setSlots(Number(event.target.value))}
                        placeholder="Quantidade de vagas"
                        name="Vagas"
                        type="number"
                        textColor="#00293A"
                        borderColor="#00293A"
                    />
                </Stack>
                <Stack w="45%">
                    <FormLabel color="#00293A">Rua (Atual = {immobile.street})</FormLabel>
                    <Input
                        onChange={event => setStreet(event.target.value)}
                        placeholder="Endereço da rua"
                        type="text"
                        textColor="#00293A"
                        borderColor="#00293A"
                    />
                </Stack>
            </HStack>
            <HStack spacing="12" mt="6">
                <Stack w="45%">
                    <FormLabel color="#00293A">Bairro (Atual = {immobile.district})</FormLabel>
                    <Input
                        onChange={event => setDistrict(event.target.value)}
                        placeholder="Bairro"
                        type="text"
                        textColor="#00293A"
                        borderColor="#00293A"
                    />
                </Stack>
                <Stack w="45%">
                    <FormLabel color="#00293A">CEP (Atual = {immobile.cep})</FormLabel>
                    <Input
                        onChange={event => setCep(Number(event.target.value))}
                        placeholder="CEP"
                        type="number"
                        textColor="#00293A"
                        borderColor="#00293A"
                    />
                </Stack>
            </HStack>
            <HStack spacing="12" mt="6">
                <Stack w="45%">
                    <FormLabel color="#00293A">Cidade (Atual = {immobile.city})</FormLabel>
                    <Input
                        onChange={event => setCity(event.target.value)}
                        placeholder="Cidade"
                        type="text"
                        textColor="#00293A"
                        borderColor="#00293A"
                    />
                </Stack>
                <Stack w="40%">
                    {immobile.isExclusive ? (
                        <>
                            <FormLabel color="#03292A">É exclusivo?(Atual = Sim)</FormLabel>

                        </>
                    ) : (
                        <>
                            <FormLabel color="#03292A">É exclusivo?(Atual = Não)</FormLabel>

                        </>
                    )
                    }

                    <RadioGroup onChange={setIsExclusive} value={isExclusive}>
                        <Stack direction="row">
                            <Radio value='1'>Sim</Radio>
                            <Radio value='0'>Não</Radio>
                        </Stack>
                    </RadioGroup>


                </Stack>

            </HStack>
            <HStack spacing="12" mt="6">
                <Stack w="45%">
                    <Button textColor="white" bgColor="#bb2124" onClick={() => handleDeleteImmobile(immobile.id)}>Excluir</Button>
                    <Button textColor="white" bgColor="#22bb33" onClick={() => handleEditImmobile(immobile.id)}>Salvar</Button>
                </Stack>
            </HStack>
        </Box>
    )
}



