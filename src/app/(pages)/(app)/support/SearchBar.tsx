import { Input } from "@/components/ui/input";
import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <form className="mx-auto my-20 w-[90%] md:w-[70%]">
      <div className="relative text-gray focus-within:text-gray">
        <span className="absolute inset-y-0 left-0 flex items-center pl-4">
          <button
            type="submit"
            className="focus:shadow-outline p-1 focus:outline-none"
          ></button>
          <FaSearch size={30} className="text-white" />
        </span>
        <Input
          type="search"
          name="q"
          className="w-full rounded-xl border bg-gray py-5 pl-16 text-lg text-black focus:bg-white focus:text-black focus:outline-none"
          placeholder="Search For Answers..."
        />
      </div>
    </form>
  );
};

export default SearchBar;
