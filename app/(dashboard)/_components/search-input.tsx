"use client";

import qs from "query-string";
import { useDebounceValue, useDebounceCallback } from "usehooks-ts";
import { useRouter } from "next/navigation";
import { 
  ChangeEvent,
  useEffect,
  useState
 } from "react"
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export const SearchInput = () => {
  const router = useRouter()
  const [ value, setValue ] = useState("");
  const [ debouncedValue ] = useDebounceValue(value, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  useEffect(() => {
    const url = qs.stringifyUrl({
      url: "/",
      query: {
        search: debouncedValue,
      },
    }, { skipEmptyString: true, skipNull:true })

    router.push(url)
  }, [debouncedValue, router])

  return (
    <div className="w-full relative">
      <SearchIcon className="absolute top-1/2 left-3 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input 
        className="w-full max-w-[516px] pl-9"
        placeholder="Search Boards"
        onChange={handleChange}
        value={value}
      />
    </div>
  )
}