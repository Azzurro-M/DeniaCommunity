import Head from "next/head";
import { CreateEvent } from "../components/CreateEvent";
import { EventList } from "../components/EventList";
import { Title } from "../components/Title";
import { useRouter } from "next/router";
import React from "react";
import {
  AuthContext,
  AuthProvider,
  isUserAuthenticated,
} from "../context/auth-context";

export default function Home() {
  const router = useRouter();
  const authContext = React.useContext(AuthContext);
  React.useEffect(() => {
    // checks if the user is authenticated
    authContext.isUserAuthenticated()
      ? router.push("/")
      : router.push("/login");
  }, []);

  return (
    <>
      <Head>
        <title>Denia</title>
        <meta name="description" content="Community Board" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Title />
      <EventList />
      <CreateEvent />
    </>
  );
}
