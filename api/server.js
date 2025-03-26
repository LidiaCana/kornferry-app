import express from "express"; // Use import instead of require
import fetch from "node-fetch"; // Use import for node-fetch
import { InteractiveBrowserCredential } from "@azure/identity"; // Import the Azure SDK
import cors from "cors"; // Import cors

const app = express();
const port = 3000; // Choose your desired port

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// Define your GraphQL endpoint and query
const endpoint =
  "https://3d3ae5ab09b9489ab4eb7fb8674bcc65.z3d.graphql.fabric.microsoft.com/v1/workspaces/3d3ae5ab-09b9-489a-b4eb-7fb8674bcc65/graphqlapis/fbe764e6-6bb8-41a1-ac18-f90c7a58805f/graphql";
const query = `
  query {
    dimemployees(first: 5) { 
      items {
       FirstName
       LastName
       Title
       DepartmentName
      }   
    } 
  }
`;
const variables = {};

// Function to acquire the token and fetch data
async function fetchData() {
  try {
    // Acquire token using InteractiveBrowserCredential
    let app = new InteractiveBrowserCredential({});
    let tokenPromise = app.getToken(
      "https://analysis.windows.net/powerbi/api/user_impersonation"
    );
    let accessToken = await tokenPromise;

    // Set up headers with the access token
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken.token}`,
    };

    // Make the request to the GraphQL endpoint
    const response = await fetch(endpoint, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ query, variables }),
    });

    // Parse and return the response data
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("Error fetching data:", error);
    throw error;
  }
}

// Define an endpoint in the Express server to fetch data
app.get("/fetch-data", async (req, res) => {
  try {
    const data = await fetchData();

    res.json(data); // Send data back as JSON response
  } catch (error) {
    console.error("Error in /fetch-data route:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch data", details: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
