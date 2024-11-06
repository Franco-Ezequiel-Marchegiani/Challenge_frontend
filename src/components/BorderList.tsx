import { CountryInfo } from '@/types/country_info.types'
import { Flags } from '@/types/flags.types'
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
type BorderListProps ={
    infoCountry: CountryInfo | null,
    dataFlags: Flags | null
}
const BorderList: React.FC<BorderListProps> = ({ infoCountry, dataFlags }) => {
    
    return (
        <>
          {infoCountry?.borders?.map((country, index) => {
            // Filtrar el flag correspondiente al countryCode de la frontera
            const borderFlag = dataFlags?.data.find(flag => flag.iso2 === country.countryCode);
    
            return (
              <Link href={`/country_list/${country.countryCode}`} key={country.countryCode}>
                <List key={index}>
                  <ListItem>
                    <ListItemAvatar>
                      {/* Mostrar el flag correspondiente si lo encontramos */}
                      {borderFlag ? (
                          <Image src={borderFlag.flag} alt={`Flag of ${country.commonName}`} width={40} height={20} />
                      ) : (
                        <Avatar>
                          {/* Mostrar una imagen por defecto si no se encuentra el flag */}
                          <Image src="/default-flag.png" alt="No flag" width={40} height={20} />
                        </Avatar>
                      )}
                    </ListItemAvatar>
                    <ListItemText
                      primary={country.commonName}
                      secondary={country.region}
                    />
                  </ListItem>
                </List>
              </Link>
            );
          })}
        </>
      );
  
}

export default BorderList
