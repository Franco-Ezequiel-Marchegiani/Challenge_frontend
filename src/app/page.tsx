import { Button, FormControl, FormLabel } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Routes</FormLabel>
            <Link className="w-full" href='/'><Button variant="contained" className="mb-4 w-full">Home</Button></Link>
            <Link className="w-full" href='/country_list'><Button variant="contained" className="mb-4 w-full">Country List</Button></Link>


        </FormControl>
      </main>
      
    </div>
  );
}
