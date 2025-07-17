import React, { useState } from 'react';

const AdminPinModal = ({ isOpen, onClose, onSubmit }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!pin) {
      setError('PIN is required');
      return;
    }
    setError('');
    onSubmit(pin);
    setPin('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
        <h2 className="text-lg font-bold mb-4">Enter Admin PIN</h2>
        <input
          type="password"
          value={pin}
          onChange={e => setPin(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-2"
          placeholder="Enter PIN"
        />
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default AdminPinModal; 