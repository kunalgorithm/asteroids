import React from "react";

import { useQuery, useSubscription } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { withApollo } from "../apollo/client";

export default () => {
  const { loading, error, data } = useSubscription(
    gql`
      subscription Salon {
        salon_by_pk(id: "cd346224-ea0b-4608-a836-9e5009c07dd1") {
          players {
            name
          }
          title
        }
      }
    `
  );
  if (loading) return <div>loading...</div>;
  if (error) return <div>Something went wrong...{JSON.stringify(error)}</div>;
  return (
    <div>
      <h2>Salon {data && data.salon && data.salon[0].title}</h2>
      <div>
        {data &&
          data.salon &&
          data.salon[0].players.map((player, i) => (
            <div key={i}>{player.name}</div>
          ))}
      </div>
    </div>
  );
};
