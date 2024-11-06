"use client"
import BorderList from "@/components/BorderList";
import authApi from "@/services/auth/auth.api";
import { CountryInfo } from "@/types/country_info.types";
import { Flags } from "@/types/flags.types";
import { PopulationTypes } from "@/types/population.types";
import { CircularProgress} from "@mui/material";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Population from "@/components/Population";
import ImageNotFound from '../../../../public/notFound.png'

const CountryList = () => {
    const [infoCountry, setInfoCountry] = useState<CountryInfo | null>(null);
    const [dataFlags, SetDataFlags] = useState<Flags | null>(null);
    const [dataPopulation, SetDataPopulation] = useState<PopulationTypes | null>(null);
    const params = useParams();
    const countryCodeParams = params?.country_detail;
    
    useEffect(() => {
        // Async call to get the code from the contries
        const fetchCountries = async () => {
        try {
            const countryCode = typeof countryCodeParams === 'string' ? countryCodeParams : null;

            const countries = await authApi.getInfoCountry(countryCode);
            const responsePopulation = await authApi.getContriesPopulation();
            const responseFlags = await authApi.getContriesFlags();
            
            setInfoCountry(countries); // Solo si es un arreglo
            SetDataPopulation(responsePopulation)
            SetDataFlags(responseFlags)
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
        };

        fetchCountries();
    }, [countryCodeParams]); 

    const populationFilter = dataPopulation?.data.filter(country => country.country === infoCountry?.commonName)
    const flagFilter = dataFlags?.data.filter(flag => flag.iso2 === countryCodeParams)
   
    const flag = flagFilter?.[0];
    
    const nameCountry = infoCountry?.commonName
    
    return (
        <div>
            {flag || populationFilter ? 
            <>
                <div className="flex items-center	">
                <Image className="ml-4" width={80} height={4} src={flag?.flag || ImageNotFound} alt="Image Flag"/>
                    <p className="ml-4 mr-4">{nameCountry}</p>
                </div>

                <h1 className="text-center">Border Countries:</h1>
                <div className="flex justify-center">
                    <BorderList infoCountry={infoCountry} dataFlags={dataFlags}/>
                </div>
                {dataPopulation ?
                    <Population dataPopulation={dataPopulation} nameCountry={nameCountry}/>
                :
                <p>Loading Data... <CircularProgress /></p>
                }
            </>  
            :
                <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                    
                </main>
            }
        </div>
    );
}
export default CountryList;