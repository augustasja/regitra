const DELAY = 1000; // 1 second

export function mockGet<T>(
  data: T,
  fail: boolean,
  signal?: AbortSignal,
): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      if (fail) {
        reject(new Error("API fail simuliacija"));
      } else {
        resolve(data);
      }
    }, DELAY);

    signal?.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });
}

export function mockGetById<T extends { id: number }>(
  data: T[],
  id: number,
  fail: boolean,
  signal?: AbortSignal,
): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      console.log("Pirmas API call, poto 1min cahce tam pačiam id");

      const item = data.find((x) => x.id === id);

      if (!item || fail) {
        reject(
          new Error(
            `API fail simuliacija: Jeigu matomas modal, tai jis rodomas is cache`,
          ),
        );
      } else {
        resolve(item);
      }
    }, DELAY);

    signal?.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });
}

export function mockDelete<T extends { id: number }>(
  data: T[],
  id: number,
  fail: boolean,
): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const itemIndex = data.findIndex((x) => x.id === id);

      if (itemIndex === -1 || fail) {
        reject(new Error(`API fail simuliacija`));
      } else {
        resolve(data[itemIndex]);
      }
    }, DELAY);
  });
}
