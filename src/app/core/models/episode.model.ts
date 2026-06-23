export interface Annotation {
  id: string;
  text: string;
  createdAt: Date;
}

export interface Episode {
  id: string;
  stackId: string;
  title: string;
  error: string;
  attempts: string;
  solution: string;
  reasoning: string;
  snippets?: string;
  tags?: string[];
  annotations?: Annotation[];
  reviewedAt?: Date;
  createdAt: Date;
}
