import styles from "./styles.module.scss";
import React, { useEffect, useState } from "react";

import CloseButton from "react-bootstrap/CloseButton";
import cn from "classnames";
import { Message } from "@/components/ai-chat/Message";
import { voiceRecognitionService } from "@/components/ai-chat/commands-config";

// VOICE RECOGNITION START

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

const recognition = new SpeechRecognition();

recognition.continous = true;
recognition.interimResults = true;
recognition.lang = "uk-UA";

// VOICE RECOGNITION END

interface IMessage {
  type: "reply" | "personal";
  message: string;
}

export const AiChat: React.FC = () => {
  const [isListening, setIsListening] = useState(false);

  const [isVisible, setIsVisible] = useState(false);

  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<IMessage[]>([
    {
      type: "reply",
      message: "Привіт, Я Ваш AI Асистент. Чим я можу допомогти?",
    },
    {
      type: "reply",
      message:
        "Ви можете отримати відповідь на питання, що стосуються цього додатку, або попросити мене перейти на сторінку додатку.",
    },
  ]);

  const lastMessage = messages[messages.length - 1];
  const isLastMessagePersonal = lastMessage.type === "personal";

  const isSubmitActive = input.length && !isListening;

  function toggleListen() {
    setIsListening(!isListening);
  }

  function submitInput() {
    setMessages([...messages, { type: "personal", message: input }]);
    setInput("");
  }

  function handleSubmitButton() {
    if (input.length && !isListening) {
      submitInput();
    } else {
      toggleListen();
    }
  }

  useEffect(() => {
    if (isLastMessagePersonal) {
      const replyKey = (Object.keys(
        voiceRecognitionService.commandsConfig,
      ).find((key) => lastMessage.message.toLowerCase().includes(key)) ||
        "error") as keyof typeof voiceRecognitionService.commandsConfig;
      const replyConfig = voiceRecognitionService.commandsConfig[replyKey];

      setTimeout(() => {
        setMessages([
          ...messages,
          {
            type: "reply",
            message: replyConfig.message,
          },
        ]);
      }, 300);

      replyConfig.handler?.();
    }
  }, [isLastMessagePersonal]);

  useEffect(() => {
    handleListen();
  }, [isListening]);

  function handleListen() {
    if (isListening) {
      recognition.start();
      recognition.onend = () => {
        console.log("...continue listening...");
        recognition.start();
      };
    } else {
      recognition.stop();
      recognition.onend = () => {
        console.log("Stopped listening per click");
      };
    }

    let finalTranscript = "";

    recognition.onstart = () => {
      console.log("Listening!");
    };

    recognition.onspeechend = (e) => {
      finalTranscript = "";
    };

    recognition.onresult = (e) => {
      let interimTranscript = "";

      for (let i = e.resultIndex; i < e.results.length; i++) {
        const transcript = e.results[i][0].transcript;
        if (e.results[i].isFinal) finalTranscript += transcript + " ";
        else interimTranscript += transcript;
      }

      console.log(interimTranscript);
      console.log(finalTranscript);

      setInput(interimTranscript || finalTranscript);
    };

    recognition.onerror = (e) => {
      console.log("Error occurred in recognition: " + e.error);
    };
  }

  return (
    <div className={styles.chatWrapper}>
      {isVisible ? (
        <div className={styles.chat}>
          <div className={styles.chatHeader}>
            <h3>AI Асистент</h3>

            <CloseButton
              onClick={() => {
                setIsVisible(false);
              }}
            />
          </div>

          <div className={styles.chatBodyWrapper}>
            <div className={styles.chatBody}>
              {messages.map((message, index) => (
                <Message key={index} type={message.type}>
                  {message.message}
                </Message>
              ))}
            </div>
          </div>

          <div className={styles.chatFooter}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <button onClick={handleSubmitButton}>
              {isSubmitActive ? (
                <i className="bi bi-send"></i>
              ) : (
                <i
                  className={cn([
                    "bi bi-record-circle",
                    styles.recordIcon,
                    { [styles.listening]: isListening },
                  ])}
                />
              )}
            </button>
          </div>
        </div>
      ) : (
        <div
          className={styles.startChatBtn}
          onClick={() => {
            setIsVisible(true);
          }}
        >
          <i className={cn(["bi bi-chat-dots", styles.chatIcon])} />
        </div>
      )}
    </div>
  );
};
