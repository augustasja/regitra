import type { FilterItem, VechicleInfo, VechicleList } from "./lib/types";

export const vechicleList: VechicleList = [
  { id: 1, regNr: "ABC-123", code: "CAR" },
  { id: 2, regNr: "BXY-987", code: "TRUCK" },
  { id: 3, regNr: "MOTO-45", code: "MOTORCYCLE" },
  { id: 4, regNr: "VAN-202", code: "VAN" },
  { id: 5, regNr: "BUS-12", code: "BUS" },
  { id: 6, regNr: "EV-001", code: "CAR" },
  { id: 7, regNr: "LT-777", code: "CAR" },
  { id: 8, regNr: "TRK-314", code: "TRUCK" },
  { id: 9, regNr: "MC-900", code: "MOTORCYCLE" },
  { id: 10, regNr: "CARGO-5", code: "VAN" },
];

export const vechicleInfo: VechicleInfo[] = [
  {
    id: 1,
    make: "Toyota",
    model: "Corolla",
    year: 2020,
    regNr: "ABC-123",
    code: "CAR",
  },
  {
    id: 2,
    make: "Ford",
    model: "F-150",
    year: 2021,
    regNr: "BXY-987",
    code: "TRUCK",
  },
  {
    id: 3,
    make: "Honda",
    model: "CBR600RR",
    year: 2019,
    regNr: "MOTO-45",
    code: "MOTORCYCLE",
  },
  {
    id: 4,
    make: "Mercedes-Benz",
    model: "Sprinter",
    year: 2022,
    regNr: "VAN-202",
    code: "VAN",
  },
  {
    id: 5,
    make: "Volvo",
    model: "7900 Electric",
    year: 2020,
    regNr: "BUS-12",
    code: "BUS",
  },
  {
    id: 6,
    make: "Tesla",
    model: "Model 3",
    year: 2021,
    regNr: "EV-001",
    code: "CAR",
  },
  {
    id: 7,
    make: "Volkswagen",
    model: "Golf",
    year: 2018,
    regNr: "LT-777",
    code: "CAR",
  },
  {
    id: 8,
    make: "Volvo",
    model: "FH16",
    year: 2020,
    regNr: "TRK-314",
    code: "TRUCK",
  },
  {
    id: 9,
    make: "Honda",
    model: "CBR600RR",
    year: 2019,
    regNr: "MC-900",
    code: "MOTORCYCLE",
  },
  {
    id: 10,
    make: "Volkswagen",
    model: "Transporter",
    year: 2021,
    regNr: "CARGO-5",
    code: "VAN",
  },
];

export const filter: FilterItem[] = [
  {
    code: "CAR",
    name: "Lengvasis automobilis",
  },
  {
    code: "BUS",
    name: "Autobusas",
  },
  {
    code: "TRUCK",
    name: "Sunkvežimis",
  },
  {
    code: "MOTORCYCLE",
    name: "Motoroleris",
  },
  {
    code: "VAN",
    name: "Keleivinis mikroautobusas",
  },
];
