// types.ts

import { LogMessage } from '@/lib/LogMessage';
import { GutLevels } from '@/lib/GutLevels';

export interface RootState {
    logLevel: number;
    logs: LogMessage[];
    gutLevels: GutLevels[];
    game: Phaser.Game;
}
