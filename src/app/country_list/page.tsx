"use client"
import CountriesList from "@/components/CountriesList";
import authApi from "@/services/auth/auth.api";
import { Country } from "@/types/country_code.types";
import { Flags } from "@/types/flags.types";
import { Avatar, CircularProgress, List, ListItem, ListItemAvatar, ListItemText, TextField } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";


const CountryList = () => {
  const [countryCode, setCountryCode] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [dataFlags, SetDataFlags] = useState<Flags | null>(null);


  useEffect(() => {
    // Async call to get the data of the countries
    const fetchCountries = async () => {
      try {
        const countries = await authApi.getContriesCode();
        const responseFlags = await authApi.getContriesFlags();

        SetDataFlags(responseFlags)
        
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

    fetchCountries();
  }, []); 
  
  //Filter the list by the user's search
  const filteredCountries = countryCode.filter(country => 
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
 
  return (
    <div className="flex flex-col items-center mt-8">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

            
            {!loading ? 
              <>
                <div className="searchBarContainer">
                    <TextField
                      label="Search Country"
                      variant="outlined"
                      fullWidth
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)} // Update the state any time the user type
                      style={{ marginBottom: '20px' }}
                    />
                </div>
                <CountriesList filteredCountries={filteredCountries} dataFlags={dataFlags}/>
                {filteredCountries.map((country, index) =>(
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