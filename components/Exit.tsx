import { withApollo } from "../apollo/client";
import { useApolloClient } from "@apollo/react-hooks";
import Router from "next/router";

export default withApollo(() => {
  const client = useApolloClient();
  return (
    <a
      onClick={() => {
        localStorage.removeItem("salon");

        client.resetStore().then(() => {
          Router.push(("/" + Router.query.salon) as string);
        });
      }}
    >
      Exit
    </a>
  );
});
