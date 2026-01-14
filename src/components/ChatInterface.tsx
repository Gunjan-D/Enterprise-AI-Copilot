'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, Paperclip, Hexagon, User, Loader, CheckCircle, AlertCircle } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  status?: 'sending' | 'sent' | 'processing' | 'completed' | 'error';
  actions?: WorkflowAction[];
}

interface WorkflowAction {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  service: string;
}

interface ChatInterfaceProps {
  triggerQuery?: string;
  onQueryProcessed?: () => void;
}

const ChatInterface = ({ triggerQuery, onQueryProcessed }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    // Initialize with welcome message after client-side hydration
    setMessages([{
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your Enterprise AI Copilot. I can help you automate workflows, retrieve information from Microsoft 365, create reports, and much more. Try asking me to "Create a project status report" or "Summarize last week\'s Teams messages".',
      timestamp: new Date(),
      status: 'completed'
    }]);
  }, []);

  useEffect(() => {
    if (triggerQuery && triggerQuery.trim()) {
      setInputValue(triggerQuery);
      // Auto-submit the triggered query after a short delay
      setTimeout(() => {
        handleSendMessage(triggerQuery);
        onQueryProcessed?.();
      }, 500);
    }
  }, [triggerQuery]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const exampleQueries = [
    "Create a project status report for Q1",
    "Schedule a team meeting for next Tuesday",
    "Summarize last week's email threads",
    "Trigger onboarding checklist for new hire",
    "Generate expense report from last month",
    "Find available conference rooms today"
  ];

  const simulateAIResponse = async (userMessage: string): Promise<{ content: string; actions?: WorkflowAction[] }> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));

    const responses: { [key: string]: { content: string; actions?: WorkflowAction[] } } = {
      'project status report': {
        content: 'I\'ll create a comprehensive project status report for you. This will include data from SharePoint project sites, Teams conversations, and task completion rates.',
        actions: [
          {
            id: '1',
            title: 'Fetch SharePoint Data',
            description: 'Retrieving project data from SharePoint sites',
            status: 'completed',
            service: 'SharePoint'
          },
          {
            id: '2', 
            title: 'Analyze Teams Activity',
            description: 'Processing Teams messages and meeting data',
            status: 'completed',
            service: 'Microsoft Teams'
          },
          {
            id: '3',
            title: 'Generate Report',
            description: 'Creating formatted project status report',
            status: 'completed',
            service: 'Power Automate'
          }
        ]
      },
      'team meeting': {
        content: 'I\'ll help you schedule a team meeting. Let me check everyone\'s calendar availability and find the optimal time slot.',
        actions: [
          {
            id: '1',
            title: 'Check Calendars',
            description: 'Analyzing team member availability',
            status: 'completed',
            service: 'Outlook'
          },
          {
            id: '2',
            title: 'Book Conference Room',
            description: 'Reserving Conference Room A for Tuesday 2PM',
            status: 'completed',
            service: 'Exchange'
          },
          {
            id: '3',
            title: 'Send Invitations',
            description: 'Meeting invites sent to all team members',
            status: 'completed',
            service: 'Outlook'
          }
        ]
      },
      'email': {
        content: 'I\'ve analyzed your email threads from last week. Here\'s a summary of the key discussions and action items.',
        actions: [
          {
            id: '1',
            title: 'Scan Email Threads',
            description: 'Processing 47 email conversations',
            status: 'completed',
            service: 'Outlook'
          },
          {
            id: '2',
            title: 'Extract Action Items',
            description: 'Identified 12 pending action items',
            status: 'completed',
            service: 'Azure AI'
          },
          {
            id: '3',
            title: 'Generate Summary',
            description: 'Created executive summary document',
            status: 'completed',
            service: 'Word Online'
          }
        ]
      },
      'onboarding': {
        content: 'I\'ve triggered the complete onboarding workflow for the new hire. All necessary accounts, access permissions, and welcome materials are being prepared.',
        actions: [
          {
            id: '1',
            title: 'Create User Account',
            description: 'Setting up Azure AD account and licenses',
            status: 'completed',
            service: 'Azure AD'
          },
          {
            id: '2',
            title: 'Assign Permissions',
            description: 'Configuring role-based access controls',
            status: 'completed',
            service: 'Azure AD'
          },
          {
            id: '3',
            title: 'Send Welcome Package',
            description: 'Welcome email and handbook sent',
            status: 'completed',
            service: 'Power Automate'
          }
        ]
      }
    };

    // Find matching response
    const key = Object.keys(responses).find(k => 
      userMessage.toLowerCase().includes(k)
    );
    
    if (key) {
      return responses[key];
    }

    return {
      content: `I understand you're asking about "${userMessage}". While I'm currently in demo mode, in a production environment I would:\n\n• Connect to your Azure OpenAI service\n• Process your request using Microsoft Graph APIs\n• Execute workflows through Power Automate\n• Integrate with Teams, SharePoint, and Outlook\n• Provide real-time updates and results\n\nTry asking about project reports, meeting scheduling, or workflow automation!`
    };
  };

  const handleSendMessage = async (messageText?: string) => {
    const messageToSend = messageText || inputValue;
    if (!messageToSend.trim() || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageToSend,
      timestamp: new Date(),
      status: 'sent'
    };

    const processingMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: 'Processing your request...',
      timestamp: new Date(),
      status: 'processing'
    };

    setMessages(prev => [...prev, userMessage, processingMessage]);
    if (!messageText) setInputValue('');
    setIsProcessing(true);

    try {
      const response = await simulateAIResponse(messageToSend);
      
      // Update the processing message with the actual response
      setMessages(prev => prev.map(msg => 
        msg.id === processingMessage.id 
          ? { 
              ...msg, 
              content: response.content,
              status: 'completed',
              actions: response.actions
            }
          : msg
      ));

    } catch (error) {
      setMessages(prev => prev.map(msg => 
        msg.id === processingMessage.id 
          ? { 
              ...msg, 
              content: 'Sorry, I encountered an error processing your request. Please try again.',
              status: 'error'
            }
          : msg
      ));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const StatusIcon = ({ status }: { status?: string }) => {
    switch (status) {
      case 'processing':
        return <Loader className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-[600px]">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex items-start space-x-3 ${
                message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                message.type === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
              }`}>
                {message.type === 'user' ? (
                  <User className="h-4 w-4 hover:text-blue-500 transition-colors duration-200" />
                ) : (
                  <div className="relative group">
                    <Hexagon className="h-4 w-4 fill-current text-blue-400 drop-shadow-sm transform transition-all duration-500 group-hover:rotate-90 group-hover:scale-110 animate-pulse" style={{animationDuration: '2s'}} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-1 h-1 bg-gradient-to-r from-cyan-300 to-blue-400 rounded-full animate-spin" style={{animationDuration: '3s'}}></div>
                      <div className="absolute w-2 h-2 bg-gradient-to-r from-blue-300/20 to-cyan-300/20 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className={`flex-1 max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl ${
                message.type === 'user' ? 'text-right' : 'text-left'
              }`}>
                <div className={`rounded-lg px-4 py-2 ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs opacity-75" suppressHydrationWarning>
                      {isClient ? message.timestamp.toLocaleTimeString() : ''}
                    </span>
                    <StatusIcon status={message.status} />
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                
                {/* Workflow Actions */}
                {message.actions && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 space-y-2"
                  >
                    {message.actions.map((action) => (
                      <div key={action.id} className="bg-white border rounded-lg p-3 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-2 h-2 rounded-full ${
                              action.status === 'completed' ? 'bg-green-500' :
                              action.status === 'failed' ? 'bg-red-500' : 'bg-yellow-500'
                            }`}></div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{action.title}</div>
                              <div className="text-xs text-gray-500">{action.description}</div>
                            </div>
                          </div>
                          <div className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                            {action.service}
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Example Queries */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <p className="text-sm text-gray-600 mb-2">Try these example queries:</p>
        <div className="flex flex-wrap gap-2">
          {exampleQueries.map((query, index) => (
            <button
              key={index}
              onClick={() => {setInputValue(query); handleSendMessage(query);}}
              className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1 hover:bg-blue-50 hover:border-blue-300 text-gray-700 transition-colors"
            >
              {query}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me to automate a workflow, create a report, or help with Microsoft 365..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={1}
              disabled={isProcessing}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isProcessing}
            className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? <Loader className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;