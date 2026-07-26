import React, { useEffect, useRef, useState } from "react";
import terminalSvg from "../../assets/terminal.svg";

type HistoryItem = {
  type: "input" | "output";
  text: string;
};

const MiniTerminal = () => {
  const [input, setInput] = useState("");

  const [history, setHistory] = useState<HistoryItem[]>([
    { type: "output", text: "SunnyOS v1.0.0 (tty1)" },
    {
      type: "output",
      text: 'Type "help" to see available commands.',
    },
  ]);

  const [secretNumber, setSecretNumber] = useState<number | null>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const addLine = (
    text: string,
    type: HistoryItem["type"] = "output"
  ) => {
    setHistory((prev) => [...prev, { type, text }]);
  };

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop =
        terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    const originalInput = input.trim();
    const cmd = originalInput.toLowerCase();

    addLine(`guest@sunny:~$ ${originalInput}`, "input");

    if (secretNumber !== null && cmd !== "" && !isNaN(Number(cmd))) {
      const guess = Number(cmd);

      if (guess === secretNumber) {
        addLine("🎉 Correct! You guessed the number.");
        setSecretNumber(null);
      } else if (guess < secretNumber) {
        addLine("Too low ⬇️");
      } else {
        addLine("Too high ⬆️");
      }

      setInput("");
      return;
    }

    switch (cmd) {
      case "help":
        addLine(
          "Available commands: whoami, skills, projects, contact, clear, sudo"
        );
        addLine("Fun commands: game, guess, rps");
        break;

      case "whoami":
        addLine("Sunny Dhruv | 4th Year B.Tech CSE Student");
        addLine("Full-Stack Developer | DSA Problem Solver");
        break;

      case "skills":
        addLine("► C++, Python, JavaScript, TypeScript");
        addLine("► React, Node.js, Express, FastAPI");
        addLine("► MongoDB, PostgreSQL, Git, GitHub");
        break;

      case "projects":
        addLine("1. Feature Flag Management System");
        addLine("2. AI Resume Analyzer");
        addLine("3. AI Interviewer");
        addLine("4. Spotify Backend Clone");
        addLine("5. Flipkart Dashboard Clone");
        break;

      case "contact":
        addLine("LinkedIn: Sunny Dhruv");
        addLine("GitHub: Sunny Dhruv");
        break;

      case "game":
        addLine("🎮 Available games:");
        addLine("• guess  -> Number Guessing Game");
        addLine("• rps    -> Rock Paper Scissors");
        break;

      case "guess": {
        const num = Math.floor(Math.random() * 10) + 1;
        setSecretNumber(num);
        addLine("I picked a number between 1 and 10. Try to guess!");
        break;
      }

      case "rps":
        addLine("Type rock, paper, or scissors");
        setSecretNumber(null);
        break;

      case "rock":
      case "paper":
      case "scissors": {
        const options = ["rock", "paper", "scissors"];
        const bot = options[Math.floor(Math.random() * options.length)];

        addLine(`You chose: ${cmd}`);
        addLine(`Bot chose: ${bot}`);

        if (cmd === bot) {
          addLine("Draw 🤝");
        } else if (
          (cmd === "rock" && bot === "scissors") ||
          (cmd === "paper" && bot === "rock") ||
          (cmd === "scissors" && bot === "paper")
        ) {
          addLine("You win 🎉");
        } else {
          addLine("Bot wins 🤖");
        }

        break;
      }

      case "sudo":
        addLine("Nice try. This incident will be reported. 🚨");
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      case "":
        break;

      default:
        addLine(`bash: ${cmd}: command not found`);
    }

    setInput("");
  };

  return (
    <div
      className="relative w-full max-w-[850px] mx-auto font-mono"
      style={{
        aspectRatio: "850 / 380",
        backgroundImage: `url(${terminalSvg})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      onClick={() => inputRef.current?.focus()}
    >
      <div
        ref={terminalBodyRef}
        className="
          absolute
          left-[4%]
          right-[4%]
          top-[17%]
          bottom-[7%]
          overflow-y-auto
          px-1
          text-sm
          sm:text-base
          custom-scrollbar
        "
      >
        {history.map((line, index) => (
          <div
            key={`${line.text}-${index}`}
            className={`mb-2 break-words ${
              line.type === "input"
                ? "text-white"
                : "text-blue-400"
            }`}
          >
            {line.text}
          </div>
        ))}

        <div className="flex items-center mt-2">
          <span className="text-green-400 mr-2 whitespace-nowrap">
            guest@sunny:~$
          </span>

          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            className="
              min-w-0
              flex-1
              bg-transparent
              border-none
              outline-none
              text-blue-400
              caret-green-400
            "
            autoComplete="off"
            spellCheck={false}
            aria-label="Terminal command input"
          />
        </div>
      </div>
    </div>
  );
};

export default MiniTerminal;