import { useRef, useEffect } from 'react';

export const UseWebSocket = (
  wsUrl: string,
  initRequest: any,
  onMessage: (this: WebSocket, ev: MessageEvent) => any,
) => {
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      console.log('websocket connect');

      ws.current?.send(JSON.stringify(initRequest));
    };

    ws.current.onmessage = onMessage;

    return () => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.close();
      }
    };
  }, []);

  return {
    isConnect: ws.current?.readyState === WebSocket.OPEN,
  };
};
