'use client';

import { SWRConfig } from 'swr';
import axios from './axios';

export const SWRProvider = ({ children }: { children: React.ReactNode }) => {
  const axiosFetcher = (url: string) => axios.get(url).then((res) => res.data);

  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: axiosFetcher,
      }}
    >
      {children}
    </SWRConfig>
  );
};
