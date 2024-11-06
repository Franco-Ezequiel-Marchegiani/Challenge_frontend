export interface PopulationTypes {
    error: boolean;
    msg:   string;
    data:  PopulationData[];
}

export interface PopulationData {
    city:             string;
    country:          string;
    populationCounts: PopulationCount[];
}

export interface PopulationCount {
    year:       string;
    value:      string;
    sex:        string;
    reliabilty: string;
}
