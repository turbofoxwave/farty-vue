// types.ts

import { LogMessage } from './lib/LogMessage';
import { GutLevels } from './lib/GutLevels';

export interface RootState {
    logs: LogMessage[];
    gutLevels: GutLevels[];
}
