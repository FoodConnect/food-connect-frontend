import { MantineColorsTuple, createTheme } from '@mantine/core';

const myColor: MantineColorsTuple = [
  '#edfdf4',
  '#d9f9e7',
  '#adf3cb',
  '#80eeae',
  '#5de995',
  '#48e686',
  '#3de57d',
  '#31cb6b',
  '#26b45e',
  '#119c4e',
];

const myPalette: MantineColorsTuple = [
  '#d9ed92',
  '#b5e48c',
  '#99d98c',
  '#76c893',
  '#52b69a',
  '#34a0a4',
  '#168aad',
  '#1a759f',
  '#1e6091',
  '#184e77',
];

export const theme = createTheme({
  colors: {
    myColor,
    myPalette,
  },
});
