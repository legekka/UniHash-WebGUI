import { MiningAlgorithm } from "./mining-algorithm.enum";

export interface RigSnapshot {
  id: number;
  timestamp: Date;
  currentUnpaidAmount: number;
  totalUnpaidAmount: number;
  currentUnpaidAmountPercent?: number;
  totalUnpaidAmountPercent?: number;
  algorithm?: MiningAlgorithm;
  speed?: number;
  displaySuffix?: string;
  temperature?: number;
  powerUsage?: number;
  revolutionsPerMinute?: number;
  revolutionsPerMinutePercentage?: number;
  profitability?: number;
  minerStatus?: RigStatus;
  statusTime?: Date;
}

export enum RigStatus {
  BENCHMARKING = 'BENCHMARKING',
  MINING = 'MINING',
  STOPPED = 'STOPPED',
  OFFLINE = 'OFFLINE',
  ERROR = 'ERROR',
  PENDING = 'PENDING',
  DISABLED = 'DISABLED',
  TRANSFERRED = 'TRANSFERRED',
  UNKNOWN = 'UNKNOWN'
}
