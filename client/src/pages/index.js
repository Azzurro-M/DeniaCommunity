import Head from "next/head";
import { CreateEvent } from "../components/createEvent";
import { EventList } from "../components/eventList";
// import Image from 'next/image'
// import { Inter } from '@next/font/google'
// import styles from '@/styles/Home.module.css'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Denia</title>
        <meta name="description" content="Community Board" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <EventList />
      <CreateEvent />
    </>
  );
}
