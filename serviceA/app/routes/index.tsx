import { useState, useEffect } from 'react';

export default function Index() {
  const username = 'john';
  const [avatarImg, setAvatarImg] = useState(<p>Loading avatar...</p>);

  function capitalizeFirstLetter(string: String) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function handleMessage(e: MessageEvent<any>) {
    if (e.data && e.data.message && e.data.message === 'gotItem') {
      const itemData = e.data.item;
      // base64Img.imgSync(itemData, join('/app', 'public', 'user'), 'avatar');
      setAvatarImg(<img src={itemData} alt="User avatar" style={{ width: "10rem" }} />);
      console.log("Got response!");
    }
  }

  useEffect(() => {
    window.postMessage({ message: 'getItem', item: 'avatar', targetType: 'jpg', username });
    window.addEventListener('message', handleMessage)

    return function cleanup () {
      window.removeEventListener('message', handleMessage, false);
    }
  }, []);
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome, {capitalizeFirstLetter(username)}!</h1>
      {avatarImg}
    </div>
  );
}
