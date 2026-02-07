/// <reference types="nativewind/types" />

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*.png' {
  const uri: string;
  export default { uri };
}

declare module '@react-navigation/drawer/lib/typescript/src/types' {
  export * from 'node_modules/@react-navigation/drawer/src/types';
}
