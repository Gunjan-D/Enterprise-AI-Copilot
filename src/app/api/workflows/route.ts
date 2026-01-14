import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const isDemo = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
    
    if (isDemo) {
      const mockWorkflows = [
        {
          id: '1',
          name: 'Project Status Reporting',
          description: 'Automatically generates weekly project status reports from SharePoint and Teams data',
          trigger: 'Schedule: Every Friday 4 PM',
          status: 'active',
          lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
          executions: 47,
          successRate: 98.5,
          services: ['SharePoint', 'Teams', 'Power Automate', 'Outlook']
        },
        {
          id: '2',
          name: 'New Employee Onboarding',
          description: 'Complete onboarding workflow including account creation and access provisioning',
          trigger: 'Manual: HR Request',
          status: 'active',
          lastRun: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
          executions: 23,
          successRate: 100,
          services: ['Azure AD', 'SharePoint', 'Teams', 'Power Automate']
        },
        {
          id: '3',
          name: 'Meeting Scheduler & Follow-up',
          description: 'Finds optimal meeting times and creates follow-up tasks',
          trigger: 'Email: Meeting Request',
          status: 'active',
          lastRun: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
          executions: 156,
          successRate: 94.2,
          services: ['Outlook', 'Exchange', 'Teams', 'ToDo']
        }
      ];
      
      return NextResponse.json({
        success: true,
        workflows: mockWorkflows,
        stats: {
          total: mockWorkflows.length,
          active: mockWorkflows.filter(w => w.status === 'active').length,
          totalExecutions: mockWorkflows.reduce((sum, w) => sum + w.executions, 0),
          avgSuccessRate: mockWorkflows.reduce((sum, w) => sum + w.successRate, 0) / mockWorkflows.length
        }
      });
    }

    // In production, this would connect to Power Automate
    return NextResponse.json({
      success: false,
      error: 'Power Automate integration not configured'
    });

  } catch (error) {
    console.error('Workflows API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action, workflowId } = await request.json();
    
    // Simulate workflow actions (start, stop, etc.)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return NextResponse.json({
      success: true,
      message: `Workflow ${action} completed successfully`,
      workflowId,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Workflow action error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}