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
import Spinner from "react-bootstrap/Spinner";
import Layout from "./components/common/layout";
import { PublicClientApplication } from "@azure/msal-browser";
import { Button } from "@fluentui/react-components";
import Banner from "./components/common/banner/banner";

/**
 * Renders information about the signed-in user or a button to retrieve data about the user
 */
interface GraphQLResponse {
  data: {
    green_tripdata_2017s: {
      items: {
        trip_type: string;
        total_amount: string;
        payment_type: string;
        tip_amount: string;
        tolls_amount: string;
        VendorID: string;
      }[];
    };
  };
}
interface AppProps {
  instance: PublicClientApplication;
}
const ProfileContent = () => {
  const { instance, accounts } = useMsal();
  const [graphqlData, setGraphqlData] = useState<GraphQLResponse | null>(null);
  const [display, setDisplay] = useState(false);

  function RequestGraphQL() {
    // Silently acquires an access token which is then attached to a request for GraphQL data
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
      .then((response) => {
        callGraphQL(response.accessToken).then((result) =>
          setGraphqlData(result)
        );
      });
  }

  async function callGraphQL(accessToken: string): Promise<GraphQLResponse> {
    setDisplay(true);
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
    if (accounts.length > 0) {
      RequestGraphQL();
    }
  }, [accounts]);

  return (
    <>
      <br />
      {graphqlData && <ProfileData graphqlData={graphqlData} />}
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
