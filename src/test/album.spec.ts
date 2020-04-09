const expect = require("chai").expect;
import * as sinon from "sinon";
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
import { Album } from "../album";

describe("Album", () => {
  require("jsdom-global")();
  const album = new Album("body");

  it("should save in localstorage", () => {
    const { localStorage, sessionStorage } = (new JSDOM(``, { url: "https://example.com" })).window;
    const albumData: string =
      "albumId: 1, id:1, title:'test', url:'test', thumbnaiUrl: test";

    // тест не проходит, т.к. localStorage is not definde
    localStorage.setItem("albumData", albumData);
    const dataFromLocalStorage = album.getDataInLocalStorage();
    expect(albumData).to.equal(dataFromLocalStorage);
  });
});
