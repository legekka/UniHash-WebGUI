import { RigSnapshot } from './rig-snapshot';

export interface Rig {
  id: number;
  rigId: string;
  name: string;
  snapshots: RigSnapshot[];
}

export interface RigWithLatestSnapshot extends Rig {
  latestSnapshot?: RigSnapshot;
}

export function CreateRigWithLatestSnapshot(rig: Rig): RigWithLatestSnapshot {
  const latestSnapshot = rig.snapshots.length > 0
    ? rig.snapshots[rig.snapshots.length - 1]
    : null ;
  return {...rig, latestSnapshot};
}
