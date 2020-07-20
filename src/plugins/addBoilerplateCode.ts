import prettier from 'prettier';
export default async function(options: ChoreOptions) {
  const typescriptCode = `
    export default function sum(a: number, b: number) {
      return a + b;
    }
  `;

  const testCode = `
    import sum from '../src/index';
    
    test('sum should return 2 when given 1 1', () => {
      expect(sum(1, 1)).toBe(2);
    })
  `;

  const boilerplateCode = {
    src: {
      'index.ts': prettier.format(typescriptCode, { parser: 'babel' }),
    },
    test: {
      'index.spec.ts': prettier.format(testCode, { parser: 'babel' }),
    },
  };

  Object.assign<FileContent, FileContent>(options.files, boilerplateCode);
}
