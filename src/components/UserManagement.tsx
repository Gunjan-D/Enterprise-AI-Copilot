'use client';
import React, { useState } from 'react';
import { Users, Plus, Search, Mail, Phone, Calendar, Shield, Settings, MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  lastActive: string;
  queriesCount: number;
  status: 'active' | 'inactive' | 'pending';
  avatar: string;
}

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Gunjan Deshpande',
      email: 'gunjan.deshpande@company.com',
      role: 'Project Manager',
      department: 'Engineering',
      lastActive: '5 minutes ago',
      queriesCount: 45,
      status: 'active',
      avatar: 'GD'
    },
    {
      id: '2',
      name: 'John K',
      email: 'john.k@company.com',
      role: 'Developer',
      department: 'Engineering',
      lastActive: '2 hours ago',
      queriesCount: 67,
      status: 'active',
      avatar: 'JK'
    },
    {
      id: '3',
      name: 'Stuard Little',
      email: 'stuard.little@company.com',
      role: 'HR Manager',
      department: 'Human Resources',
      lastActive: '1 day ago',
      queriesCount: 23,
      status: 'active',
      avatar: 'SL'
    },
    {
      id: '4',
      name: 'Animesh Uttekar',
      email: 'animesh.uttekar@company.com',
      role: 'Marketing Lead',
      department: 'Marketing',
      lastActive: '3 days ago',
      queriesCount: 12,
      status: 'inactive',
      avatar: 'AU'
    },
    {
      id: '5',
      name: 'Sanjana Tyagi',
      email: 'sanjana.tyagi@company.com',
      role: 'Finance Analyst',
      department: 'Finance',
      lastActive: 'Never',
      queriesCount: 0,
      status: 'pending',
      avatar: 'ST'
    }
  ]);

  const roles = ['all', 'Project Manager', 'Developer', 'HR Manager', 'Marketing Lead', 'Finance Analyst'];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  const userStats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    pending: users.filter(u => u.status === 'pending').length,
    totalQueries: users.reduce((sum, u) => sum + u.queriesCount, 0)
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
          <p className="text-gray-600 mt-1">Manage users and their access to the AI Copilot</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Invite User</span>
        </button>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-700">{userStats.total}</div>
              <div className="text-sm text-blue-600">Total Users</div>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-700">{userStats.active}</div>
              <div className="text-sm text-green-600">Active Users</div>
            </div>
            <Shield className="h-8 w-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-yellow-700">{userStats.pending}</div>
              <div className="text-sm text-yellow-600">Pending Invites</div>
            </div>
            <Calendar className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-700">{userStats.totalQueries}</div>
              <div className="text-sm text-purple-600">Total Queries</div>
            </div>
            <Mail className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {roles.map(role => (
              <option key={role} value={role}>
                {role === 'all' ? 'All Roles' : role}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* User List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-900">User</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Role</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Department</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Last Active</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Queries</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                        {user.avatar}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900">{user.role}</td>
                  <td className="py-4 px-4 text-sm text-gray-900">{user.department}</td>
                  <td className="py-4 px-4 text-sm text-gray-500">{user.lastActive}</td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {user.queriesCount}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-500 hover:text-blue-600" title="Send email">
                        <Mail className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-green-600" title="Call user">
                        <Phone className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-purple-600" title="Settings">
                        <Settings className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-gray-700" title="More options">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent User Activity */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent User Activity</h3>
        <div className="space-y-4">
          {[
            { user: 'Gunjan Deshpande', action: 'Generated project status report', time: '5 minutes ago', type: 'query' },
            { user: 'John K', action: 'Scheduled team meeting', time: '12 minutes ago', type: 'workflow' },
            { user: 'Stuard Little', action: 'Processed expense reports', time: '1 hour ago', type: 'workflow' },
            { user: 'Animesh Uttekar', action: 'Asked about quarterly metrics', time: '2 hours ago', type: 'query' },
            { user: 'Sanjana Tyagi', action: 'Accepted invitation', time: '1 day ago', type: 'system' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'query' ? 'bg-blue-500' :
                  activity.type === 'workflow' ? 'bg-green-500' : 'bg-gray-500'
                }`}></div>
                <div>
                  <span className="font-medium text-gray-900">{activity.user}</span>
                  <span className="text-gray-600"> {activity.action}</span>
                </div>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;