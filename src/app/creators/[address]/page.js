"use client";
import { useState, useEffect, use } from "react";

const message = "OnchainFans";

const getCreator = async (address) => {
  const res = await fetch(`/api/creators/${address}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data.creator;
};

export default function Creator({ params }) {
  const { address } = use(params); // unwrap async params
  const [creator, setCreator] = useState(undefined);
  const [signature, setSignature] = useState(undefined);
  const [signer, setSigner] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      const creator = await getCreator(address);
      setCreator(creator);
    };
    init();
  }, [address]);


  return (
    <main className="container text-center">
      <div className="row">
        <div className="main-col col d-flex flex-column justify-content-center">
          <div id="header">
            <h1>Welcome to OnchainFans</h1>
            <p>Access Exclusive Content from Your Favorite Creators</p>
          </div>
        </div>

        {creator ? (
          <ul>
            <li className="list-group-item">Address: {creator.address}</li>
            <li className="list-group-item">Name: {creator.name}</li>
            <li className="list-group-item">Description: {creator.description}</li>
          </ul>
        ) : null}

        {!signature && (
          <button type="button" className="btn btn-primary mt-4" onClick={connectWallet}>
            Connect
          </button>
        )}
      </div>
    </main>
  );
}
