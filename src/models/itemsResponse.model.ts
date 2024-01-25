import { Author } from "./author.model";
import { Item } from "./item.model";

export class ListItemsResponse {
  author: Author;
  categories: string;
  items: Item[];

  constructor(author: Author, categories: string, items: Item[]) {
    this.author = author;
    this.categories = categories;
    this.items = items;
  }
}