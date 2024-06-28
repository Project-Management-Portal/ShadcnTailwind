import React from 'react';
import StudentRegistrationPieChart from '@/components/chart/students_registered';
import StudentReviewBarChart from '@/components/chart/review_completed';
import GuidesAllocationPieChart from '@/components/chart/guides_allocated';
import TitleAcceptedPieChart from '@/components/chart/project_title';
import DomainCountBarChart from '@/components/chart/domain_count';
import GuidesProjectsBarChart from '@/components/chart/GuidesProjectsBarChart'; 
import ReviewAssignmentBarChart from '@/components/chart/ReviewersAllocationBarChart'; 
import SponsorshipStatusPieChart from '@/components/chart/sponsorship_status'; 

function Analytics() {
  return (
    <div>
      {/* First row */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div style={{ flex: 1 }}>
          <h2>Pie Chart: Student Registration</h2>
          <StudentRegistrationPieChart />
        </div>
        <div style={{ flex: 1 }}>
          <h2>Bar Chart: Student Review Completion</h2>
          <StudentReviewBarChart />
        </div>
      </div>

      {/* Second row */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div style={{ flex: 1 }}>
          <h2>Pie Chart: Guides Allocation Status</h2>
          <GuidesAllocationPieChart />
        </div>
        <div style={{ flex: 1 }}>
          <h2>Pie Chart: Title Accepted or Not</h2>
          <TitleAcceptedPieChart />
        </div>
      </div>

      {/* Third row */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div style={{ flex: 1 }}>
          <h2>Bar Chart: Domain Count</h2>
          <DomainCountBarChart />
        </div>
        <div style={{ flex: 1 }}>
          <h2>Bar Chart: Projects Assigned to Each Guide</h2>
          <GuidesProjectsBarChart />
        </div>
      </div>

      {/* Fourth row */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div style={{ flex: 1 }}>
          <h2>Bar Chart: Review Assignment Status</h2>
          <ReviewAssignmentBarChart />
        </div>
        <div style={{ flex: 1 }}>
          <h2>Pie Chart: Sponsorship Status</h2>
          <SponsorshipStatusPieChart />
        </div>
      </div>
    </div>
  );
}

export default Analytics;
