import { URL } from "../utils/config.js";
export async function getNews(URL) {
  //ES8 onwards(await and async)
  try {
    const response = await fetch(URL);
    const data = await response.json();
    console.log("Data is", data);
    return data;
  } catch (err) {
    throw err;
  }
}

/*
  *******************************************************************************

  //Make API call
  //fetch
  //Promise: It is for the data we will receive in future

  /*const promise = fetch(URL); //wrapper method of XMLHttpRequest(2000)
  console.log("Promise is", promise);

  promise
    .then(function (response) {
      //this is call back function
      // Response: Header+ Body(JSON)
      const pr = response.json(); //it converts json into object
      pr.then(function (data) {
        console.log("Data Received", data);
      }).catch(function (err) {
        console.log("Invalid JSON", err);
      });
    })
    .catch(function (err) {
      console.log("Error during fetching news", err);
    });8/
            // then will run when promise is fulfilled and catch will run when promise is rejected

  /* 
      PROMISE STAGES
      1. Pending Stage
      2. Fulfilled Stage
      3. Rejected Stage
  */
