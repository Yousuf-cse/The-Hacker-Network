export interface IRoom {
  roomId: string;
  banner: string;
  title: string;
  description: string;
  createdBy: string;
  members: [string];
  max_members: number;
  location: string;
  is_active: boolean;
}
