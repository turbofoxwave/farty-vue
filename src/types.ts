// types.ts

import { LogMessage } from './lib/LogMessage';
import { GutLevels } from './lib/GutLevels';
import GameLaunch from './game';

export interface RootState {
    logs: LogMessage[];
    gutLevels: GutLevels[];
    game: GameLaunch;
}
