type FetchMock = jest.Mock<Promise<Response>>;

declare global {
  var fetch: FetchMock;
  namespace NodeJS {
    interface Global {
      fetch: FetchMock;
    }
  }
}

export {}; 