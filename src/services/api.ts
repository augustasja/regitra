const DELAY = 1000; // 1 second

export function mockGet<T>(data: T, fail: boolean): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fail) {
        reject(new Error("Forced error"));
      } else {
        resolve(data);
      }
    }, DELAY);
  });
}

export function mockGetById<T extends { id: number }>(
  data: T[],
  id: number,
  fail: boolean,
): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const item = data.find((x) => x.id === id);

      if (!item || fail) {
        reject(new Error(`Item with id ${id} not found`));
      } else {
        resolve(item);
      }
    }, DELAY);
  });
}

export function mockDelete<T extends { id: number }>(
  data: T[],
  id: number,
  fail: boolean,
): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const itemIndex = data.findIndex((x) => x.id === id);

      if (itemIndex === -1 || fail) {
        reject(new Error(`Item with id ${id} not found`));
      } else {
        data.splice(itemIndex, 1);
        resolve();
      }
    }, DELAY);
  });
}
