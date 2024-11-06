import { CountryInfo } from '@/types/country_info.types'
import { Flags } from '@/types/flags.types'
import { List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ImageNotFound from '../../public/notFound.png'

type BorderListProps ={
    infoCountry: CountryInfo | null,
    dataFlags: Flags | null
}
const BorderList: React.FC<BorderListProps> = ({ infoCountry, dataFlags }) => {
    
    return (
        <>
          {infoCountry?.borders?.map((country, index) => {
            // Filter the flag by the countryCode
            const borderFlag = dataFlags?.data.find(flag => flag.iso2 === country.countryCode);
    
            return (
              <Link href={`/country_list/${country.countryCode}`} key={country.countryCode}>
                <List key={index}>
                  <ListItem>
                    <ListItemAvatar>
                      {borderFlag ? (
                          <Image src={borderFlag.flag} alt={`Flag of ${country.commonName}`} width={40} height={20} />
                      ) : (
                        <Image src={ImageNotFound} alt="No flag" width={40} height={20} />
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
