// InputCreatedBy.js
import React from 'react';

const InputCreatedBy = ({ createdByUserId }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Dibuat Oleh</label>
      <input
        type="text"
        value={createdByUserId}
        readOnly
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100"
      />
    </div>
  );
};

export default InputCreatedBy;
