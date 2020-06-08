// types.ts

import { LogMessage } from '@/lib/LogMessage';
import { GutLevels } from '@/lib/GutLevels';
import GameLaunch from '@/game';

export interface RootState {
    logLevel: number;
    logs: LogMessage[];
    gutLevels: GutLevels[];
    game: GameLaunch;
}
