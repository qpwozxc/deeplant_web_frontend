import React, { useEffect, useState } from "react";
import axios from "axios";

export default function useGetDetail(id) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`http://3.38.52.82/meat/get?id=${id}`).then((res) => setData(res.data));
  }, [id]);

  return data; // 넘겨줄 요소들을 return한다
}