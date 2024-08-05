import React from "react";
import terms from "@/app/_data/terms.json";

const page = () => {
  return (
    <section className="mx-auto my-40 w-[80%]">
      <h1 className="mb-16 text-6xl">Terms & Conditions</h1>
      <ul className="list-decimal">
        {terms.map((term, index) => (
          <li key={index} className="my-5 text-lg tracking-wider">
            <p>{term}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default page;
