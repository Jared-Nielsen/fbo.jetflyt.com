
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
          onClick={onClose}
        />
        <div className="relative w-full max-w-2xl min-h-[400px] transform overflow-hidden rounded-lg bg-white p-8 text-left shadow-xl transition-all">
          <h3 className="text-xl font-semibold leading-6 text-gray-900 mb-6">{title}</h3>
          <div className="h-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
