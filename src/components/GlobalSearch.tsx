"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, FileText, ChevronRight, Activity, Globe, Award, HelpCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSearch } from "../context/SearchContext";
import { searchIndex, SearchResult, SearchCategory } from "../data/searchData";

const categoryIcons: Record<SearchCategory, React.ReactNode> = {
  Services: <Activity size={16} className="text-blue-500" />,
  Company: <Globe size={16} className="text-emerald-500" />,
  Certifications: <Award size={16} className="text-amber-500" />,
  Support: <HelpCircle size={16} className="text-purple-500" />
};

export default function GlobalSearch() {
  const { isSearchOpen, closeSearch } = useSearch();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Reset state when opening/closing
  useEffect(() => {
    if (isSearchOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  // Fuzzy Search filtering logic
  const filteredResults = React.useMemo(() => {
    if (!query.trim()) return [];
    
    const lowerQuery = query.toLowerCase();
    const exactMatches: SearchResult[] = [];
    const keywordMatches: SearchResult[] = [];

    searchIndex.forEach((item) => {
      const matchTitle = item.title.toLowerCase().includes(lowerQuery);
      const matchDesc = item.description.toLowerCase().includes(lowerQuery);
      const matchKeywords = item.keywords.some(kw => kw.toLowerCase().includes(lowerQuery));

      if (matchTitle || matchDesc) {
        exactMatches.push(item);
      } else if (matchKeywords) {
        keywordMatches.push(item);
      }
    });

    return [...exactMatches, ...keywordMatches].slice(0, 6); // Max 6 results
  }, [query]);

  // Handle Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isSearchOpen || filteredResults.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredResults.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % filteredResults.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const selected = filteredResults[selectedIndex];
        if (selected) {
          handleSelect(selected.url);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, filteredResults, selectedIndex]);

  const handleSelect = (url: string) => {
    closeSearch();
    router.push(url);
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-[999] flex items-start justify-center pt-[10vh] px-4 sm:px-0">
          
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
            onClick={closeSearch}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,0.3)] overflow-hidden border border-black/10 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Area */}
            <div className="flex items-center px-6 py-5 border-b border-black/5 bg-gray-50/50">
              <Search size={22} className="text-black/40 mr-4 shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="What are you looking for?"
                className="w-full bg-transparent border-none outline-none text-xl lg:text-2xl font-heading text-black font-medium placeholder:text-black/20"
                spellCheck={false}
              />
              <button 
                onClick={closeSearch}
                className="ml-4 p-2 rounded-full hover:bg-black/5 text-black/40 hover:text-black transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Empty State / Hints */}
            {!query.trim() && (
              <div className="p-10 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-6">
                   <Search size={28} />
                </div>
                <h3 className="text-lg font-bold font-heading text-black mb-2">Search TOS Lanka</h3>
                <p className="text-sm text-black/50 max-w-sm">
                  Try searching for <span className="text-brand-primary font-medium cursor-pointer hover:underline" onClick={() => setQuery("ISO")}>&quot;ISO&quot;</span>, <span className="text-brand-primary font-medium cursor-pointer hover:underline" onClick={() => setQuery("SMT")}>&quot;SMT&quot;</span>, or <span className="text-brand-primary font-medium cursor-pointer hover:underline" onClick={() => setQuery("Contact")}>&quot;Contact&quot;</span> to instantly jump to a section.
                </p>
              </div>
            )}

            {/* Results Area */}
            {query.trim() && filteredResults.length > 0 && (
              <div className="max-h-[60vh] overflow-y-auto p-4 flex flex-col gap-2">
                {filteredResults.map((result, idx) => (
                  <div
                    key={result.id}
                    onClick={() => handleSelect(result.url)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-start p-4 rounded-2xl cursor-pointer transition-all duration-200 border ${
                      selectedIndex === idx 
                        ? "bg-brand-primary/5 border-brand-primary/20 shadow-sm" 
                        : "bg-transparent border-transparent hover:bg-gray-50"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-white border border-black/5 shadow-sm flex items-center justify-center shrink-0 mr-4">
                      {categoryIcons[result.category] || <FileText size={16} className="text-black/40" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold tracking-wider uppercase text-black/40 bg-black/5 px-2 py-0.5 rounded-full">
                          {result.category}
                        </span>
                      </div>
                      <h4 className={`text-base font-bold font-heading truncate mb-1 ${selectedIndex === idx ? "text-brand-primary" : "text-black"}`}>
                        {result.title}
                      </h4>
                      <p className="text-sm text-black/50 truncate">
                        {result.description}
                      </p>
                    </div>
                    <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full ml-4 self-center group-hover:bg-white text-black/20">
                      <ChevronRight size={18} className={selectedIndex === idx ? "text-brand-primary" : ""} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {query.trim() && filteredResults.length === 0 && (
              <div className="p-10 flex flex-col items-center justify-center text-center">
                <FileText size={40} className="text-black/20 mb-4" />
                <h3 className="text-base font-bold text-black mb-1">No results found</h3>
                <p className="text-sm text-black/40">We couldn&apos;t find anything matching &quot;{query}&quot;.</p>
              </div>
            )}
            
            {/* Footer */}
            <div className="px-6 py-4 border-t border-black/5 bg-gray-50 flex items-center justify-between">
              <span className="text-xs text-black/40 font-medium">
                Tip: Press <kbd className="font-mono bg-black/5 px-1.5 py-0.5 rounded border border-black/10 mx-1">Cmd</kbd> + <kbd className="font-mono bg-black/5 px-1.5 py-0.5 rounded border border-black/10 mx-1">K</kbd> to search anytime.
              </span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-black/30">
                TOS Lanka
              </span>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
