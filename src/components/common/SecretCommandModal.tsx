import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface SecretCommandModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SecretCommandModal: React.FC<SecretCommandModalProps> = ({ isOpen, onClose }) => {
  const [command, setCommand] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Secret commands and their routes
  const secretCommands = {
    'admin': '/secret/admin',
    'tools': '/secret/tools', 
    'dev': '/secret/dev',
    'scripts': '/secret/scripts',
    'figma': '/secret/figma-tools',
    'matrix': '/secret/matrix',
    'control': '/secret/control-panel',
    'sys': '/secret/system'
  };

  useEffect(() => {
    if (isOpen) {
      setCommand('');
      setError('');
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsValidating(true);
    setError('');

    // Simulate command validation delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const normalizedCommand = command.toLowerCase().trim();
    
    if (secretCommands[normalizedCommand as keyof typeof secretCommands]) {
      // Valid command - navigate to secret page
      onClose();
      navigate(secretCommands[normalizedCommand as keyof typeof secretCommands]);
    } else {
      setError('Access denied. Invalid command.');
      setCommand('');
    }
    
    setIsValidating(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999]"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -50 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300 
            }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[10000]"
          >
            <div className="bg-brand-charcoal border-2 border-accent-gold rounded-lg p-8 w-96 shadow-2xl">
              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="text-accent-gold font-pp-supply-mono text-xl mb-2">
                  ▄▄▄ ACCESS TERMINAL ▄▄▄
                </h2>
                <p className="text-brand-cream text-sm opacity-80">
                  Enter command to access restricted areas
                </p>
              </div>

              {/* Command Form */}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <div className="flex items-center bg-black/40 border border-accent-gold/30 rounded p-3">
                    <span className="text-accent-gold font-pp-supply-mono text-sm mr-2">
                      DM&gt;
                    </span>
                    <input
                      type="text"
                      value={command}
                      onChange={(e) => setCommand(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1 bg-transparent text-brand-cream font-pp-supply-mono text-sm outline-none placeholder-brand-cream/50"
                      placeholder="enter command..."
                      autoFocus
                      disabled={isValidating}
                    />
                  </div>
                </div>

                {/* Loading State */}
                {isValidating && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center mb-4"
                  >
                    <div className="flex items-center justify-center space-x-1">
                      <span className="text-accent-gold text-sm font-pp-supply-mono">
                        VALIDATING
                      </span>
                      <motion.span
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="text-accent-gold"
                      >
                        ...
                      </motion.span>
                    </div>
                  </motion.div>
                )}

                {/* Error Message */}
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded"
                  >
                    <p className="text-red-400 text-sm font-pp-supply-mono">
                      {error}
                    </p>
                  </motion.div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    disabled={!command.trim() || isValidating}
                    className="flex-1 bg-accent-gold text-brand-charcoal font-pp-supply-mono text-sm py-2 px-4 rounded hover:bg-accent-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isValidating ? 'PROCESSING...' : 'EXECUTE'}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border border-brand-cream/30 text-brand-cream font-pp-supply-mono text-sm rounded hover:bg-brand-cream/10 transition-colors"
                  >
                    CANCEL
                  </button>
                </div>
              </form>

              {/* Hint */}
              <div className="mt-6 text-center">
                <p className="text-brand-cream/50 text-xs font-pp-supply-mono">
                  ESC to close • Try: admin, tools, dev
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SecretCommandModal;