export class Product {
  id: number;
  createdDate: string;
  updatedDate: string;
  label: string;
  description: string;
  price: number;
  vatRate: number;

  constructor(id: number,
              createdDate: string,
              updatedDate: string,
              label: string,
              description: string,
              price: number,
              vatRate: number) {
    this.id = id;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
    this.label = label;
    this.description = description;
    this.price = price;
    this.vatRate = vatRate;
  }
}
