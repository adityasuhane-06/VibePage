import React from 'react'
import axios from 'axios';

// here create_new_state is a boolean to determine if we need to create a new state or not
// state is the current state (existing data object)
// data is the new data to be added to the array
// page is the current page number
// countRoute is the API route to get the count of total documents
// data_to_send is the data to be sent to the server for pagination
export const FilterPaginationData = async ({create_new_state = false, state, data, page, countRoute, data_to_send = {}}) => {
  let obj; 
  // structure of the object to be returned will be like this:
  // {
  //   result: [...data], // new data array
  //   page: 1, // reset page to 1 if creating new state
  //   totalDocs: response.data.totalDocs // total documents count from server
  // }
  
  // If state exists and has results, and we're not creating a new state (append mode)
  if (state !== null && state.result && state.result.length > 0 && !create_new_state) {
    obj = {
      ...state,
      result: [...state.result, ...data],
      page: page
    };
  } 
  
  else {
    // Create new state - fetch total docs count from server
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/api/${countRoute}`, {
        ...data_to_send,
        page
      });
      
      obj = {
        result: data,
        page: 1,
        totalDocs: response.data.totalDocs
      };
    } catch (error) {
      console.error("Error fetching total docs:", error);
      // Fallback object if API call fails
      obj = {
        result: data,
        page: 1,
        totalDocs: data.length || 0
      };
    }
  }
  
  return obj;
};

/*
This code defines an async function FilterPaginationData for handling paginated data in React.

- create_new_arr: Boolean flag to decide if a new array should be created.
- state: The current state (existing data array).
- data: New data to be added.
- page: Current page number.
- countRoute: API route for pagination.
- data_to_send: Data sent to the server for pagination.

The function checks if the state is not null, has items, and create_new_state is false.
    - If true, it merges the new data with the existing state and updates the page.
    - Otherwise, it fetches the total document count from the server and creates a new object with the new data, page set to 1, and totalDocs from the response.

Note: There is a typo: 'create_new_state' should be 'create_new_arr'.
Also, axios is used but not imported.
*/
