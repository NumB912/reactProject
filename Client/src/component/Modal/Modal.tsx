import { useState } from 'react';

export default function ExampleModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Mở Modal
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-xl max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Tiêu đề Modal</h2>
            <p>Nội dung bên trong modal.</p>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </>
  );
}
