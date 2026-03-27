# AI Tools Documentation

This document details the AI-powered features integrated into the VANHSYA platform.

## 1. EligibilityBot (`/ai-tools/eligibility`)
- **Functionality**: Analyzes user profiles (age, education, experience) against complex visa criteria for multiple countries.
- **Implementation**: Uses a multi-step form state machine to calculate a "Success Probability" score.
- **Usage**: Users enter their details and receive an instant report on their best migration pathways.

## 2. Scam Detector (`/ai-tools/scam-detector`)
- **Functionality**: Protects users from common immigration fraud patterns.
- **Implementation**: Scans URLs, email headers, and company registration numbers against a known database of fraudulent entities.
- **Usage**: Users paste a website link or email to check for "Red Flags" before making payments to unknown consultants.

## 3. AI CV Builder (`/ai-innovations` & `/ai-tools/cv-builder`)
- **Functionality**: Creates migration-optimized resumes tailored for specific international markets.
- **Implementation**: Offers industry-specific templates (Tech, Executive, Healthcare) with AI-suggested content.
- **Usage**: Users select a template and follow prompts to build a resume that passes through Applicant Tracking Systems (ATS).

## 4. SOP Generator (`/ai-tools/sop-generator`)
- **Functionality**: Drafts professional Statements of Purpose for study and work visa applications.
- **Implementation**: Uses LLM-based logic (via API) to structure arguments and highlight key strengths.
- **Usage**: Users provide their goals and background, and the tool generates a high-quality draft SOP.

## 5. Embassy Alerts (`/ai-tools/embassy-alerts`)
- **Functionality**: Real-time monitoring of visa policy updates.
- **Implementation**: Aggregates official feeds from major global embassies.
- **Usage**: Users can subscribe to specific countries to get instant notifications on rule changes or draw updates.

## 6. Document Wizard (`/ai-tools/document-wizard`)
- **Functionality**: Generates dynamic checklists based on the specific visa subclass selected.
- **Implementation**: Conditional logic based on country-specific migration law databases.
- **Usage**: Users select their target visa and get a comprehensive, prioritized list of required paperwork.
