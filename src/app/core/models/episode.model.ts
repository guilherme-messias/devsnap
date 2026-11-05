import { Stack } from './stack.model';

export interface Annotation {
  id: string;
  text: string;
  episodeId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Episode {
  id: string;
  title: string;
  stackId: string;
  stack: Stack;
  error: string;
  solution: string;
  annotations: Annotation[];
  createdAt: string;
  updatedAt: string;
}
