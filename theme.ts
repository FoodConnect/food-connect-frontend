import { MantineColorsTuple, createTheme } from '@mantine/core';

const chartreuse: MantineColorsTuple = [
  '#f8fde4',
  '#f0f8d2',
  '#e1f1a9',
  '#d1e97a',
  '#c3e254',
  '#bade3b',
  '#b5dc2c',
  '#9fc31d',
  '#8cad14',
  '#779600',
];

const shrek: MantineColorsTuple = [
  '#f1fde6',
  '#e4f7d6',
  '#caecad',
  '#aee282',
  '#97d95d',
  '#88d345',
  '#7fd038',
  '#6cb829',
  '#5ea321',
  '#4e8d14',
];

const sage: MantineColorsTuple = [
  '#ecfcea',
  '#ddf4d8',
  '#bce6b3',
  '#98d98b',
  '#7acd69',
  '#66c652',
  '#5bc246',
  '#4bab37',
  '#3f972e',
  '#318323',
];

const green: MantineColorsTuple = [
  '#e6fcf0',
  '#d8f2e2',
  '#b6e4c6',
  '#90d3a7',
  '#6fc58e',
  '#5abd7d',
  '#4eb974',
  '#3da262',
  '#339155',
  '#227e47',
];

const emerald: MantineColorsTuple = [
  '#e6fcf7',
  '#d9f2ec',
  '#b7e1d6',
  '#92d1c0',
  '#73c3ac',
  '#5fbaa0',
  '#52b69a',
  '#40a086',
  '#348f76',
  '#1f7c65',
];

const teal: MantineColorsTuple = [
  '#e6fdfd',
  '#d7f4f5',
  '#b3e5e7',
  '#8cd7da',
  '#6ccace',
  '#57c2c6',
  '#48bfc4',
  '#37a8ac',
  '#26969a',
  '#008287',
];

const sky: MantineColorsTuple = [
  '#e7faff',
  '#d5f1fa',
  '#abe1f2',
  '#7ed1eb',
  '#5bc3e4',
  '#47bae1',
  '#39b6e0',
  '#29a1c7',
  '#178fb3',
  '#007c9e',
];

const blue: MantineColorsTuple = [
  '#edf8fc',
  '#dcedf4',
  '#b4d8ea',
  '#89c4e1',
  '#69b3da',
  '#55a8d5',
  '#4aa4d4',
  '#3c8fbc',
  '#2f7ea8',
  '#186e95',
];

const navy: MantineColorsTuple = [
  '#eef6fc',
  '#dde9f2',
  '#b5d1e6',
  '#8bb8dc',
  '#69a3d2',
  '#5596cd',
  '#488fcc',
  '#3a7bb5',
  '#306fa2',
  '#1e5f90',
];

export const theme = createTheme({
  colors: {
    chartreuse,
    shrek,
    sage,
    green,
    emerald,
    teal,
    sky,
    blue,
    navy,
  },
});
