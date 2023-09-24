import { createContext, FC, useEffect, useState } from "react";

export interface IMessageContext {
  message: {
    id: string;
    message: string;
  }[];
  onAddMessage: (message: string) => void;
}

export const MessageContext = createContext<IMessageContext>(
  null as unknown as IMessageContext
);

const mountedStyle = { animation: "inAnimation 250ms ease-in" };
// const unmountedStyle = {
//   animation: "outAnimation 270ms ease-out",
//   animationFillMode: "forwards",
// };

const MessageContextProvider: FC<{ children: any }> = ({ children }) => {
  const [message, setMessage] = useState<
    Array<{ id: string; message: string }>
  >([]);
  const [timeouts, setTimeouts] = useState<number[]>([]);

  useEffect(() => {
    if (message.length >= 1) {
      message.forEach((msg, index) => {
        const timeout = setTimeout(() => {
          setMessage((prevMessages) => [
            ...prevMessages.filter((prvMsg) => prvMsg !== msg),
          ]);
        }, 2000 + 100 * (index + 1));
        setTimeouts((prevTimeouts: any) => [...prevTimeouts, timeout]);
      });
    }
  }, [message]);

  useEffect(() => {
    return () => timeouts.forEach((t) => clearTimeout(t));
  }, []);

  const onAddMessage = (toBeAddedMessage: string) => {
    const id = message.length;
    setMessage((prevMessages) => [
      ...prevMessages,
      {
        id: id.toString(),
        message: toBeAddedMessage,
      },
    ]);
  };

  return (
    <MessageContext.Provider value={{ message, onAddMessage }}>
      <div className="modal">
        {message.length >= 1
          ? message.map(({ message, id }, _idx) => (
              <div
                key={`${message}-${id}`}
                className="modal-item modal__error"
                style={mountedStyle}
              >
                <h1 className="modal__title">{message}</h1>
              </div>
            ))
          : null}
      </div>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageContextProvider;
