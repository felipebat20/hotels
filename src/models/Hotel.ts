export class Hotel {
  constructor(
    private id: number,
    private name: string,
    private price: number,
    private images: string[],
    private description: string,
    private address: {
      city: string;
      district: string;
      street: string;
    },
  ) {}
}
