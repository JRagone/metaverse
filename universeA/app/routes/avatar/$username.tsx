import base64Img from 'base64-img';
import { json } from "@remix-run/node";
import type { LoaderFunction } from '@remix-run/node';

export const loader: LoaderFunction = async ({ params }) => {
  const { username } = params;
  const avatarJpgPath = `/app/public/users/${username}/avatar.png`;
  const avatarData = base64Img.base64Sync(avatarJpgPath);
  return json(avatarData);
}
