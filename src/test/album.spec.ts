import request from "./__mocks__/request";

const { Album } = require("../album");
jest.mock("../album");

describe("constructor", () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    Album.mockClear();
  });

  it("constructor should called once", (done) => {
    const album = new Album("body", request);
    done();
    expect(Album).toHaveBeenCalledTimes(1);
  });

  it("constructor should constructor render buttons", (done) => {
    const album = new Album("body", request);
    done();
    const mockRenderButton = Album.mock.instances[0].renderImagesContainer;
    expect(Album).toHaveBeenCalledTimes(1);
    expect(mockRenderButton).toHaveBeenCalledTimes(1);
  });

  it("constructor should constructor render buttons", (done) => {
    jest.spyOn(Album.prototype, "constructor");
    jest.spyOn(Album.prototype, "renderButtons");
    const album = new Album("body", request);
    done();
    expect(album.constructor).toHaveBeenCalledTimes(1);
    expect(album.renderButtons).toHaveBeenCalledTimes(1);
  });
});
