import { Country } from '@/types/country_code.types'
import { Flags } from '@/types/flags.types'
import { List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ImageNotFound from '../../public/notFound.png'

type CountriesListProps ={
    filteredCountries: Country[] | null,
    dataFlags: Flags | null
}
const CountriesList: React.FC<CountriesListProps> = ({ filteredCountries, dataFlags }) => {
    
    return (
        <>
          {filteredCountries?.map((country, index) => {
            // Filtrar el flag correspondiente al countryCode de la frontera
            const borderFlag = dataFlags?.data.find(flag => flag.iso2 === country.countryCode);
    
            return (
              <Link href={`/country_list/${country.countryCode}`} key={country.countryCode}>
                <List key={index}>
                  <ListItem>
                    <ListItemAvatar>
                      {/* Mostrar el flag correspondiente si lo encontramos */}
                      {borderFlag ? (
                          <Image src={borderFlag.flag} alt={`Flag of ${country.name}`} width={40} height={20} />
                      ) : (
                          <Image src={ImageNotFound} alt="No flag" width={40} height={20} />
                        
                      )}
                    </ListItemAvatar>
                    <ListItemText
                      primary={country.name}
                    />
                  </ListItem>
                </List>
              </Link>
            );
          })}
        </>
      );
  
}

export default CountriesList
