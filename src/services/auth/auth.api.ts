import { Country } from "@/types/country_code.types";
import httpGet from "../common/http.service";
import { Flags } from "@/types/flags.types";
import { PopulationTypes } from "@/types/population.types";
import { CountryInfo } from "@/types/country_info.types";

class AuthAPI { 
    getContriesCode = async(): Promise<Country> => httpGet(`/`)
    getInfoCountry = async(countryCode: string | null): Promise<CountryInfo> => httpGet(`/country/${countryCode}`)
    getContriesFlags = async(): Promise<Flags> => httpGet(`/countries/flags`)
    getContriesPopulation = async(): Promise<PopulationTypes> => httpGet(`/countries/population`)
}
const authApi = new AuthAPI();
export default authApi;