import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  Send,
  Trash2,
  Sparkles,
  BookOpen,
  FileText,
  Compass,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Code2,
  Languages,
  User,
  MessageSquare
} from 'lucide-react';
import { ResumeBuilder } from './ResumeBuilder';
import { LearningGuide } from './LearningGuide';
import { BotanicalCornerVine, BotanicalDivider } from './BotanicalDecorations';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  source?: string;
}


export const AIAssistant: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'resume' | 'guide'>('chat');
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [aiStatus, setAiStatus] = useState<{ isConfigured: boolean; message: string }>({
    isConfigured: true,
    message: 'Connecting...',
  });

  const chatBottomRef = useRef<HTMLDivElement>(null);

  const initialWelcomeMessage: ChatMessage = {
    id: 'welcome-1',
    role: 'assistant',
    content:
      "Hi! I'm your AI Learning Assistant. Ask me about programming, artificial intelligence, web development, college subjects, or your projects. I'll help you understand concepts step by step.",
    timestamp: 'Just now',
    source: 'system',
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialWelcomeMessage]);

  // Quick Chips requested in Master Prompt
  const quickQuestionChips = [
    'Explain Python from basics.',
    'Help me understand AI.',
    'Explain this code.',
    'Help me debug an error.',
    'How do I build a website?',
    'Explain in Telugu.',
    'Give me a project idea.',
    'Prepare me for an interview.',
    'What is Student AI Copilot?',
    'What is Student Performance Analyser?',
  ];

  // Fetch status on mount
  useEffect(() => {
    fetch('/api/status')
      .then((res) => res.json())
      .then((data) => {
        setAiStatus({
          isConfigured: data.aiConfigured,
          message: data.message,
        });
      })
      .catch(() => {
        setAiStatus({
          isConfigured: false,
          message: 'Server status check unavailable.',
        });
      });
  }, []);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (activeTab === 'chat') {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeTab]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const history = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      });

      const data = await res.json();
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.reply || data.error || 'No response returned from the model.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-err-${Date.now()}`,
          role: 'assistant',
          content: 'Unable to reach the assistant server. Please check your network or server logs.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          source: 'error',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([initialWelcomeMessage]);
    setShowClearConfirm(false);
  };

  return (
    <section id="ai-assistant" className="py-24 relative bg-[#E8F3ED] overflow-hidden">
      {/* Botanical Corner Accent */}
      <BotanicalCornerVine position="top-right" size="md" className="top-4 right-2 sm:right-6 opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#CBDAD1] text-xs font-semibold text-[#26344A] mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Interactive Learning Companion</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#26344A] font-editorial tracking-tight mb-2">
            Meet Your AI Learning Assistant
          </h2>
          <p className="text-base text-[#303039]/80 leading-relaxed font-sans mb-4">
            Curious about something? Ask a question, explore a concept, or get step-by-step help with your learning.
          </p>
          <BotanicalDivider centered={false} className="opacity-60" />
        </div>


        {/* Feature Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'chat'
                ? 'bg-[#26344A] text-white shadow-xs'
                : 'bg-white/80 text-[#303039] hover:bg-white border border-gray-200/80'
            }`}
          >
            <Bot className="w-4 h-4 text-sky-400" />
            <span>Clarify Doubts (Chat)</span>
          </button>

          <button
            onClick={() => setActiveTab('resume')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'resume'
                ? 'bg-[#26344A] text-white shadow-xs'
                : 'bg-white/80 text-[#303039] hover:bg-white border border-gray-200/80'
            }`}
          >
            <FileText className="w-4 h-4 text-emerald-500" />
            <span>Build My Resume</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'guide'
                ? 'bg-[#26344A] text-white shadow-xs'
                : 'bg-white/80 text-[#303039] hover:bg-white border border-gray-200/80'
            }`}
          >
            <Compass className="w-4 h-4 text-indigo-500" />
            <span>Guide My Learning</span>
          </button>
        </div>

        {/* TAB 1: CLARIFY DOUBTS CHAT */}
        {activeTab === 'chat' && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-[700px] max-h-[82vh]">
            
            {/* Chat Top Bar */}
            <div className="px-6 py-4 bg-[#FAF8F3] border-b border-gray-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#26344A] flex items-center justify-center text-white">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-editorial text-base font-bold text-[#26344A]">
                      Shaik Yasmin’s Learning Assistant
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                  </div>
                  <div className="text-[11px] text-[#747780] flex items-center gap-2">
                    <span>Model: Gemini 3.8 Flash</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Languages className="w-3 h-3 text-sky-600" />
                      English & Telugu supported
                    </span>
                  </div>
                </div>
              </div>

              {/* Clear chat button */}
              <button
                onClick={() => setShowClearConfirm(true)}
                className="px-3 py-1.5 rounded-full text-xs text-[#747780] hover:text-red-600 hover:bg-red-50 transition-colors flex items-center gap-1 border border-gray-200"
                title="Clear conversation"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Clear Chat</span>
              </button>
            </div>

            {/* Chat Message Stream */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#E8F3ED]/30">
              {messages.map((msg) => {
                const isUser = msg.role === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                        isUser
                          ? 'bg-[#26344A] text-white'
                          : 'bg-white border border-gray-200 text-[#26344A] shadow-2xs'
                      }`}
                    >
                      {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-[#26344A]" />}
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                        isUser
                          ? 'bg-[#26344A] text-white rounded-tr-none'
                          : 'bg-white text-[#303039] border border-white shadow-2xs rounded-tl-none whitespace-pre-wrap'
                      }`}
                    >
                      {msg.content}
                      <div
                        className={`text-[10px] mt-2 flex items-center justify-end gap-1.5 ${
                          isUser ? 'text-white/60' : 'text-[#747780]'
                        }`}
                      >
                        {msg.source && msg.source !== 'system' && (
                          <span className="italic">{msg.source}</span>
                        )}
                        <span>{msg.timestamp}</span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white border border-gray-200 text-[#26344A] flex items-center justify-center">
                    <Bot className="w-4 h-4 animate-bounce" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-none p-4 border border-white shadow-2xs text-xs text-[#747780] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#26344A] animate-ping" />
                    <span>Thinking and formulating step-by-step answer...</span>
                  </div>
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>

            {/* Quick Question Chips */}
            <div className="px-4 py-2.5 bg-white border-t border-gray-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-[11px] font-semibold text-[#747780] shrink-0 mr-1">
                Suggestions:
              </span>
              {quickQuestionChips.map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleSendMessage(chip)}
                  disabled={isLoading}
                  className="shrink-0 px-3 py-1 rounded-full text-xs font-medium bg-[#FAF8F3] hover:bg-[#EAF2FF] text-[#26344A] border border-gray-200 transition-colors disabled:opacity-50"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-4 bg-white border-t border-gray-200">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask me anything about Python, AI, Web Dev, college topics, or Telugu explanations..."
                  disabled={isLoading}
                  className="flex-1 text-xs sm:text-sm px-4 py-3 rounded-full border border-gray-200 bg-[#FAF8F3] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#26344A] transition-all"
                />

                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isLoading}
                  className="w-11 h-11 rounded-full bg-[#26344A] hover:bg-[#344662] text-white flex items-center justify-center shrink-0 transition-colors shadow-2xs disabled:opacity-40"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <div className="text-[10px] text-[#747780] text-center mt-2">
                Personalized AI companion • Powered by Gemini 3.8 Flash • Real-time student doubt clarification
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: RESUME BUILDER */}
        {activeTab === 'resume' && <ResumeBuilder />}

        {/* TAB 3: LEARNING GUIDE */}
        {activeTab === 'guide' && <LearningGuide />}

        {/* Clear Chat Confirmation Modal */}
        {showClearConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#26344A]/40 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-xl border border-white text-center">
              <h4 className="font-editorial text-xl font-bold text-[#26344A] mb-2">
                Clear Chat History?
              </h4>
              <p className="text-xs text-[#747780] mb-6">
                This will reset your conversation with the learning assistant back to the welcome message.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="px-4 py-2 rounded-full text-xs font-semibold text-[#303039] bg-[#F2F3F5] hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearChat}
                  className="px-4 py-2 rounded-full text-xs font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors"
                >
                  Yes, Clear
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
