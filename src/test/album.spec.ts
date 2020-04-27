import request from "./__mocks__/request";

const { Album } = require("../album");

const abs = (a: number): number => {
  return a ** 3;
};

test("dsfdsf", done => {

  const album = new  Album('body',request);
  done()
  expect(abs(2)).toBe(8);
});
