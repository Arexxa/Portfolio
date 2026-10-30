import type { AboutContent } from '@/types/content'

/** CUSTOMIZE: bio, quick facts, education and certifications. */
export const about: AboutContent = {
  summary: [
    'I am a Software Developer based in Kuala Lumpur, Malaysia with a full-stack background primarily in Frontend technologies like React, Next.js, Vue, and data engineering.',
    'My work moves between polished interfaces and the pipelines behind them: reusable component systems, REST integrations, ETL workflows and MSSQL/MySQL design for enterprise teams.',
    'I enjoy collaborating with designers, stakeholders and fellow engineers to turn business requirements into maintainable, well-documented software.',
  ],
  facts: [
    { label: 'Based in', value: 'Kuala Lumpur, Malaysia' },
    { label: 'Current role', value: 'Senior Software Developer' },
    { label: 'Focus', value: 'Full-stack web, ETL and data integration' },
    { label: 'Also into', value: 'Web3, WebGL and machine learning' },
  ],
  education: [
    {
      degree: 'Bachelor of Information Technology (Hons.) in Intelligent Systems Engineering',
      school: 'Universiti Teknologi MARA (UiTM) Shah Alam',
      period: '2020 - 2022',
      result: "CGPA 3.72, Dean's List and Vice Chancellor's Awards",
    },
    {
      degree: 'Diploma in Computer Science and Mathematics',
      school: 'Universiti Teknologi MARA (UiTM) Segamat',
      period: '2017 - 2019',
      result: "CGPA 3.71, Dean's List and Vice Chancellor's Awards",
    },
  ],
  certifications: [
    {
      name: 'AWS Certified Solutions Architect - Associate',
      issuer: 'Amazon Web Services',
      year: '2024',
    },
  ],
}
