export interface IRoom {
  roomId: string;
  title: string;
  description: string;
  createdBy: string;
  members: [string];
  max_members: number;
  location: string;
  is_active: boolean;
}
