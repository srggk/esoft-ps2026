import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Input from '../ui-elements/Input';
import Button from '../ui-elements/Button';

function LoginModal({ isOpen, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  // const handleOverlayClick = (e) => {
  //   if (e.target === e.currentTarget) onClose();
  // };

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={modalRef}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-99999"
      // onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-xl p-6 w-full max-w-sm mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-xl font-semibold text-gray-900 mb-6">Log in to an account</h2>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <Input
            type="text"
            placeholder="Email / nickname"
          />
          <Input
            type="password"
            placeholder="Password"
          />
          <Button
            type="submit"
            variant="dark"
            isFullWeight
          >
            Login
          </Button>
        </form>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

export default LoginModal;
