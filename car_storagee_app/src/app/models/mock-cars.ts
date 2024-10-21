import { v4 as uuidv4 } from 'uuid';
import { Car } from './car';

export const CARS: Car[] = [
  {
    id: uuidv4(),
    mark: 'volkswagen',
    model: 'jetta',
    year: 2011,
    parts: ['kolo', 'skrzynia', 'rozrzad'],
  },
  {
    id: uuidv4(),
    mark: 'volkswagen',
    model: 'golf',
    year: 2019,
    parts: ['kolo'],
  },
  {
    id: uuidv4(),
    mark: 'mercedes',
    model: 'A200',
    year: 2015,
    parts: ['skrzynia', 'rozrzad'],
  },
  {
    id: uuidv4(),
    mark: 'BMW',
    model: 'E90',
    year: 2004,
    parts: ['lampy', 'rozrzad'],
  },
];
