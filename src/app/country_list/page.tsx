"use client"
import authApi from "@/services/auth/auth.api";
import { Country } from "@/types/country_code.types";
import { Avatar, CircularProgress, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";


const CountryList = () => {
  const [countryCode, setCountryCode] = useState<Country[]>([]);  // Estado local para los países
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    // Async call to get the data of the countries
    const fetchCountries = async () => {
      try {
        const countries = await authApi.getContriesCode();
        console.log(countries);
        
        if (Array.isArray(countries)) {
          setCountryCode(countries); 
          setLoading(false)
        } else {
          console.error('Expected an array of countries but got:', countries);
        }
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries(); // Ejecuta la llamada cuando el componente se monta
  }, []); 
  console.log(loading);
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

            
            {!loading ? 
              <>
                {countryCode.map((country, index) =>(
                  <Link  href={`/country_list/${country.countryCode}`} key={country.countryCode}>
                      <List key={index}>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={country.name}
                            secondary={country.countryCode}
                            />
                        </ListItem>
                      </List>
                  </Link>
                ))}
              </>
            :
              <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                  <CircularProgress />
              </main>            
            }
            
            
            
      </main>
      
    </div>
  );
}


export default CountryList;