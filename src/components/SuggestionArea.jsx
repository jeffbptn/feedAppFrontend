import { suggestCommentsApi } from "../util/ApiUtil";
import React, { useState, useRef, useEffect } from "react";

const SuggestionArea = ({ feedId, token, setComment }) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    suggestComments();
  }, []);

  const sendChip = (contents) => {
    setComment(contents);
  };

  const suggestComments = async () => {
    const res = await suggestCommentsApi(feedId, token);
    setSuggestions(res.payLoad.suggestions);
  };

  return (
    suggestions &&
    suggestions.length > 0 && (
      <div className="relative items-center self-center w-full max-w-l p-4 pt-0 overflow-hidden text-gray-600 focus-within:text-gray-400 inline-block">
        {suggestions.map((s) => (
          <div
            className="chip w-full p-1 m-0.5 rounded-xl text-sm inline-flex justify-between text-black bg-gray-400 items-center"
            key={s}
          >
            <div className="font-normal text-sm leading-relaxed">{s}</div>

            <button
              type="button"
              className="button"
              onClick={(e) => {
                e.preventDefault();
                sendChip(s);
              }}
            >
              <svg
                className="ml-1"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        ))}
        <button
          className="mx-auto px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-600 rounded-md hover:bg-purple-400 focus:outline-none focus:bg-purple-400 focus:ring focus:ring-purple-300 focus:ring-opacity-50"
          onClick={(e) => {
            e.preventDefault();
            suggestComments();
          }}
        >
          New Suggestions
        </button>
      </div>
    )
  );
};

export default SuggestionArea;
