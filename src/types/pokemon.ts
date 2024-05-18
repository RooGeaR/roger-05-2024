interface IBaseItem {
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

interface IStat {
  base_stat: number;
  effort: number;
  stat: IBaseItem
}

interface IType {
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
}
