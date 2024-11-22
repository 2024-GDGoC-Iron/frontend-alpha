import { Send } from 'lucide-react';
export const ChatInput = ({ value, onChange, onSubmit, disabled }) => {
  return (
    <form onSubmit={onSubmit} className="relative">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="구체적으로 물어보세요?"
        className="w-full px-6 py-4 bg-[#F8F9FB] rounded-full outline-none"
        disabled={disabled}
      />
      <button 
        type="submit"
        className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        disabled={!value.trim() || disabled}
      >
        <Send size={18} />
      </button>
    </form>
  );
};