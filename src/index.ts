import "./style.scss";
import { Album } from "./album";

export interface Image {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const fetchAlbum = (id: number): Promise<Image[]> => {
  return fetch(
    `https://jsonplaceholder.typicode.com/albums/${id}/photos`,
  ).then((response) => response.json());
};

new Album(".album", fetchAlbum);
