import "./SearchResultsList.css";
import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ results,setResults }) => {
  console.log(results)
  return (
    <div className="results-list absolute w-[600px] pl-5">
      <div className="flex justify-between px-5">
        <h1 className="hover:cursor-pointer">Search history</h1>
        <h1 className="hover:cursor-pointer text-orange-400">Clear</h1>
      </div>
      {results?.map((result, id) => {
        return <SearchResult result={result} key={id} setResults={setResults}/>;
      })}
    </div>
  );
};
