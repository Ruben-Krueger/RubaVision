import Data from '../types/Data';
import Round from '../types/Round';
import { v4 as uuid } from 'uuid';

/** Store results of a game into local storage.
 *
 * @param rounds Game information
 */

export default function storeResults(rounds: Round[]): Data {
  const data: Data = {
    timestamp: Date.now(),
    id: uuid(),
    rounds,
  };

  window.localStorage.setItem('data', JSON.stringify(data));

  return data;
}
