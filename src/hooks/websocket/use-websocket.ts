import { useRef, useEffect, useState } from 'react';

export const useWebSocket = (
  wsUrl: string,
  initRequest: any,
  onMessage: (this: WebSocket, ev: MessageEvent) => any,
) => {
  const ws = useRef<WebSocket | null>(null);
  const [isConnect, setIsConnect] = useState(false);

  useEffect(() => {
    if (!initRequest) return;
    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      setIsConnect(true);
      ws.current?.send(JSON.stringify(initRequest));
    };

    ws.current.onmessage = onMessage;

    return () => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.close();
        setIsConnect(false);
      }
    };
  }, [initRequest]);

  return {
    isConnect,
  };
};
