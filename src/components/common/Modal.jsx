import React from 'react';

export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/30" 
          onClick={onClose}
        />
        
        {/* Modal content */}
        <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-3xl p-6 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};