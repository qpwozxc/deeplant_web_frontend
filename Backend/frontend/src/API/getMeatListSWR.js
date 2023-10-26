import useSWR from "swr"
import axios from "axios"

const fetcher = url => fetch(url).then(r => r.json())

export const useMeatListFetch = (offset, count, startDate, endDate) => {
    const apiIP = '3.38.52.82';
    const { data, error } = useSWR(`http://${apiIP}/meat/get?offset=${offset}&count=${count}&start=${startDate}&end=${endDate}&createdAt=true`, fetcher);
    console.log('url',`http://${apiIP}/meat/get?offset=${offset}&count=${count}&start=${startDate}&end=${endDate}&createdAt=true` )
    console.log('data: ',data, );
    return {
      data,
      isLoading: !error && !data,
      error,
    };
  };