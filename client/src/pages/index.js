import Head from "next/head";
import { CreateEvent } from "../components/CreateEvent";
import { EventList } from "../components/EventList";
import { Title } from "../components/Title";
import { useRouter } from "next/router";
import React from "react";

export default function Home() {
  const router = useRouter();

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
