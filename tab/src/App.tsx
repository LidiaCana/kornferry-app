import React, { useEffect, useState } from "react";

import { loginRequest, graphqlConfig } from "./authConfig";
import { ProfileData } from "./components/ProfileData";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
  MsalProvider,
} from "@azure/msal-react";
// import "./App.css";
import { Spinner } from "@fluentui/react-components";
import Layout from "./components/common/layout";
import { PublicClientApplication } from "@azure/msal-browser";
import { Button } from "@fluentui/react-components";
import Banner from "./components/common/banner/banner";
import Dashboard1 from "./views/dashboard/dashboard1";
import { GraphQLResponse } from "./type/graph";
import Dashboard2 from "./views/dashboard/dashboard2";

/**
 * Renders information about the signed-in user or a button to retrieve data about the user
 */

interface AppProps {
  instance: PublicClientApplication;
}
const username = "avier.cruzaguilar@ionrva.onmicrosoft.com";
const ProfileContent = () => {
  const { instance, accounts } = useMsal();
  const [graphqlData, setGraphqlData] = useState<GraphQLResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  function RequestGraphQL() {
    // Silently acquires an access token which is then attached to a request for GraphQL data
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
      .then((response) => {
        callGraphQL(response.accessToken).then((result) => {
          setGraphqlData(result);
          setIsLoading(false);
        });
      });
  }

  async function callGraphQL(accessToken: string): Promise<GraphQLResponse> {
    setIsLoading(true);
    const query = `  query {
     green_tripdata_2017s {
        items {
           trip_type
           total_amount
           payment_type
           tip_amount
           tolls_amount
           VendorID
           
        }
     } 
   } `;
    const response = await fetch(graphqlConfig.graphqlEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        query: query,
      }),
    });
    const result: GraphQLResponse = await response.json();
    return result;
  }
  useEffect(() => {
    console.log(accounts[0].username);
    if (accounts.length > 0) {
      // RequestGraphQL();
    }
  }, [accounts]);

  return (
    <>
      {accounts[0].username === username ? (
        <Dashboard2 items={[]} />
      ) : (
        <Dashboard1 items={[]} />
      )}

      {/* <br />
      {isLoading && <Spinner label="Loading..." />}
      {graphqlData && !isLoading && (
        <Dashboard items={graphqlData.data.green_tripdata_2017s.items} />
      )} */}
    </>
  );
};

/**
 * If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
 */
const MainContent = () => {
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();

  const handleRedirect = () => {
    instance
      .loginRedirect({
        ...loginRequest,
        prompt: "create",
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <AuthenticatedTemplate>
        <ProfileContent />
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <Banner>
          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: "20%",
            }}
          >
            <Button
              style={{
                backgroundColor: "white",
                color: "#006550",
                fontSize: "1.5rem",
                padding: "10px 20px",
                marginRight: "20px",
              }}
              onClick={handleRedirect}
            >
              Sign in
            </Button>
            <a
              href="https://www.kornferry.com/"
              target="_blank"
              style={{
                border: "2px solid white",
                fontSize: "1.5rem",
                padding: "10px 20px",
                marginRight: "20px",
                color: "white",
                textDecoration: "none",
              }}
            >
              Go to the WebSite
            </a>
          </div>
        </Banner>
      </UnauthenticatedTemplate>
    </div>
  );
};

export default function App({ instance }: AppProps) {
  return (
    <MsalProvider instance={instance}>
      <Layout>
        <MainContent />
      </Layout>
    </MsalProvider>
  );
}
