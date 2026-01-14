import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Simulate Microsoft Graph API integration
    const isDemo = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
    
    if (isDemo) {
      const mockData = {
        analytics: {
          totalQueries: 1247,
          successRate: 97.8,
          avgResponseTime: 2.3,
          activeUsers: 156,
          totalWorkflows: 23,
          weeklyUsage: [
            { date: '2026-01-06', queries: 45, automations: 12, users: 23 },
            { date: '2026-01-07', queries: 67, automations: 18, users: 31 },
            { date: '2026-01-08', queries: 89, automations: 25, users: 42 },
            { date: '2026-01-09', queries: 123, automations: 31, users: 56 },
            { date: '2026-01-10', queries: 156, automations: 28, users: 48 },
            { date: '2026-01-11', queries: 34, automations: 8, users: 15 },
            { date: '2026-01-12', queries: 23, automations: 5, users: 12 }
          ],
          topWorkflows: [
            { name: 'Project Reports', executions: 156, successRate: 98.5 },
            { name: 'Meeting Scheduling', executions: 89, successRate: 94.2 },
            { name: 'Email Processing', executions: 67, successRate: 96.8 },
            { name: 'Onboarding', executions: 34, successRate: 100 }
          ]
        },
        services: {
          sharepoint: { status: 'connected', requests: 1234, latency: 45 },
          teams: { status: 'connected', requests: 897, latency: 32 },
          outlook: { status: 'connected', requests: 2156, latency: 28 },
          powerAutomate: { status: 'connected', requests: 445, latency: 67 },
          azureOpenAI: { status: 'connected', requests: 3422, latency: 156 },
          oneDrive: { status: 'connected', requests: 667, latency: 41 }
        },
        recentActivity: [
          { user: 'Gunjan Deshpande', action: 'Generated project status report', time: '2 minutes ago', type: 'query' },
          { user: 'John K', action: 'Scheduled team meeting', time: '5 minutes ago', type: 'workflow' },
          { user: 'Stuard Little', action: 'Processed expense reports', time: '12 minutes ago', type: 'workflow' },
          { user: 'Animesh Uttekar', action: 'Asked about quarterly metrics', time: '18 minutes ago', type: 'query' },
          { user: 'Sanjana Tyagi', action: 'Triggered onboarding workflow', time: '25 minutes ago', type: 'workflow' }
        ]
      };
      
      return NextResponse.json({
        success: true,
        data: mockData,
        timestamp: new Date().toISOString()
      });
    }

    // In production, this would fetch real data from Microsoft Graph
    // const graphClient = new GraphClient();
    // const data = await graphClient.getAnalytics();

    return NextResponse.json({
      success: false,
      error: 'Microsoft Graph integration not configured. Set NEXT_PUBLIC_DEMO_MODE=false and configure Microsoft 365 credentials.'
    });

  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}