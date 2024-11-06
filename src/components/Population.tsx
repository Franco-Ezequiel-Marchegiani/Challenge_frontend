import { PopulationData, PopulationTypes } from '@/types/population.types'
import { BarChart } from '@mui/x-charts'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';

type PopulationProps ={
  dataPopulation: PopulationTypes | null,
}
const Population: React.FC<PopulationProps> = ({ dataPopulation }) => {
    const [items, setItems] = useState<PopulationData[]>([]); 
    const [hasMore, setHasMore] = useState(true); 
    useEffect(() => {
      if (dataPopulation?.data) {
        setItems(dataPopulation?.data.slice(0, 3)); 
      }
      }, [dataPopulation]);

    // Función para cargar más elementos
    const loadMoreData = () => {
      const nextItems = dataPopulation?.data.slice(items.length, items.length + 3); // Obtén 10 elementos más
      if (nextItems && nextItems.length > 0) {
        setItems(prevItems => [...prevItems, ...nextItems]); // Agrega los nuevos elementos
      } else {
        setHasMore(false); // No hay más elementos por cargar
      }
    };

    console.log("LARGO ACTUAL: ", items.length);
    
    return (
        <>  
          <InfiniteScroll
            dataLength={items.length} // Número de elementos actuales
            next={loadMoreData}       // Función que se ejecuta para cargar más elementos
            hasMore={hasMore}         // Si hay más elementos
            loader={<h4>Loading...</h4>} // Lo que se muestra mientras cargan más elementos
            endMessage={<p>No more items</p>} // Mensaje cuando no hay más datos
          >

            {items.map((country, index) => {
              // Extraemos los años para el xAxis
              const years = country.populationCounts.map(item => item.year);

              // Extraemos los valores para las series
              const populationValues = country.populationCounts.map(item => parseFloat(item.value)); // Convertimos a número para trabajar con valores numéricos

              return (
                  <BarChart
                      key={index}
                      series={[
                          { data: populationValues }, // Usamos los valores de población
                      ]}
                      height={290}
                      xAxis={[
                          { data: years, scaleType: 'band' }, // Usamos los años para el eje X
                      ]}
                      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                  />
              );
            })}
            </InfiniteScroll>
        </>
      );
  
}

export default Population
