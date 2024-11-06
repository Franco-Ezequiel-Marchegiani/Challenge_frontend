import { PopulationData, PopulationTypes } from '@/types/population.types'
import { BarChart } from '@mui/x-charts'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';

type PopulationProps ={
  dataPopulation: PopulationTypes | null,
  nameCountry: string,
}
const Population: React.FC<PopulationProps> = ({ dataPopulation, nameCountry }) => {
    const [items, setItems] = useState<PopulationData[]>([]); 
    const [hasMore, setHasMore] = useState(true); 

    const filterData = () => {
      if (!dataPopulation?.data) return [];
      
      return dataPopulation?.data.filter(country => 
        country.city.toLowerCase().includes(nameCountry.toLowerCase()) || 
        country.country.toLowerCase().includes(nameCountry.toLowerCase())
      );
    };

    useEffect(() => {
      const filteredData = filterData();
      if (filteredData.length !== items.length) {
        setItems(filteredData.slice(0, 3));
      }
    }, [dataPopulation, nameCountry]);


    // Function to load more dat
    const loadMoreData = () => {
      const filteredData = filterData();
      const nextItems = filteredData.slice(items.length, items.length + 3); // Load 3 new Charts

      if (nextItems.length > 0) {
        setItems(prevItems => [...prevItems, ...nextItems]); // Add the new elements
      } else {
        setHasMore(false); // There are no more elements
      }
    };
    return (
        <>  
          <InfiniteScroll
            dataLength={items.length}
            next={loadMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<p>No more items</p>}
          >

            {items.map((country, index) => {
              //Extract the years and Population values
              const years = country.populationCounts.map(item => item.year);
              const populationValues = country.populationCounts.map(item => parseFloat(item.value));

              return (
                  <BarChart
                      key={index}
                      series={[
                          { data: populationValues,
                            label: country.city
                           },
                      ]}
                      height={290}
                      sx={{paddingLeft: '16px', pointerEvents: 'none',}}
                      xAxis={[
                          { data: years, scaleType: 'band' }, // Use the years for eje X
                      ]}
                      margin={{ top: 40, bottom: 40, left: 40, right: 10 }}
                  />
              );
            })}
            </InfiniteScroll>
        </>
      );
}
export default Population
