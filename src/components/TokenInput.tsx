import React from 'react';

interface TokenInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  token: string;
  tokens?: string[];
  onTokenSelect?: (token: string) => void;
  disabled?: boolean;
}

export const TokenInput: React.FC<TokenInputProps> = ({
  label,
  value,
  onChange,
  token,
  tokens,
  onTokenSelect,
  disabled = false,
}) => (
  <div className="bg-white/5 p-4 rounded-xl backdrop-blur-sm">
    <div className="flex justify-between items-center mb-2">
      <label className="text-sm text-gray-300">{label}</label>
    </div>
    <div className="flex items-center gap-2">
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-transparent text-2xl outline-none text-white disabled:opacity-50"
        placeholder="0.0"
        disabled={disabled}
      />
      {tokens && onTokenSelect ? (
        <select
          value={token}
          onChange={(e) => onTokenSelect(e.target.value)}
          className="bg-blue-500/20 px-3 py-1 rounded-lg text-blue-400 font-medium outline-none"
        >
          {tokens.map((t) => (
            <option key={t} value={t} className="bg-gray-900 text-white">
              {t}
            </option>
          ))}
        </select>
      ) : (
        <div className="bg-blue-500/20 px-3 py-1 rounded-lg text-blue-400 font-medium">
          {token}
        </div>
      )}
    </div>
  </div>
);