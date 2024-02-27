import { ListItemsResponse, ItemResponse, Item, Author, Price } from "./models";

const author = new Author(
  'Karen',
  'Moreno'
);

export function deserializeApiDataItems(apiResponse: any): ListItemsResponse {

  const categories = apiResponse.filters.find(
    (filter: any) => filter.id === "category"
  )?.values[0]?.path_from_root?.map(c => c.name).join(" > ") ?? "";

  const items = apiResponse.results.map((result: any) => {

    const amountInt = parseInt(result.price);
    const amountDecimal = parseFloat((result.price - amountInt).toFixed(2));

    const price = new Price(
      result.currency_id,
      amountInt, 
      amountDecimal,
    );

    return new Item(
      result.id,
      result.title,
      price,
      result.thumbnail,
      result.condition,
      result.shipping.free_shipping,
      result.sold_quantity,
      result.description,
      result.seller.nickname
    );
  });

  return new ListItemsResponse(author, categories, items);
}

export function deserializeApiDataItem(apiResponse: any, apiResponseDescription: any): ItemResponse {
  const amountInt = parseInt(apiResponse.price);
  const amountDecimal = parseFloat((apiResponse.price - amountInt).toFixed(2));

  const price = new Price(
    apiResponse.currency_id,
    amountInt, 
    amountDecimal,
  );

  const itemFormatted = new Item(
    apiResponse.id,
    apiResponse.title,
    price,
    apiResponse.pictures[0]?.url,
    apiResponse.condition,
    apiResponse.shipping.free_shipping,
    apiResponse.initial_quantity,
    apiResponseDescription.plain_text
  )


  return new ItemResponse(
    author,
    itemFormatted
  );
}
