'use client';
import React, { useState } from 'react';
import { Play, Pause, Settings, Plus, Trash2, Clock, CheckCircle, AlertTriangle, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface Workflow {
  id: string;
  name: string;
  description: string;
  trigger: string;
  status: 'active' | 'paused' | 'draft';
  lastRun: string;
  executions: number;
  successRate: number;
  services: string[];
}

const WorkflowManager = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      id: '1',
      name: 'Project Status Reporting',
      description: 'Automatically generates weekly project status reports from SharePoint and Teams data',
      trigger: 'Schedule: Every Friday 4 PM',
      status: 'active',
      lastRun: '2 hours ago',
      executions: 47,
      successRate: 98.5,
      services: ['SharePoint', 'Teams', 'Power Automate', 'Outlook']
    },
    {
      id: '2', 
      name: 'New Employee Onboarding',
      description: 'Complete onboarding workflow including account creation, access provisioning, and welcome materials',
      trigger: 'Manual: HR Request',
      status: 'active',
      lastRun: '1 day ago',
      executions: 23,
      successRate: 100,
      services: ['Azure AD', 'SharePoint', 'Teams', 'Power Automate']
    },
    {
      id: '3',
      name: 'Meeting Scheduler & Follow-up',
      description: 'Finds optimal meeting times, books rooms, sends invites, and creates follow-up tasks',
      trigger: 'Email: Meeting Request',
      status: 'active',
      lastRun: '30 minutes ago',
      executions: 156,
      successRate: 94.2,
      services: ['Outlook', 'Exchange', 'Teams', 'ToDo']
    },
    {
      id: '4',
      name: 'Expense Report Processing',
      description: 'Automated expense report approval workflow with receipt verification',
      trigger: 'SharePoint: New Submission',
      status: 'paused',
      lastRun: '3 days ago',
      executions: 89,
      successRate: 96.8,
      services: ['SharePoint', 'Power Automate', 'Outlook', 'Azure AI']
    },
    {
      id: '5',
      name: 'Security Alert Response',
      description: 'Automated incident response for security alerts with stakeholder notifications',
      trigger: 'Security Center: Alert',
      status: 'draft',
      lastRun: 'Never',
      executions: 0,
      successRate: 0,
      services: ['Security Center', 'Teams', 'Power Automate']
    }
  ]);

  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  const toggleWorkflowStatus = (id: string) => {
    setWorkflows(workflows.map(workflow => 
      workflow.id === id 
        ? { 
            ...workflow, 
            status: workflow.status === 'active' ? 'paused' : 'active'
          }
        : workflow
    ));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'paused':
        return <Pause className="h-4 w-4 text-yellow-500" />;
      case 'draft':
        return <Clock className="h-4 w-4 text-gray-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  const handleUseTemplate = (template: any) => {
    setSelectedTemplate(template);
    setShowCreateDialog(true);
    
    // Simulate workflow creation process
    setTimeout(() => {
      const newWorkflow: Workflow = {
        id: (workflows.length + 1).toString(),
        name: template.name,
        description: template.description,
        trigger: template.trigger || 'Manual: User Request',
        status: 'draft',
        lastRun: 'Never',
        executions: 0,
        successRate: 0,
        services: template.services
      };
      
      setWorkflows(prev => [...prev, newWorkflow]);
      setShowCreateDialog(false);
      setSelectedTemplate(null);
    }, 3000);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Workflow Manager</h2>
          <p className="text-gray-600 mt-1">Manage and monitor your automation workflows</p>
        </div>
        <button 
          onClick={() => setShowCreateDialog(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Create Workflow</span>
        </button>
      </div>

      {/* Workflow Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-700">
                {workflows.filter(w => w.status === 'active').length}
              </div>
              <div className="text-sm text-green-600">Active Workflows</div>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-700">
                {workflows.reduce((sum, w) => sum + w.executions, 0)}
              </div>
              <div className="text-sm text-blue-600">Total Executions</div>
            </div>
            <Zap className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-700">
                {(workflows.reduce((sum, w) => sum + w.successRate, 0) / workflows.length).toFixed(1)}%
              </div>
              <div className="text-sm text-purple-600">Avg Success Rate</div>
            </div>
            <CheckCircle className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-orange-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-orange-700">
                {workflows.filter(w => w.status === 'paused').length}
              </div>
              <div className="text-sm text-orange-600">Paused Workflows</div>
            </div>
            <Pause className="h-8 w-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Workflow List */}
      <div className="space-y-4">
        {workflows.map((workflow, index) => (
          <motion.div
            key={workflow.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getStatusIcon(workflow.status)}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{workflow.name}</h3>
                  <p className="text-gray-600 text-sm">{workflow.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(workflow.status)}`}>
                  {workflow.status.charAt(0).toUpperCase() + workflow.status.slice(1)}
                </span>
                <button
                  onClick={() => toggleWorkflowStatus(workflow.id)}
                  className="p-2 text-gray-500 hover:text-gray-700"
                  disabled={workflow.status === 'draft'}
                >
                  {workflow.status === 'active' ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700">
                  <Settings className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-500 hover:text-red-500">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <div className="text-sm text-gray-500">Trigger</div>
                <div className="text-sm font-medium text-gray-900">{workflow.trigger}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Last Run</div>
                <div className="text-sm font-medium text-gray-900">{workflow.lastRun}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Executions</div>
                <div className="text-sm font-medium text-gray-900">{workflow.executions}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Success Rate</div>
                <div className="text-sm font-medium text-gray-900">{workflow.successRate}%</div>
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-500 mb-2">Connected Services</div>
              <div className="flex flex-wrap gap-2">
                {workflow.services.map((service, serviceIndex) => (
                  <span
                    key={serviceIndex}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* Progress Bar for Success Rate */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Success Rate</span>
                <span>{workflow.successRate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    workflow.successRate >= 95 ? 'bg-green-500' :
                    workflow.successRate >= 85 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${workflow.successRate}%` }}
                ></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Template Gallery */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Workflow Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: 'IT Help Desk Automation',
              description: 'Automatically route and escalate IT support tickets based on priority and category',
              services: ['Teams', 'SharePoint', 'Power Automate'],
              trigger: 'Forms: New Ticket Submission',
              estimatedTime: '2-3 hours setup'
            },
            {
              name: 'Document Approval Workflow', 
              description: 'Multi-stage document review and approval process with notifications',
              services: ['SharePoint', 'Outlook', 'Power Automate'],
              trigger: 'SharePoint: Document Upload',
              estimatedTime: '1-2 hours setup'
            },
            {
              name: 'Customer Feedback Processing',
              description: 'Analyze sentiment and route customer feedback to relevant teams automatically',
              services: ['Forms', 'Azure AI', 'Teams', 'Power Automate'],
              trigger: 'Forms: Customer Survey',
              estimatedTime: '3-4 hours setup'
            }
          ].map((template, index) => (
            <motion.div 
              key={index} 
              whileHover={{ scale: 1.02 }}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer"
            >
              <h4 className="font-medium text-gray-900 mb-2">{template.name}</h4>
              <p className="text-sm text-gray-600 mb-3">{template.description}</p>
              
              <div className="mb-3">
                <div className="text-xs text-gray-500 mb-2">Services Required:</div>
                <div className="flex flex-wrap gap-1">
                  {template.services.map((service, serviceIndex) => (
                    <span key={serviceIndex} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="text-xs text-gray-500 mb-3">
                <div>Trigger: {template.trigger}</div>
                <div>Setup Time: {template.estimatedTime}</div>
              </div>
              
              <button 
                onClick={() => handleUseTemplate(template)}
                className="w-full bg-blue-600 text-white text-sm py-2 rounded hover:bg-blue-700 transition-colors font-medium"
              >
                Use Template →
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Workflow Creation Dialog */}
      {showCreateDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {selectedTemplate ? `Creating: ${selectedTemplate.name}` : 'Creating New Workflow'}
            </h3>
            
            <div className="space-y-3 mb-6">
              {[
                { step: selectedTemplate ? 'Validating template configuration' : 'Initializing workflow builder', status: 'completed' },
                { step: 'Connecting to Microsoft services', status: 'completed' },
                { step: 'Setting up triggers and actions', status: 'processing' },
                { step: 'Testing workflow execution', status: 'pending' },
                { step: 'Deploying to production', status: 'pending' }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    item.status === 'completed' ? 'bg-green-500' :
                    item.status === 'processing' ? 'bg-blue-500 animate-pulse' :
                    'bg-gray-300'
                  }`}>
                    {item.status === 'completed' && (
                      <CheckCircle className="h-3 w-3 text-white" />
                    )}
                    {item.status === 'processing' && (
                      <div className="h-2 w-2 bg-white rounded-full animate-ping"></div>
                    )}
                  </div>
                  <span className={`text-sm ${
                    item.status === 'completed' ? 'text-green-700' :
                    item.status === 'processing' ? 'text-blue-700' :
                    'text-gray-500'
                  }`}>
                    {item.step}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="text-sm text-gray-600 mb-4">
              {selectedTemplate ? 
                `Setting up integrations for: ${selectedTemplate.services.join(', ')}` :
                'Configuring Microsoft Stack integrations...'
              }
            </div>
            
            <div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-700">
              <strong>Enterprise Features:</strong>
              <ul className="mt-1 space-y-1">
                <li>• Audit logging enabled</li>
                <li>• Role-based access controls</li>
                <li>• Error handling & notifications</li>
                <li>• Performance monitoring</li>
                <li>• Compliance tracking</li>
              </ul>
            </div>

            <button
              onClick={() => {
                setShowCreateDialog(false);
                setSelectedTemplate(null);
              }}
              className="mt-4 w-full bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default WorkflowManager;