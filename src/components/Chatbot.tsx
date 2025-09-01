"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react"; // Icon library
import Draggable from "react-draggable";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <Draggable handle=".chat-header">
            <div className="mb-4 w-72 rounded-2xl bg-white dark:bg-gray-900 shadow-2xl border border-gray-300 dark:border-gray-700 transition-all duration-300 ease-in-out transform opacity-100 scale-100 animate-fade-in">
            <div className="flex items-center justify-between p-3 border-b dark:border-gray-700 border-gray-300">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Chat with us
                </h4>
                <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
                >
                <X size={18} />
                </button>
            </div>
            <div className="p-4 text-gray-600 dark:text-gray-300 text-sm">
                {/* Placeholder content */}
                Hi! How can I help you today?
            </div>
            </div>
        </Draggable>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative rounded-full bg-purple-600 hover:bg-purple-700 text-white p-4 shadow-lg transition-transform transform hover:scale-110 focus:outline-none"
        >
        {/* Notification Badge - visible only when chat is closed */}
        {!isOpen && (
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
        )}
        <MessageCircle size={24} />
        </button>

    </div>
  );
}
