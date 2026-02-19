
import { useState, type FC, type ChangeEvent } from 'react';
import { X, ChevronRight, ChevronLeft, Check, Upload } from 'lucide-react';

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubmissionModal: FC<SubmissionModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    framework: 'OpenClaw',
    description: '',
    cost: '0.01',
    latency: '500',
    success: '95'
  });

  if (!isOpen) return null;

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-gray-50/50">
          <div>
            <h2 className="text-xl font-bold text-primary">Submit Your Agent</h2>
            <p className="text-sm text-muted">Step {step} of 3</p>
          </div>
          <button onClick={onClose} className="text-muted hover:text-primary transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 min-h-[400px]">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-primary">Agent Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. CodeClaw Executor"
                  className="w-full bg-white border border-border rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-brand outline-none transition-all text-primary placeholder-muted"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-primary">Tagline (Short Summary)</label>
                <input
                  type="text"
                  name="tagline"
                  value={formData.tagline}
                  onChange={handleChange}
                  placeholder="The agent that ships PRs on autopilot."
                  className="w-full bg-white border border-border rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-brand outline-none transition-all text-primary placeholder-muted"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-primary">Framework</label>
                <select
                  name="framework"
                  value={formData.framework}
                  onChange={handleChange}
                  className="w-full bg-white border border-border rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-brand outline-none transition-all text-primary"
                >
                  <option>OpenClaw</option>
                  <option>CrewAI</option>
                  <option>LangChain</option>
                  <option>AutoGPT</option>
                  <option>Custom</option>
                </select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-primary">Avg. Success Rate (%)</label>
                  <input
                    type="number"
                    name="success"
                    value={formData.success}
                    onChange={handleChange}
                    className="w-full bg-white border border-border rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-brand outline-none transition-all text-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-primary">Avg. Latency (ms)</label>
                  <input
                    type="number"
                    name="latency"
                    value={formData.latency}
                    onChange={handleChange}
                    className="w-full bg-white border border-border rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-brand outline-none transition-all text-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-primary">Cost per Successful Task (USD)</label>
                <input
                  type="text"
                  name="cost"
                  value={formData.cost}
                  onChange={handleChange}
                  placeholder="0.01"
                  className="w-full bg-white border border-border rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-brand outline-none transition-all text-primary placeholder-muted"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-primary">Detailed Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-white border border-border rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-brand outline-none transition-all resize-none text-primary"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="p-8 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center text-center group hover:border-brand/50 transition-all cursor-pointer bg-gray-50/50">
                <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6 text-brand" />
                </div>
                <h4 className="font-bold mb-1 text-primary">Proof of Work</h4>
                <p className="text-sm text-muted mb-4">Upload a technical log (JSON) or a short screen recording of the agent in action.</p>
                <button className="bg-white border border-border hover:bg-gray-50 text-primary px-4 py-2 rounded-lg text-sm transition-all shadow-sm">
                  Browse Files
                </button>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-3">
                <Check className="w-5 h-5 text-blue-600 mt-0.5" />
                <p className="text-xs text-blue-700 leading-relaxed">
                  Agents with verified Proof of Work get featured 4x more often on the homepage and appear in the "Technical Specs" leaderboard.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border flex items-center justify-between bg-gray-50/50">
          <button
            onClick={prevStep}
            className={`flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors ${step === 1 ? 'invisible' : ''}`}
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>

          {step < 3 ? (
            <button
              onClick={nextStep}
              className="flex items-center gap-2 bg-brand hover:bg-brandHover text-white px-6 py-2 rounded-lg text-sm font-bold transition-all shadow-lg shadow-brand/20"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="bg-success hover:bg-green-600 text-white px-8 py-2 rounded-lg text-sm font-bold transition-all shadow-lg shadow-green-500/20"
            >
              Finish Submission
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmissionModal;
