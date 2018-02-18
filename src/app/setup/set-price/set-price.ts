
export class SetPrice {
  code?: string = 'N/A';
  type?: string | null | undefined;
  price?: string | null | undefined;
  constructor(params: SetPrice) {
    Object.assign(this, params);
  }
}
