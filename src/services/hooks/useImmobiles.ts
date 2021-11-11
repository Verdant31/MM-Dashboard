import { useQuery } from 'react-query';
import { api } from '../api/api';

type Immobiles = {
    id: string;
    image: string;
    type: string;
    price: number;
    size: number;
    toilets: number;
    suites: number;
    rooms: number;
    slots: number;
}[];

type Immobile = {
    id: string;
    image: string;
    type: string;
    price: number;
    size: number;
    toilets: number;
    suites: number;
    rooms: number;
    slots: number;
};

type GetImmobilesResponse = {
    totalCount: number;
    immobiles: Immobiles;
}

export async function getImmobiles(page: number): Promise<GetImmobilesResponse> {
    const { data, headers } = await api.get(`getproducts?page=${page}`);
    const totalCount = Number(headers['x-total-count']);
    const immobiles = data.map((imovel: Immobile) => {
        return {
            id: imovel.id,
            image: imovel.image,
            type: imovel.type,
            price: imovel.price,
            size: imovel.size,
            toilets: imovel.toilets,
            rooms: imovel.rooms,
            suites: imovel.suites,
            slots: imovel.slots
        }
    });

    return {
        immobiles, totalCount
    };
};


export function useImmobiles(page: number) {
    return useQuery(['imóveis', page], () => getImmobiles(page), {
        staleTime: 1000 * 5
    });
}


