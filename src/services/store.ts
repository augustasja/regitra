import { vechicleList } from "../mock-data";
import { mockDelete, mockGet, mockGetById } from "./api";

export const getVechicleList = (fail = false) => mockGet(vechicleList, fail);
export const getVechicleInfo = (id: number, fail = false) =>
  mockGetById(vechicleList, id, fail);
export const deleteVechicle = (id: number, fail = false) =>
  mockDelete(vechicleList, id, fail);
