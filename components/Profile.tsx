import React from "react";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { useRouter } from "next/router";

const Profile = () => {
  const player_id =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("salon"))
      : null;
  const router = useRouter();
  const { loading, error, data, client } = useQuery(
    gql`
      query player_by_pk($id: Int!, $salonId: uuid!) {
        player_by_pk(id: $id) {
          id
          name
        }

        player(
          where: { salon_id: { _eq: $salonId } }
          order_by: { createdAt: desc }
        ) {
          id
          name
          createdAt
        }
      }
    `,
    {
      variables: { id: player_id.player_id, salonId: router.query.salon },
      pollInterval: 2000,
    }
  );
  // if (loading) return <div>Loading...</div>;

  if (!data || !data.player_by_pk) return null;
  return (
    <div style={{ textAlign: "center", marginLeft: "50px" }}>
      <span>Joined as</span>

      <h1>{data.player_by_pk.name}</h1>

      <hr style={{ marginBottom: "20px" }} />
      <h2>Players</h2>
      {/* TODO: order by createdAt with date */}
      {data.player &&
        data.player
          // .filter((p) => p.id !== parseInt(player_id))
          .map((player) => <div key={player.id}>{player.name}</div>)}
    </div>
  );
};

export default Profile;
