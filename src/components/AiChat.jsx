/* global puter */
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader } from "lucide-react";
import { jobs } from "../data/jobs";

export default function AiChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm your Job Board AI assistant 👋 Ask me anything — which job suits you, need a cover letter, or anything else!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const jobContext = jobs.map((j) => ({
      id: j.id,
      title: j.title,
      company: j.company,
      type: j.type,
      role: j.role,
      location: j.location,
      salary: j.salary,
      requirements: j.requirements,
    }));

    const response = await puter.ai.chat([
      {
        role: "system",
        content: `You are a Job Board AI assistant.
        These jobs are available: ${JSON.stringify(jobContext)}
        Help the user — suggest jobs, write cover letters, assess skills.
        Keep responses short and helpful.`,
      },
      ...messages,
      userMessage,
    ]);

    const aiReply = {
      role: "assistant",
      content: response.message.content[0].text,
    };

    setMessages((prev) => [...prev, aiReply]);
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-rose-500 text-white p-4 rounded-full shadow-lg hover:bg-rose-600 transition z-50"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {open && (
        <div
          className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          style={{ height: "480px" }}
        >
          <div className="bg-rose-500 px-4 py-3 flex items-center gap-2">
            <MessageCircle size={18} className="text-white" />
            <span className="text-white font-semibold text-sm">Job Board AI</span>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-rose-500 text-white rounded-br-sm"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2.5 rounded-2xl rounded-bl-sm">
                  <Loader size={16} className="animate-spin text-gray-400" />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 px-3 py-3 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-xl px-4 py-2 outline-none focus:border-rose-300 placeholder:text-gray-400"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="bg-rose-500 text-white p-2 rounded-xl hover:bg-rose-600 transition disabled:opacity-60"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}