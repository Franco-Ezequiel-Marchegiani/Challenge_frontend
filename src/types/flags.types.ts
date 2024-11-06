export interface Flags {
    error: boolean;
    msg:   string;
    data:  FlagsData[];
}

export interface FlagsData {
    name: string;
    flag: string;
    iso2: string;
    iso3: string;
}
