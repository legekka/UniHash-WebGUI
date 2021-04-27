export enum MiningAlgorithm {
  SCRYPT = 'SCRYPT',
  SHA256 = 'SHA256',
  SCRYPTNF = 'SCRYPTNF',
  X11 = 'X11',
  X13 = 'X13',
  KECCAK = 'KECCAK',
  X15 = 'X15',
  NIST5 = 'NIST5',
  NEOSCRYPT = 'NEOSCRYPT',
  LYRA2RE = 'LYRA2RE',
  WHIRLPOOLX = 'WHIRLPOOLX',
  QUBIT = 'QUBIT',
  QUARK = 'QUARK',
  AXIOM = 'AXIOM',
  LYRA2REV2 = 'LYRA2REV2',
  SCRYPTJANENF16 = 'SCRYPTJANENF16',
  BLAKE256R8 = 'BLAKE256R8',
  BLAKE256R14 = 'BLAKE256R14',
  BLAKE256R8VNL = 'BLAKE256R8VNL',
  HODL = 'HODL',
  DAGGERHASHIMOTO = 'DAGGERHASHIMOTO',
  DECRED = 'DECRED',
  CRYPTONIGHT = 'CRYPTONIGHT',
  LBRY = 'LBRY',
  EQUIHASH = 'EQUIHASH',
  PASCAL = 'PASCAL',
  X11GOST = 'X11GOST',
  SIA = 'SIA',
  BLAKE2S = 'BLAKE2S',
  SKUNK = 'SKUNK',
  CRYPTONIGHTV7 = 'CRYPTONIGHTV7',
  CRYPTONIGHTHEAVY = 'CRYPTONIGHTHEAVY',
  LYRA2Z = 'LYRA2Z',
  X16R = 'X16R',
  CRYPTONIGHTV8 = 'CRYPTONIGHTV8',
  SHA256ASICBOOST = 'SHA256ASICBOOST',
  ZHASH = 'ZHASH',
  BEAM = 'BEAM',
  GRINCUCKAROO29 = 'GRINCUCKAROO29',
  GRINCUCKATOO31 = 'GRINCUCKATOO31',
  LYRA2REV3 = 'LYRA2REV3',
  CRYPTONIGHTR = 'CRYPTONIGHTR',
  CUCKOOCYCLE = 'CUCKOOCYCLE',
  GRINCUCKAROOD29 = 'GRINCUCKAROOD29',
  BEAMV2 = 'BEAMV2',
  X16RV2 = 'X16RV2',
  RANDOMXMONERO = 'RANDOMXMONERO',
  EAGLESONG = 'EAGLESONG',
  CUCKAROOM = 'CUCKAROOM',
  GRINCUCKATOO32 = 'GRINCUCKATOO32',
  HANDSHAKE = 'HANDSHAKE',
  KAWPOW = 'KAWPOW',
  CUCKAROO29BFC = 'CUCKAROO29BFC',
  BEAMV3 = 'BEAMV3',
  CUCKAROOZ29 = 'CUCKAROOZ29',
  OCTOPUS = 'OCTOPUS'
}

export const MiningAlgorithmDisplayNames: Map<MiningAlgorithm, String> = new Map();
MiningAlgorithmDisplayNames.set(MiningAlgorithm.SCRYPT, 'Scrypt');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.SHA256, 'SHA256');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.SCRYPTNF, 'ScryptNF');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.X11, 'X11');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.X13, 'X13');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.KECCAK, 'Keccak');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.X15, 'X15');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.NIST5, 'NIST5');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.NEOSCRYPT, 'NeoScrypt');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.LYRA2RE, 'Lyra2RE');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.WHIRLPOOLX, 'whirlpoolX');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.QUBIT, 'Qubit');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.QUARK, 'Quark');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.AXIOM, 'Axiom');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.LYRA2REV2, 'Lyra2Rev2');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.SCRYPTJANENF16, 'ScryptJaneNF16');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.BLAKE256R8, 'Blake256R8');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.BLAKE256R14, 'Blake256R14');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.BLAKE256R8VNL, 'Blake256R8VNL');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.HODL, 'HODL');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.DAGGERHASHIMOTO, 'Dagger-Hashimoto');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.DECRED, 'Decred');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.CRYPTONIGHT, 'CryptoNight');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.LBRY, 'LBRY');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.EQUIHASH, 'Equihash');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.PASCAL, 'Pascal');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.X11GOST, 'X11GOST');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.SIA, 'SIA');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.BLAKE2S, 'Blake2S');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.SKUNK, 'Skunk');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.CRYPTONIGHTV7, 'CryptoNightV7');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.CRYPTONIGHTHEAVY, 'CryptoNightHeavy');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.LYRA2Z, 'Lyra2Z');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.X16R, 'X16R');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.CRYPTONIGHTV8, 'CryptoNightV8');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.SHA256ASICBOOST, 'SHA-256 Asic Boost');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.ZHASH, 'ZHa');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.BEAM, 'BEAM');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.GRINCUCKAROO29, 'GrinCuckaroo29');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.GRINCUCKATOO31, 'GrinCuckaroo31');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.LYRA2REV3, 'Lyra2REV3');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.CRYPTONIGHTR, 'CryptoNightR');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.CUCKOOCYCLE, 'CuckooCycle');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.GRINCUCKAROOD29, 'GrinCuckarooD29');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.BEAMV2, 'BeamV2');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.X16RV2, 'X16RV2');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.RANDOMXMONERO, 'RandomXMonero');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.EAGLESONG, 'EagleSong');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.CUCKAROOM, 'CuckaRoom');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.GRINCUCKATOO32, 'GrinCuckatoo32');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.HANDSHAKE, 'HandShake');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.KAWPOW, 'KAWPOW');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.CUCKAROO29BFC, 'Cuckaroo29BFC');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.BEAMV3, 'BeamV3');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.CUCKAROOZ29, 'CuckarooZ29');
MiningAlgorithmDisplayNames.set(MiningAlgorithm.OCTOPUS, 'Octopus');
