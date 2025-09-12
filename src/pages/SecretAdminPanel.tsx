import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/common/SEO';

// Type definitions
interface Module {
  id: string;
  name: string;
  category: string;
  description: string;
  status: 'testing' | 'approved' | 'review';
  systemPrompt: string;
  parameters: Record<string, any>;
  cardImage?: string;
  featureImage?: string;
}

interface Service {
  id: string;
  name: string;
  command: string;
  status: 'active' | 'inactive';
  description: string;
}

interface SubAgent {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'maintenance';
  description: string;
}

// ViewToggle Component
const ViewToggle: React.FC<{
  currentView: 'list' | 'card' | 'table';
  onToggle: (view: 'list' | 'card' | 'table') => void;
  options: Array<{ value: 'list' | 'card' | 'table'; icon: string; label: string }>;
}> = ({ currentView, onToggle, options }) => (
  <div className="flex items-center bg-black/20 backdrop-blur-sm border border-accent-gold/20 rounded-lg p-1">
    {options.map(({ value, icon, label }) => (
      <button
        key={value}
        onClick={() => onToggle(value)}
        className={`px-3 py-2 rounded-md text-xs font-mono transition-all duration-200 flex items-center space-x-2 ${
          currentView === value
            ? 'bg-accent-gold text-brand-charcoal shadow-lg shadow-accent-gold/25'
            : 'text-brand-cream/60 hover:text-brand-cream hover:bg-white/5'
        }`}
      >
        <span className="text-sm">{icon}</span>
        <span>{label}</span>
      </button>
    ))}
  </div>
);

// Module Detail Modal Component
const ModuleDetailModal: React.FC<{
  module: Module;
  isOpen: boolean;
  onClose: () => void;
  onSave: (module: Module) => void;
}> = ({ module, isOpen, onClose, onSave }) => {
  const [editedModule, setEditedModule] = useState<Module>(module);

  const generateImage = async (type: 'card' | 'feature') => {
    // Mock image generation - replace with actual Nano Banana or OpenAI call
    const mockUrl = `https://picsum.photos/400/300?random=${Date.now()}`;
    setEditedModule(prev => ({
      ...prev,
      [type === 'card' ? 'cardImage' : 'featureImage']: mockUrl
    }));
  };

  const handleSave = () => {
    onSave(editedModule);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gradient-to-br from-brand-charcoal to-gray-900 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-accent-gold/20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-accent-gold">{editedModule.name}</h3>
          <button
            onClick={onClose}
            className="text-brand-cream/60 hover:text-brand-cream text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          {/* Status Dropdown */}
          <div>
            <label className="block text-sm font-medium text-brand-cream mb-2">Status</label>
            <select
              value={editedModule.status}
              onChange={(e) => setEditedModule(prev => ({ ...prev, status: e.target.value as Module['status'] }))}
              className="w-full bg-black/30 border border-accent-gold/20 rounded-lg px-4 py-2 text-brand-cream focus:border-accent-gold outline-none"
            >
              <option value="testing">Testing</option>
              <option value="review">Review</option>
              <option value="approved">Approved</option>
            </select>
          </div>

          {/* System Prompt */}
          <div>
            <label className="block text-sm font-medium text-brand-cream mb-2">System Prompt</label>
            <textarea
              value={editedModule.systemPrompt}
              onChange={(e) => setEditedModule(prev => ({ ...prev, systemPrompt: e.target.value }))}
              className="w-full bg-black/30 border border-accent-gold/20 rounded-lg px-4 py-2 text-brand-cream focus:border-accent-gold outline-none resize-none"
              rows={4}
            />
          </div>

          {/* Image Generation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-brand-cream mb-2">Card Image</label>
              {editedModule.cardImage && (
                <img src={editedModule.cardImage} alt="Card" className="w-full h-32 object-cover rounded-lg mb-2" />
              )}
              <button
                onClick={() => generateImage('card')}
                className="w-full bg-accent-gold/20 border border-accent-gold/40 text-accent-gold px-4 py-2 rounded-lg hover:bg-accent-gold/30 transition-colors"
              >
                Generate Card Image
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-cream mb-2">Feature Image</label>
              {editedModule.featureImage && (
                <img src={editedModule.featureImage} alt="Feature" className="w-full h-32 object-cover rounded-lg mb-2" />
              )}
              <button
                onClick={() => generateImage('feature')}
                className="w-full bg-accent-gold/20 border border-accent-gold/40 text-accent-gold px-4 py-2 rounded-lg hover:bg-accent-gold/30 transition-colors"
              >
                Generate Feature Image
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-4">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-accent-gold text-brand-charcoal rounded-lg hover:bg-accent-gold/90 transition-colors font-medium"
            >
              Save Changes
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const SecretAdminPanel: React.FC = () => {
  // View mode states
  const [modulesViewMode, setModulesViewMode] = useState<'list' | 'card' | 'table'>('card');
  const [subagentsViewMode, setSubagentsViewMode] = useState<'list' | 'card' | 'table'>('list');
  const [servicesViewMode, setServicesViewMode] = useState<'list' | 'card' | 'table'>('list');
  const [dbViewMode, setDbViewMode] = useState<'list' | 'card' | 'table'>('table');

  // Modal states
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);

  // Active section state
  const [activeSection, setActiveSection] = useState('dashboard');

  // Data states
  const [modules, setModules] = useState<Module[]>([
    {
      id: '1',
      name: 'Social Media Scheduler',
      category: 'Content Marketing',
      description: 'AI-powered social media content scheduling and optimization',
      status: 'approved',
      systemPrompt: 'You are a social media scheduling assistant. Help users plan, create, and schedule social media content across multiple platforms.',
      parameters: { platforms: ['Facebook', 'Instagram', 'Twitter'], postTypes: ['text', 'image', 'video'] }
    },
    {
      id: '2',
      name: 'Email Campaign Designer',
      category: 'Email Marketing',
      description: 'Drag-and-drop email campaign builder with AI content suggestions',
      status: 'testing',
      systemPrompt: 'You are an email marketing specialist. Help users create effective email campaigns with personalized content.',
      parameters: { templates: 20, segments: ['leads', 'customers', 'vips'] }
    },
    {
      id: '3',
      name: 'Content Calendar Planner',
      category: 'Content Marketing',
      description: 'Strategic content planning with audience insights and trending topics',
      status: 'review',
      systemPrompt: 'You are a content strategist. Help users plan content calendars based on audience insights and trends.',
      parameters: { timeframes: ['weekly', 'monthly', 'quarterly'], contentTypes: ['blog', 'social', 'video'] }
    }
  ]);

  const [services] = useState<Service[]>([
    { id: '1', name: 'Development Server', command: 'npm start', status: 'active', description: 'React development server with hot reload' },
    { id: '2', name: 'Build Production', command: 'npm run build', status: 'active', description: 'Create optimized production build' },
    { id: '3', name: 'Run Tests', command: 'npm test', status: 'active', description: 'Execute Jest test suite' },
    { id: '4', name: 'Auto Commit', command: 'npm run auto-commit', status: 'active', description: 'AI-powered automatic git commits' },
    { id: '5', name: 'Client Data Sync', command: 'npm run clients:sync', status: 'active', description: 'Sync client data from Google Sheets' },
    { id: '6', name: 'Figma WebSocket', command: 'npm run figma:start', status: 'active', description: 'Start Figma integration server' },
    { id: '7', name: 'Claude Bridge', command: 'npm run claude-bridge', status: 'active', description: 'Claude Code integration bridge' },
    { id: '8', name: 'Asset Migration', command: 'npm run migration:start', status: 'active', description: 'Cloudinary asset migration tools' }
  ]);

  const [subagents] = useState<SubAgent[]>([
    { id: '1', name: 'Content Creator Agent', type: 'Creative', status: 'active', description: 'AI content generation and optimization' },
    { id: '2', name: 'SEO Optimizer Agent', type: 'Technical', status: 'active', description: 'Search engine optimization and analysis' },
    { id: '3', name: 'Social Media Agent', type: 'Marketing', status: 'active', description: 'Social media management and scheduling' },
    { id: '4', name: 'Analytics Agent', type: 'Data', status: 'maintenance', description: 'Performance tracking and reporting' }
  ]);

  const handleModuleClick = (module: Module) => {
    setSelectedModule(module);
    setIsModuleModalOpen(true);
  };

  const handleModuleSave = (updatedModule: Module) => {
    setModules(prev => prev.map(m => m.id === updatedModule.id ? updatedModule : m));
  };

  const viewToggleOptions = [
    { value: 'list' as const, icon: '☰', label: 'List' },
    { value: 'card' as const, icon: '⊞', label: 'Card' },
    { value: 'table' as const, icon: '▤', label: 'Table' }
  ];

  const renderModulesView = () => {
    if (modulesViewMode === 'card') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <motion.div
              key={module.id}
              layout
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-black/40 to-gray-900/60 backdrop-blur-sm border border-accent-gold/20 rounded-xl p-6 cursor-pointer hover:border-accent-gold/40 transition-all duration-300"
              onClick={() => handleModuleClick(module)}
            >
              {module.cardImage && (
                <img src={module.cardImage} alt={module.name} className="w-full h-32 object-cover rounded-lg mb-4" />
              )}
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold text-accent-gold">{module.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  module.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                  module.status === 'testing' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {module.status}
                </span>
              </div>
              <p className="text-brand-cream/70 text-sm mb-3">{module.description}</p>
              <div className="text-xs text-accent-gold/60">{module.category}</div>
            </motion.div>
          ))}
        </div>
      );
    }

    if (modulesViewMode === 'table') {
      return (
        <div className="bg-black/20 rounded-xl border border-accent-gold/20 overflow-hidden">
          <table className="w-full">
            <thead className="bg-accent-gold/10 border-b border-accent-gold/20">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-accent-gold">Name</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-accent-gold">Category</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-accent-gold">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-accent-gold">Description</th>
              </tr>
            </thead>
            <tbody>
              {modules.map((module) => (
                <tr
                  key={module.id}
                  className="border-b border-white/10 hover:bg-white/5 cursor-pointer"
                  onClick={() => handleModuleClick(module)}
                >
                  <td className="px-6 py-4 text-sm text-brand-cream">{module.name}</td>
                  <td className="px-6 py-4 text-sm text-brand-cream/70">{module.category}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      module.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                      module.status === 'testing' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {module.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-brand-cream/70">{module.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    // List view
    return (
      <div className="space-y-4">
        {modules.map((module) => (
          <div
            key={module.id}
            className="bg-black/20 backdrop-blur-sm border border-accent-gold/20 rounded-xl p-6 cursor-pointer hover:border-accent-gold/40 transition-all duration-300"
            onClick={() => handleModuleClick(module)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-accent-gold mb-2">{module.name}</h3>
                <p className="text-brand-cream/70 text-sm mb-2">{module.description}</p>
                <div className="text-xs text-accent-gold/60">{module.category}</div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                module.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                module.status === 'testing' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-blue-500/20 text-blue-400'
              }`}>
                {module.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'modules':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-accent-gold">Site Modules</h2>
              <ViewToggle
                currentView={modulesViewMode}
                onToggle={setModulesViewMode}
                options={viewToggleOptions}
              />
            </div>
            {renderModulesView()}
          </div>
        );

      case 'services':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-accent-gold">Development Services</h2>
              <ViewToggle
                currentView={servicesViewMode}
                onToggle={setServicesViewMode}
                options={viewToggleOptions.slice(0, 2)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-black/20 backdrop-blur-sm border border-accent-gold/20 rounded-xl p-4 hover:border-accent-gold/40 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-medium text-accent-gold">{service.name}</h3>
                    <span className={`w-3 h-3 rounded-full ${service.status === 'active' ? 'bg-green-400' : 'bg-gray-400'}`} />
                  </div>
                  <p className="text-brand-cream/70 text-sm mb-2">{service.description}</p>
                  <code className="text-accent-gold/60 text-xs font-mono bg-black/30 px-2 py-1 rounded">
                    {service.command}
                  </code>
                </div>
              ))}
            </div>
          </div>
        );

      case 'subagents':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-accent-gold">AI Sub-Agents</h2>
              <ViewToggle
                currentView={subagentsViewMode}
                onToggle={setSubagentsViewMode}
                options={viewToggleOptions.slice(0, 2)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subagents.map((agent) => (
                <div
                  key={agent.id}
                  className="bg-black/20 backdrop-blur-sm border border-accent-gold/20 rounded-xl p-4 hover:border-accent-gold/40 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-medium text-accent-gold">{agent.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      agent.status === 'active' ? 'bg-green-500/20 text-green-400' :
                      agent.status === 'maintenance' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {agent.status}
                    </span>
                  </div>
                  <p className="text-brand-cream/70 text-sm mb-2">{agent.description}</p>
                  <div className="text-xs text-accent-gold/60">{agent.type}</div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div>
            <h2 className="text-2xl font-bold text-accent-gold mb-6">System Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-500/10 to-green-600/20 border border-green-500/30 rounded-xl p-6">
                <h3 className="text-lg font-medium text-green-400 mb-2">System Status</h3>
                <p className="text-2xl font-bold text-green-300">Online</p>
                <p className="text-sm text-green-400/70">All systems operational</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/20 border border-blue-500/30 rounded-xl p-6">
                <h3 className="text-lg font-medium text-blue-400 mb-2">Active Modules</h3>
                <p className="text-2xl font-bold text-blue-300">{modules.length}</p>
                <p className="text-sm text-blue-400/70">Ready for deployment</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/20 border border-purple-500/30 rounded-xl p-6">
                <h3 className="text-lg font-medium text-purple-400 mb-2">MCP Servers</h3>
                <p className="text-2xl font-bold text-purple-300">25</p>
                <p className="text-sm text-purple-400/70">Connected and ready</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <SEO 
        title="Admin Panel - Disruptors Media"
        description="Administrative control panel"
        type="website"
        noindex={true}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-brand-charcoal via-gray-900 to-black text-brand-cream">
        <div className="flex h-screen">
          {/* Sidebar */}
          <div className="w-64 bg-black/30 backdrop-blur-sm border-r border-accent-gold/20 p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-accent-gold">Admin Panel</h1>
              <p className="text-sm text-brand-cream/60">Control Center</p>
            </div>
            
            <nav className="space-y-2">
              {[
                { id: 'dashboard', name: 'Dashboard', icon: '📊' },
                { id: 'modules', name: 'Site Modules', icon: '🧩' },
                { id: 'services', name: 'Dev Services', icon: '⚙️' },
                { id: 'subagents', name: 'Sub-Agents', icon: '🤖' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center space-x-3 ${
                    activeSection === item.id
                      ? 'bg-accent-gold/20 text-accent-gold border border-accent-gold/30'
                      : 'text-brand-cream/70 hover:text-brand-cream hover:bg-white/5'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8 overflow-y-auto">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </div>
        </div>

        {/* Module Detail Modal */}
        <AnimatePresence>
          {selectedModule && (
            <ModuleDetailModal
              module={selectedModule}
              isOpen={isModuleModalOpen}
              onClose={() => {
                setIsModuleModalOpen(false);
                setSelectedModule(null);
              }}
              onSave={handleModuleSave}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default SecretAdminPanel;