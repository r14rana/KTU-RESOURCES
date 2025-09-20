// src/app/config/site.ts
export const BRANCHES: { slug: string; name: string }[] = [
  { slug: 'electronics', name: 'Electronics & Communication' },
  { slug: 'electrical',  name: 'Electrical' },
  { slug: 'aiml',        name: 'AI/ML' },
  { slug: 'datascience', name: 'Data Science' },
  { slug: 'cybersecurity', name: 'Cybersecurity' },
  { slug: 'civil',       name: 'Civil' },
  { slug: 'mechanical',  name: 'Mechanical' },
];

export const SEMESTERS = Array.from({ length: 8 }, (_, i) => i + 1);

export const CATEGORIES = [
  { key: 'notes',    label: 'Notes' },
  { key: 'question', label: 'Question Papers' },
  { key: 'solution', label: 'Solved Papers' },
  { key: 'syllabus', label: 'Syllabus' },
  { key: 'lab',      label: 'Lab' },
] as const;
export type CategoryKey = typeof CATEGORIES[number]['key'];
