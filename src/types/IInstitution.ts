export interface IInstitution {
  id: number;
  name: string;
  categoryId: number;
  image: string;
  phone: string;
  email: string;
  address: string;
  whatsapp?: string;
  facebook?: string;
  instagram?: string;
  coordinate?: ICoordinate;
  followers: number;
  donorsQty: number;
  partnersQty: number;
}

interface ICoordinate {
  latitude: number;
  longitude: number;
}
