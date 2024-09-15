import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import { hideLoadingModal, showLoadingModal } from '../../helper/modal.helper';
import axiosClient from '../../helper/axiosHelper';

const SearchResult = () => {
    const [searchParams] = useSearchParams();
    const result = searchParams.get('result');
    console.log(result)
    useEffect(() => {
        const fetchData = async () => {
          showLoadingModal();
          try {
            const res = await axiosClient.get(
              `http://localhost:8090/address/getAllAddress`
            );
            console.log(res);
    
            hideLoadingModal();
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, []);
  return (
    <div>SearchResult</div>
  )
}

export default SearchResult