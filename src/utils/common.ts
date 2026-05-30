export const combinePaths = (...paths: string[]): string => {
  return (
    '/' +
    paths
      .map((path) => path.replace(/^\/+|\/+$/g, ''))
      .filter((path) => path !== '')
      .join('/')
  );
};

console.log(combinePaths('/users/', '/'));
