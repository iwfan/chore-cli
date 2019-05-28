export default async function (options: ChoreOptions) {
  const { features } = options;
  const isSupportTS = features.includes('typescript');

  const javascriptCode =
    `export default function sum(a, b) {
      return a + b;
    }`;

  const typescriptCode =
    `export default function sum(a: number, b: number) {
      return a + b;
    }`;

  const testCode =
    `import sum from '../src/index';
    
    test('sum should return 2 when given 1 1', () => {
      expect(sum(1, 1)).toBe(2);
    })
    `;

  const boilerplateCode = {
    src: {
      [`index.${isSupportTS ? 'ts' : 'js'}`]: isSupportTS ? typescriptCode : javascriptCode,
    },
    test: {
      [`index.spec.${isSupportTS ? 'ts' : 'js'}`]: testCode
    }
  };

  Object.assign<FileContent, FileContent>(options.files, boilerplateCode);
}
