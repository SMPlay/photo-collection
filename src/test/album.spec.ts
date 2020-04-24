const { Album } = require("../album");

const abs = (a: number): number => {
  return a ** 3;
};

test("dsfdsf", () => {

  const album = new  Album('body');
  expect(abs(2)).toBe(8);
});
