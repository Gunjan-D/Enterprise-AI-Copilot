'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Hexagon, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  Users, 
  FileText,
  Calendar,
  Mail,
  CheckCircle,
  Clock,
  TrendingUp,
  Shield,
  Zap
} from 'lucide-react';
import ChatInterface from './ChatInterface';
import AnalyticsDashboard from './AnalyticsDashboard';
import WorkflowManager from './WorkflowManager';
import UserManagement from './UserManagement';

const CopilotDashboard = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [triggerQuery, setTriggerQuery] = useState<string>('');
  const [stats, setStats] = useState({
    totalQueries: 1247,
    activeWorkflows: 23,
    automationsSaved: 89
  });

  const tabs = [
    { id: 'chat', label: 'AI Copilot', icon: MessageSquare },
    { id: 'workflows', label: 'Workflows', icon: Zap },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
  ];

  const quickActions = [
    { 
      title: 'Create Project Report', 
      description: 'Generate comprehensive project status reports',
      icon: FileText,
      color: 'bg-blue-500',
      query: 'Create a comprehensive project status report for Q1 2026 including timeline, milestones, resource allocation, and risk assessment'
    },
    { 
      title: 'Schedule Team Meeting', 
      description: 'Find optimal times and send invites',
      icon: Calendar,
      color: 'bg-green-500',
      query: 'Schedule a team meeting for next Tuesday afternoon, check everyone\'s calendar availability and book Conference Room A'
    },
    { 
      title: 'Email Digest', 
      description: 'Summarize important communications',
      icon: Mail,
      color: 'bg-purple-500',
      query: 'Summarize last week\'s important email threads and extract action items with priority levels'
    },
    { 
      title: 'Onboard New Employee', 
      description: 'Trigger complete onboarding workflow',
      icon: Users,
      color: 'bg-orange-500',
      query: 'Trigger complete onboarding workflow for new hire including account setup, access permissions, and welcome materials'
    }
  ];

  const handleQuickAction = (action: any) => {
    setActiveTab('chat');
    setTriggerQuery(action.query);
    // Update stats to show activity
    setStats(prev => ({
      ...prev,
      totalQueries: prev.totalQueries + 1
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="relative group cursor-pointer">
                <div className="relative p-3 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 rounded-xl shadow-2xl border border-slate-600/30 backdrop-blur-sm transform transition-all duration-500 hover:scale-110 hover:rotate-6 group-hover:shadow-3xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-cyan-500/10 rounded-xl animate-pulse"></div>
                  <Hexagon className="h-8 w-8 text-white fill-current relative z-10 drop-shadow-lg transform transition-all duration-700 group-hover:rotate-180 animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}} />
                  <div className="absolute inset-0 p-3 flex items-center justify-center z-20">
                    <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 rounded-full shadow-lg animate-spin" style={{animationDuration: '2s'}}></div>
                    <div className="absolute w-5 h-5 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                    <div className="absolute w-7 h-7 bg-gradient-to-r from-purple-400/10 to-cyan-400/10 rounded-full animate-pulse" style={{animationDelay: '1s', animationDuration: '1.5s'}}></div>
                  </div>
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-75 animate-pulse group-hover:opacity-100 transition-opacity duration-300" style={{animationDuration: '2.5s'}}></div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-xl blur-sm opacity-0 group-hover:opacity-60 transition-all duration-500 animate-ping" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent hover:from-blue-600 hover:to-purple-600 transition-all duration-500 cursor-pointer">Enterprise AI Copilot</h1>
                <p className="text-sm text-slate-500 font-medium hover:text-blue-500 transition-colors duration-300 cursor-pointer">Microsoft Stack Workflow Automation</p>
              </div>
            </div>
            
            {/* Real-time Stats */}
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">{stats.totalQueries}</div>
                <div className="text-xs text-gray-500">Total Queries</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-green-600">{stats.activeWorkflows}</div>
                <div className="text-xs text-gray-500">Active Workflows</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-purple-600">{stats.automationsSaved}</div>
                <div className="text-xs text-gray-500">Automations Saved</div>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick Actions - Show only on chat tab */}
        {activeTab === 'chat' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleQuickAction(action)}
                    className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer hover:border-blue-300"
                  >
                    <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-3`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">{action.title}</h4>
                    <p className="text-sm text-gray-600">{action.description}</p>
                    <div className="mt-3 text-xs text-blue-600 font-medium">Click to execute →</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {activeTab === 'chat' && <ChatInterface triggerQuery={triggerQuery} onQueryProcessed={() => setTriggerQuery('')} />}
          {activeTab === 'workflows' && <WorkflowManager />}
          {activeTab === 'analytics' && <AnalyticsDashboard />}
          {activeTab === 'users' && <UserManagement />}
        </div>
      </div>

      {/* Status Bar */}
      <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-3 flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <Shield className="h-4 w-4 text-green-500" />
          <span className="text-sm text-gray-600">Secure</span>
        </div>
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-4 w-4 text-blue-500" />
          <span className="text-sm text-gray-600">Azure Connected</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-purple-500" />
          <span className="text-sm text-gray-600">Real-time</span>
        </div>
      </div>
    </div>
  );
};

export default CopilotDashboard;