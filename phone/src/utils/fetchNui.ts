/**
 * Simple wrapper around fetch API tailored for CEF/NUI use.
 * @param eventName - The endpoint eventname to target
 * @param data - Data you wish to send in the NUI Callback
 *
 * @return returnData - A promise for the data sent back by the NuiCallbacks CB argument
 */
import LogDebugEvent from '../os/debug/LogDebugEvents';
import { isEnvBrowser } from './misc';

export async function fetchNui<T = any>(eventName: string, data?: any, mockResp?: T): Promise<T> {
  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  };

  LogDebugEvent({ data, action: `fetchNui (${eventName})` });

  if (isEnvBrowser() && mockResp) return mockResp;

  const resourceName = (window as any).GetParentResourceName
    ? (window as any).GetParentResourceName()
    : 'npwd';

  const resp = await fetch(`https://${resourceName}/${eventName}`, options);

  return await resp.json();
}
