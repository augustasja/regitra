import { classificators, vechicleInfo, vechicleList } from "../mock-data";
import { mockDelete, mockGet, mockGetById } from "./api";

export const getVechicleList = (fail = false) => mockGet(vechicleList, fail);
export const getVechicleInfo = (id: number, fail = false) =>
  mockGetById(vechicleInfo, id, fail);
export const deleteVechicle = (id: number, fail = false) =>
  mockDelete(vechicleList, id, fail);

export const getClassificators = (fail = false) =>
  mockGet(classificators, fail);
