// import React from 'react'
// import SimpleBarChart from '@/components/chart/bar'
// import StudentRegistrationPieChart from '@/components/chart/students_registered'
// import StudentReviewBarChart from '@/components/chart/review_completed'

// function Analytics() {
//   return (
//     <div>
//        <SimpleBarChart/>
//        <StudentRegistrationPieChart/>
//        <StudentReviewBarChart/>
//     </div>
//   )
// }

// export default Analytics


import React from 'react';
import StudentRegistrationPieChart from '@/components/chart/students_registered';
import StudentReviewBarChart from '@/components/chart/review_completed';
import GuidesAllocationPieChart from '@/components/chart/guides_allocated';

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
      <div>
        <h2>Pie Chart: Guides Allocation Status</h2>
        <GuidesAllocationPieChart />
      </div>
    </div>
  );
}

export default Analytics;
