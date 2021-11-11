//React
import { useState } from 'react';

//Chakra
import { Button, Text, Input, Image, FormLabel, Stack, HStack, SimpleGrid, useToast, Box } from "@chakra-ui/react"
import { Radio, RadioGroup } from "@chakra-ui/react"

//Services
import { storage } from '../../services/firebase/firebase';
import { api } from '../../services/api/api';

//CurrencyInput
import CurrencyInput from 'react-currency-input-field';



export function CreateImmobileForm() {
  const toast = useToast();

  const [listImages, setListImages] = useState<File[]>([]);
  const [listImagesURL, setListImagesURL] = useState<string[]>([]);
  const [type, setType] = useState('');
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [rooms, setRooms] = useState(0);
  const [suites, setSuites] = useState(0);
  const [slots, setSlots] = useState(0);
  const [street, setStreet] = useState('');
  const [district, setDistrict] = useState('');
  const [cep, setCep] = useState(0);
  const [city, setCity] = useState('');
  const [isExclusive, setIsExclusive] = useState('');



  async function SaveImages(event: any) {
    await listImages.map(async (imagem: File) => {
      await storage.ref(`/images/${imagem.name}`).put(imagem)
        .then(snapshot => {
          snapshot.ref.getDownloadURL().then(async function (downloadURL) {

            setListImagesURL(oldState => [...oldState, downloadURL])

          })
        })
    })
    setListImages([]);
  }


  async function SaveImmobile(event: any) {
    if (listImagesURL == null ||
      type === '' ||
      price === 0 ||
      size === 0 ||
      bathrooms === 0 ||
      rooms === 0 ||
      suites === 0 ||
      slots === 0
    ) {
      toast({
        title: 'Por favor, preencha todos os campos',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    api.post('/addimmobile', {
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
      city,
      isExclusive
    }).catch((err) => {
      toast({
        title: err,
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
    })
    toast({
      title: 'Imóvel adicionado com sucesso.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    setTimeout(() => window.location.reload(), 1000)

  }

  function handleUploadImages(event: any) {

    setListImages(oldState => [...oldState, ...event.target.files])
  }

  console.log(price);


  return (
    <>
      <HStack spacing="12">
        <Stack w="40%">
          <FormLabel color="#00293">Tipo</FormLabel>
          <Input
            onChange={event => setType(event.target.value)}
            placeholder="Tipo do imóvel"
            type="text"
            textColor="#03292A"
            borderColor="#03292A"
          />

        </Stack>
        <Stack w="40%">
          <FormLabel color="#00293">Preço</FormLabel>

          <CurrencyInput
            id="input-example"
            prefix="R$"
            style={{
              borderWidth: "1px",
              borderColor: "#03292A",
              borderRadius: "5px",
              height: "40px",
              paddingLeft: "15px"
            }}
            placeholder="Preço do imóvel"
            decimalsLimit={2}
            onValueChange={(value, name) => setPrice(Number(value))}
          />


        </Stack>
      </HStack>
      <HStack spacing="12" mt="6">
        <Stack w="40%">
          <FormLabel color="#03292A">Tamanho</FormLabel>
          <Input
            onChange={event => setSize(Number(event.target.value))}
            placeholder="Tamanho do terreno"
            type="number"
            textColor="#03292A"
            borderColor="#03292A"
          />
        </Stack>
        <Stack w="40%">
          <FormLabel color="#03292A">Banheiros</FormLabel>
          <Input
            onChange={event => setBathrooms(Number(event.target.value))}
            placeholder="Quantidade de banheiros"
            type="number"
            textColor="#03292A"
            borderColor="#03292A"
          />
        </Stack>
      </HStack>
      <HStack spacing="12" mt="6">
        <Stack w="40%">
          <FormLabel color="#03292A">Quartos</FormLabel>
          <Input
            onChange={event => setRooms(Number(event.target.value))}
            placeholder="Quantidade de quartos"
            type="number"
            textColor="#03292A"
            borderColor="#03292A"
          />
        </Stack>
        <Stack w="40%">
          <FormLabel color="#03292A">Suites</FormLabel>
          <Input
            onChange={event => setSuites(Number(event.target.value))}
            placeholder="Quantidade de suites"
            type="number"
            textColor="#03292A"
            borderColor="#03292A"
          />
        </Stack>
      </HStack>
      <HStack spacing="12" mt="6">
        <Stack w="40%">
          <FormLabel color="#03292A">Vagas</FormLabel>
          <Input
            onChange={event => setSlots(Number(event.target.value))}
            placeholder="Quantidade de vagas"
            type="number"
            textColor="#03292A"
            borderColor="#03292A"
          />
        </Stack>
        <Stack w="40%">
          <FormLabel color="#03292A">Rua</FormLabel>
          <Input
            onChange={event => setStreet(event.target.value)}
            placeholder="Endereço da rua"
            type="text"
            textColor="#03292A"
            borderColor="#03292A"
          />
        </Stack>
      </HStack>
      <HStack spacing="12" mt="6">
        <Stack w="40%">
          <FormLabel color="#03292A">Bairro</FormLabel>
          <Input
            onChange={event => setDistrict(event.target.value)}
            placeholder="Endereço do bairro"
            type="text"
            textColor="#03292A"
            borderColor="#03292A"
          />
        </Stack>
        <Stack w="40%">
          <FormLabel color="#03292A">CEP</FormLabel>
          <Input
            onChange={event => setCep(Number(event.target.value))}
            placeholder="CEP"
            type="number"
            textColor="#03292A"
            borderColor="#03292A"
          />
        </Stack>
      </HStack>
      <HStack spacing="12" mt="6">
        <Stack w="40%">
          <FormLabel color="#03292A">Cidade</FormLabel>
          <Input
            onChange={event => setCity(event.target.value)}
            placeholder="Cidade"
            type="text"
            textColor="#03292A"
            borderColor="#03292A"
          />
        </Stack>
        <Stack w="40%">
          <FormLabel color="#03292A">É exclusivo?</FormLabel>

          <RadioGroup onChange={setIsExclusive} value={isExclusive}>
            <Stack direction="row">
              <Radio value='1'>Sim</Radio>
              <Radio value='0'>Não</Radio>
            </Stack>
          </RadioGroup>


        </Stack>
      </HStack>

      <HStack mt="8" mb="8">
        <input type="file" multiple onChange={handleUploadImages} />
        <Button onClick={SaveImages}>Upload das imagens</Button>
        <Button onClick={SaveImmobile}>Upload do terreno</Button>
      </HStack>
      <Text fontSize="20px" mb="4" color="#03292A">Fotos do terreno</Text>
      <SimpleGrid minChildWidth="300px" >
        {listImagesURL.map((img) => {
          return (
            <Box key={img}>
              <Image src={img} h="300px" w="300px" />
            </Box>
          )
        })}
      </SimpleGrid>

    </>
  )
}



