export class Exercise {
  name: string;
  id: string;
  duration: number;
  calories: number;
  state?: 'completed' | 'canceled' | null;
  date?: Date;
}
