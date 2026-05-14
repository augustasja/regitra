import { classificators, vechicleInfo, vechicleList } from "../mock-data";
import { mockDelete, mockGet, mockGetById } from "./api";

export const getVechicleList = (fail = false, signal?: AbortSignal) =>
  mockGet(vechicleList, fail, signal);

export const getVechicleInfo = (
  id: number,
  fail = false,
  signal?: AbortSignal,
) => mockGetById(vechicleInfo, id, fail, signal);

export const deleteVechicle = (id: number, fail = false) =>
  mockDelete(vechicleList, id, fail);

export const getClassificators = (fail = false, signal?: AbortSignal) =>
  mockGet(classificators, fail, signal);
