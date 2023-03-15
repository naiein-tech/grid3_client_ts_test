import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';
import { GridClient, NetworkEnv } from "grid3_client";
import { MessageBusClient } from "ts-rmb-redis-client";

type TFProfile = {
    id: string;
    name: string;
    mnemonics: string;
    storeSecret: string;
    networkEnv: string;
    sshKey: string;
}

async function getGridClient(profile: TFProfile): Promise<GridClient> {
    const rmb = new MessageBusClient();

    const gridClient = new GridClient(
        NetworkEnv.main,
        profile.mnemonics,
        profile.storeSecret,
        rmb,
    );
    await gridClient.connect();
    return gridClient;
}

function App() {
  
  let test_profile: TFProfile = {
        id: "8623",
        name: "main_test",
        mnemonics: "fog hungry organ father ice dynamic camp resist goat faith maximum hire",
        storeSecret: "test",
        networkEnv: "main",
        sshKey: "test",
  }

  async function getBalance() {
      let client = await getGridClient(test_profile);
      console.log("Getting balance");
      client.balance.getMyBalance().then((balance) => { console.log(balance) });
  }

  useEffect (() => {
      getBalance();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
