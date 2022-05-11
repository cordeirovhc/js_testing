const sinon = require("sinon");
const assert = require("assert");
const Service = require("./service");

const API_BASE_URL = "https://swapi.dev/api/";

const mocks = {
  tatooine: require("./mocks/planets-1.json"),
  alderaan: require("./mocks/planets-2.json"),
};

(async () => {
  /* const svc = new Service();
  const url = API_BASE_URL + "planets/1";
  const response = await svc.makeRequest(url);
  console.log(JSON.stringify(response)); */

  const svc = new Service();
  const stub = sinon.stub(svc, svc.makeRequest.name);

  const url_1 = API_BASE_URL + "planets/1";
  const url_2 = API_BASE_URL + "planets/2";

  stub.withArgs(url_1).resolves(mocks.tatooine);
  stub.withArgs(url_2).resolves(mocks.alderaan);

  {
    // const response = await svc.makeRequest(url_1); // o resultado vem do mock e não da api
    // console.log(response);

    const expected = {
      name: "Tatooine",
      surfaceWater: "1",
      appearedIn: 5,
    };

    const results = await svc.getPlanets(url_1);
    assert.deepStrictEqual(results, expected);
    console.log(`${url_1} OK`);
  }
  {
    const expected = {
      name: "Alderaan",
      surfaceWater: "40",
      appearedIn: 2,
    };

    const results = await svc.getPlanets(url_2);
    assert.deepStrictEqual(JSON.stringify(results), JSON.stringify(expected));
    console.log(`${url_2} OK`);
  }
})();
