export default async function getMeatList (offset, count, startDate, endDate) {
    const apiIP = '3.38.52.82';

    const json = await (
      await fetch(
        `http://${apiIP}/meat/get?offset=${offset}&count=${count}&start=${startDate}&end=${endDate}&createdAt=true`
      )
    ).json();
   
    console.log("fetch done!", json);

    return json;
  };