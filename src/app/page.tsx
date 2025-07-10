import { promises as fs } from "fs";

const getCreators = async () => {
  const data = await fs.readFile("./src/app/creators.json", "utf-8");
  return JSON.parse(data);
};

export default async function Home() {
  const creators = await getCreators();
  const creatorList = Object.values(creators);

  return (
    <main className="container text-center">
      <div className="row">
        <div className="main-col col d-flex flex-column justify-content-center">
          <div id="header">
            <h1>Welcome to OnchainFans</h1>
            <p>Access Exclusive Content from Your Favorite Creators</p>
          </div>
        </div>
        <div>
          {creatorList.length > 0 && (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Address</th>
                  <th>Name</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                {creatorList.map((creator: any) => (
                  <tr key={creator.address}>
                    <td>{creator.address}</td>
                    <td>{creator.name}</td>
                    <td>
                      <a href={`/creators/${creator.address}`}>Link</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}