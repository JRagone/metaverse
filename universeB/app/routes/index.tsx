import { json } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";

// export async function loader() {
//   // const avatarUrl = await getAvatar();
//   const avatarUrl = await fetch('/app/routes/avatar/john');
//   const data = {
//     avatarUrl
//   }
//   return json(data);
// }

// async function getAvatar() {
//   return 'users/john/avatar.png';
// }

export default function Index() {
  const username = 'john';
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.type === "init") {
      fetcher.load(`/avatar/${username}`);
    }
  }, [fetcher]);

  const avatarUrl = fetcher.data;

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>What's up, John</h1>
      { fetcher.type === "done" ?
        <img src={avatarUrl} alt="User avatar"/>
        :
        <p>Loading avatar...</p>
      }
    </div>
  );
}
