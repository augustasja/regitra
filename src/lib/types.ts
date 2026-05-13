export type VechicleInfo = {
  id: number;
  regNr: string;
  make: string;
  model: string;
  year: number;
  code: string;
};
export type VechicleList = VechicleListItem[];
export type VechicleListItem = Pick<VechicleInfo, "id" | "regNr" | "code">;
export type FilterItem = Pick<VechicleInfo, "code"> & { name: string };
