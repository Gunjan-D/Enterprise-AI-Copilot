'use client';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Zap, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const AnalyticsDashboard = () => {
  const usageData = [
    { name: 'Mon', queries: 45, automations: 12, users: 23 },
    { name: 'Tue', queries: 67, automations: 18, users: 31 },
    { name: 'Wed', queries: 89, automations: 25, users: 42 },
    { name: 'Thu', queries: 123, automations: 31, users: 56 },
    { name: 'Fri', queries: 156, automations: 28, users: 48 },
    { name: 'Sat', queries: 34, automations: 8, users: 15 },
    { name: 'Sun', queries: 23, automations: 5, users: 12 }
  ];

  const workflowData = [
    { name: 'Project Reports', value: 35, color: '#3B82F6' },
    { name: 'Meeting Scheduling', value: 28, color: '#10B981' },
    { name: 'Email Processing', value: 22, color: '#8B5CF6' },
    { name: 'Onboarding', value: 15, color: '#F59E0B' }
  ];

  const performanceMetrics = [
    { 
      title: 'Average Response Time',
      value: '2.3s',
      change: '-12%',
      trend: 'down',
      icon: Clock,
      color: 'text-green-600'
    },
    {
      title: 'Success Rate',
      value: '97.8%',
      change: '+2.1%',
      trend: 'up',
      icon: CheckCircle,
      color: 'text-blue-600'
    },
    {
      title: 'Active Users',
      value: '156',
      change: '+23%',
      trend: 'up',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: 'Workflows Automated',
      value: '1,247',
      change: '+45%',
      trend: 'up',
      icon: Zap,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Icon className={`h-5 w-5 ${metric.color}`} />
                <span className={`text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
              <div className="text-sm text-gray-600">{metric.title}</div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Usage Trends */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Weekly Usage Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="queries" stroke="#3B82F6" strokeWidth={2} />
              <Line type="monotone" dataKey="automations" stroke="#10B981" strokeWidth={2} />
              <Line type="monotone" dataKey="users" stroke="#8B5CF6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Queries</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Automations</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Users</span>
            </div>
          </div>
        </div>

        {/* Workflow Distribution */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Popular Workflows
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={workflowData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name} ${value}%`}
              >
                {workflowData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Service Integration Status */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Microsoft 365 Integration Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { service: 'SharePoint Online', status: 'Connected', requests: '1,234', latency: '45ms' },
            { service: 'Microsoft Teams', status: 'Connected', requests: '897', latency: '32ms' },
            { service: 'Outlook/Exchange', status: 'Connected', requests: '2,156', latency: '28ms' },
            { service: 'Power Automate', status: 'Connected', requests: '445', latency: '67ms' },
            { service: 'Azure OpenAI', status: 'Connected', requests: '3,422', latency: '156ms' },
            { service: 'OneDrive for Business', status: 'Connected', requests: '667', latency: '41ms' }
          ].map((service, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">{service.service}</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {service.status}
                </span>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <div>Requests: {service.requests}/day</div>
                <div>Avg Latency: {service.latency}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { time: '2 minutes ago', user: 'Sarah Johnson', action: 'Generated project status report', status: 'completed' },
            { time: '5 minutes ago', user: 'Mike Chen', action: 'Scheduled team meeting for tomorrow', status: 'completed' },
            { time: '12 minutes ago', user: 'Emma Davis', action: 'Processed expense report workflow', status: 'completed' },
            { time: '18 minutes ago', user: 'David Wilson', action: 'Triggered new employee onboarding', status: 'in-progress' },
            { time: '25 minutes ago', user: 'Lisa Rodriguez', action: 'Created meeting summary from Teams', status: 'completed' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                }`}></div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{activity.user}</div>
                  <div className="text-sm text-gray-600">{activity.action}</div>
                </div>
              </div>
              <div className="text-xs text-gray-500">{activity.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;