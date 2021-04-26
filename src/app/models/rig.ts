import { RigSnapshot } from './rig-snapshot';

export interface Rig {
  id: number;
  rigId: string;
  name: string;
  snapshots: RigSnapshot[];
}
