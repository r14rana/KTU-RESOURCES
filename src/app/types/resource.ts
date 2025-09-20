export type Category = 'notes' | 'question' | 'solution' | 'syllabus' | 'lab';


export interface Resource {
id: string;
title: string;
branch: string; // e.g., "electronics", "mechanical"
semester: number; // 1..8 (or more)
subject: string;
category: Category;
tags: string[];
file_url: string;
}