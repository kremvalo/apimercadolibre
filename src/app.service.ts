import { Injectable } from '@nestjs/common';
import { ItemResponse, ListItemsResponse } from './models';
import { deserializeApiDataItems, deserializeApiDataItem } from './deserializers';

@Injectable()
export class AppService {
  private apiUrlBase = `https://api.mercadolibre.com/`;

  async getListItems(limit: number, query: string): Promise<ListItemsResponse> {
    const path = '/sites/MLA/search?';

    try {
      const response = await fetch(`${this.apiUrlBase}${path}limit=${limit}&q=${query}`);

      if (!response.ok) {
        throw new Error(`Error al hacer la solicitud: ${response.status} ${response.statusText}`);
      } else {
        const apiResponse = await response.json();

        return (deserializeApiDataItems(apiResponse));
      }

    } catch (error) {
      throw new Error(`Error en la solicitud`);
    }
  }

  async getItem(idItem: string): Promise<ItemResponse> {
    const path = '/items/';

    try {
      const responseItem = await fetch(`${this.apiUrlBase}${path}${idItem}`);
      const responseDescription = await fetch(`${this.apiUrlBase}${path}${idItem}/description`);

      if (!responseItem.ok) {
        throw new Error(`Error al hacer la solicitud: ${responseItem.status} ${responseItem.statusText}`);
      } else {
        const apiResponse = await responseItem.json();
        const apiResponseDescription = responseDescription.ok ? await responseDescription.json() : "";

        return (deserializeApiDataItem(apiResponse, apiResponseDescription));
      }

    } catch (error) {
      throw new Error(`Error en la solicitud`);
    }
  }
}


