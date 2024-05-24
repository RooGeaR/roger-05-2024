export interface IBaseItem {
  name: string;
  url: string;
}

export interface IPokemon extends IBaseItem {
  id: number;
}

export interface ISelectedPokemon {
  id: number;
  name: string;
}

export interface IStat {
  base_stat: number;
  effort: number;
  stat: IBaseItem
}

export interface IType {
  slot: number;
  type: IBaseItem;
}

interface ICries {
  latest: string;
  legacy: string;
}

export interface IPokemonDetail {
  id: number;
  name: string;
  types: IType[];
  stats: IStat[];
  cries: ICries;
  height: number;
  weight: number;
  species: IBaseItem;
}

export interface IFlavorTextEntry {
  flavor_text: string;
  language: IBaseItem;
}
