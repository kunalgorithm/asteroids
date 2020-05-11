import { withApollo } from "../apollo/client";
import Salon from "../components/Salon";

import React, { useState, useEffect } from "react";

import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Join, { JOIN_MUTATION } from "../components/Join";
import { useRouter } from "next/router";

const Page = ({ id }) => {
  const { loading, error, data } = useSubscription(
    gql`
      subscription salon($id: uuid!) {
        salon_by_pk(id: $id) {
          id
          title
          players {
            id
            name
            x_position
            y_position
            rotation
            # updatedAt
          }
        }
      }
    `,
    { variables: { id } }
  );
  const [join] = useMutation(JOIN_MUTATION);

  const [player_id, setPlayerId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const obj = JSON.parse(localStorage.getItem("salon"));
      if (obj && obj.salon_id === router.query.salon)
        setPlayerId(parseInt(obj.player_id));
    }
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!data || !data.salon_by_pk)
    return (
      <div>
        <h3>This salon has expired or does not exist 🤔</h3>
      </div>
    );
  return !player_id ? (
    <div>
      <Join setPlayerId={setPlayerId} salon={data.salon_by_pk} />
    </div>
  ) : (
    <Salon data={data} player_id={player_id} setPlayerId={setPlayerId} />
  );
};

Page.getInitialProps = (ctx) => {
  return { id: ctx.query ? ctx.query.salon : undefined };
};
export default withApollo(Page);
