import express from "express";
import fetch from "node-fetch";
import { InteractiveBrowserCredential } from "@azure/identity";
import cors from "cors";

const app = express();
const port = 3000;

// Use CORS middleware to allow cross-origin requests
app.use(cors());
app.use(express.json()); // Allow JSON body parsing

const endpoint =
  "https://3d3ae5ab09b9489ab4eb7fb8674bcc65.z3d.graphql.fabric.microsoft.com/v1/workspaces/3d3ae5ab-09b9-489a-b4eb-7fb8674bcc65/graphqlapis/fbe764e6-6bb8-41a1-ac18-f90c7a58805f/graphql";

const query = (filterType, value) => `
  query {
    dimemployees(first: 10,filter:{${filterType}:{eq:"${value}"}}) { 
      items {
       FirstName
       LastName
       Title
       DepartmentName
      }   
    } 
  }
`;

// Function to acquire the token and fetch data
async function fetchData(filterType, value) {
  try {
    console.log("Fetching data with filter3:", filterType, value);
    let app = new InteractiveBrowserCredential({});
    let tokenPromise = app.getToken(
      "https://analysis.windows.net/powerbi/api/user_impersonation"
    );
    let accessToken = await tokenPromise;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken.token}`,
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ query: query(filterType, value) }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.log("Error fetching data:", error);
    throw error;
  }
}

// Define an endpoint to accept queries via URL
app.get("/fetch-data", async (req, res) => {
  try {
    const { filterType, value } = req.query;
    if (!filterType || !value) {
      return res.status(400).json({ error: "Missing filterType or value parameters" });
    }
    const data = await fetchData(filterType, value);
    res.json(data);
  } catch (error) {
    console.error("Error in /fetch-data route:", error);
    res.status(500).json({ error: "Failed to fetch data", details: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
