import citiesData from "./cities.json";

export interface City {
  id: string;
  name: string;
  province: string;
  lat: number;
  lon: number;
}

type RawCity = {
  id: string;
  name: {
    local: string;
    en: string;
    slug: string;
  };
  parent: {
    id: string;
    name: {
      local: string;
      en: string;
      slug: string;
    };
  };
  geo: {
    lat: string;
    lon: string;
  };
};

export const cities: City[] = (citiesData as RawCity[])
  .filter(
    (city) =>
      city.geo?.lat &&
      city.geo?.lon &&
      city.name?.local &&
      city.parent?.name?.local,
  )
  .map((city) => ({
    id: city.id,
    name: city.name.local.replace(/^شهرستان\s+/, ""),
    province: city.parent.name.local,
    lat: Number(city.geo.lat),
    lon: Number(city.geo.lon),
  }));

export const defaultCity: City = {
  id: "IR028001",
  name: "تهران",
  province: "تهران",
  lat: 35.6892,
  lon: 51.389,
};