import {Image} from "../../index";

const images: Image[] = [
  {
    albumId: 1,
    id: 701,
    thumbnailUrl: "https://via.placeholder.com/150/7f8528",
    title: "incidunt mollitia ullam et magni",
    url: "https://via.placeholder.com/600/7f8528",
  },
  {
    albumId: 1,
    id: 701,
    thumbnailUrl: "https://via.placeholder.com/150/7f8528",
    title: "incidunt mollitia ullam et magni",
    url: "https://via.placeholder.com/600/7f8528",
  },
  {
    albumId: 1,
    id: 701,
    thumbnailUrl: "https://via.placeholder.com/150/7f8528",
    title: "incidunt mollitia ullam et magni",
    url: "https://via.placeholder.com/600/7f8528",
  },
  {
    albumId: 1,
    id: 701,
    thumbnailUrl: "https://via.placeholder.com/150/7f8528",
    title: "incidunt mollitia ullam et magni",
    url: "https://via.placeholder.com/600/7f8528",
  },
  {
    albumId: 1,
    id: 701,
    thumbnailUrl: "https://via.placeholder.com/150/7f8528",
    title: "incidunt mollitia ullam et magni",
    url: "https://via.placeholder.com/600/7f8528",
  },
];

export default function request(id: number): Promise<Image[]> {
  return new Promise((resolve, reject) => {
    resolve(images);
  });
}
