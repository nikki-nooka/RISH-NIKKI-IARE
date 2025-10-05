# OJAS: AI-Powered Environmental Health Intelligence

**A sophisticated web application that leverages Google's Gemini AI to provide real-time, location-based environmental health analysis and personalized health insights.**

---

## Team: [Your Team Name]
- [Your Name/Member 1]
- [Member 2]
- [Member 3]
- ...

## Problem Statement
*   **Information Gap:** Access to timely, understandable, and actionable environmental health data is a critical global challenge. Public health organizations and communities often struggle to link complex environmental factors (like pollution, climate, and geography) to specific, localized health risks.
*   **Reactive Healthcare:** This information gap fosters reactive healthcare systems that are forced to treat diseases *after* outbreaks occur, rather than preventing them in the first place.
*   **Lack of Empowerment:** Individuals and communities lack the tools to easily assess the potential health hazards in their immediate surroundings, preventing them from taking proactive, protective measures.
*   **The Need:** There is a pressing need for a tool that democratizes environmental intelligence, translating complex data into clear insights that empower proactive health decisions.

## Overview of Our Solution
OJAS is a cutting-edge web application that bridges the gap between environmental data and public health. It operates on a sophisticated, multi-layered architecture powered by **Google's Gemini AI models** and a modern **React/TypeScript** frontend.

Here’s a breakdown of how it works:

*   **AI Core Engine (Gemini API):**
    *   **Text & Multimodal Analysis:** We use the `gemini-2.5-flash` model as the primary engine for all analytical tasks. By enforcing a strict JSON output schema, we ensure that the AI's responses are consistently structured, reliable, and ready to be displayed in the UI.
    *   **Image Generation:** The `imagen-3.0-generate-002` model is leveraged to create realistic, satellite-style images for location analyses, providing immediate visual context to the data.

*   **User Interaction & Features:** The application offers two primary modes of interaction: a public-facing explorer and a feature-rich dashboard for authenticated users.

    1.  **Public Globe Explorer:**
        *   Users can visually explore a 3D globe and select any point on Earth for analysis.
        *   A `gemini-2.5-flash` prompt is generated with the precise coordinates, requesting an analysis of local geography and climate to identify potential health hazards (e.g., stagnant water, pollution indicators) and associated disease risks (e.g., Malaria, Dengue).
        *   Simultaneously, `imagen-3.0-generate-002` generates a visual representation of the selected location.
        *   The results are presented in a clear, actionable intelligence briefing.

    2.  **Authenticated User Dashboard:** After a secure login, users gain access to a suite of personalized health tools:
        *   **Environmental Image Analysis:** Users upload a photo of their surroundings. `gemini-2.5-flash` performs a multimodal analysis on the image content to identify and report on visible health hazards.
        *   **Prescription Analysis:** The AI performs OCR on an uploaded prescription image, interpreting handwriting and text to extract medicine names, dosages, and instructions into a simple summary.
        *   **Symptom Checker & Mental Wellness:** For these features, user input (text descriptions or questionnaire answers) is sent to `gemini-2.5-flash` with carefully crafted prompts that guide the AI to provide cautious, informational, and supportive feedback, always with a disclaimer to consult a professional.
        *   **AI Health Assistant:** A streaming chatbot provides real-time, conversational answers to health-related questions, enhancing user engagement and support.

*   **Data & Services:**
    *   **Location Intelligence:** The application uses Gemini for highly accurate geocoding (turning a search query like "Eiffel Tower" into coordinates) and for finding nearby medical facilities based on a given coordinate pair.
    *   **User Data:** User authentication is handled locally within the browser using `localStorage`. This is a simplified system for demonstration purposes. Activity history is also stored locally.

This combination of a highly interactive frontend and a powerful, versatile AI backend allows OJAS to deliver on its mission: transforming complex environmental data into accessible and actionable public health intelligence.

## Key Features
- **🌍 Interactive 3D Globe Explorer**: Click anywhere on a high-fidelity 3D globe or use the search function to initiate a detailed environmental health analysis for that specific location.
- **📸 AI Image Analysis**: Upload a photo of a local area (e.g., a neighborhood, park, or water source) to get an instant AI-driven report on potential health hazards, associated disease risks, and recommended precautions.
- **📜 Prescription Analysis**: Simply take a picture of a doctor's prescription, and our AI will transcribe the medicines, dosages, and instructions into a clear, easy-to-understand format.
- **🩺 AI Symptom Checker**: Describe your symptoms in natural language to receive a cautious, AI-generated analysis of potential conditions and recommended next steps. **(Note: Not a substitute for professional medical advice)**.
- **🧠 Mental Wellness Check-in**: Answer a short, confidential questionnaire to receive a supportive, non-clinical reflection on your mental well-being, including gentle observations and helpful coping strategies.
- **🤖 AI Health Assistant**: An integrated chatbot, powered by a specialized Gemini model, is available to answer your questions about diseases, symptoms, and prevention in a conversational way.
- **☀️ Daily Health Briefing**: Get a personalized daily health forecast based on your location, including analyses of air quality, pollen counts, UV index, and other environmental risk factors.
- **🏥 Nearby Facility Finder**: After an analysis, find nearby hospitals, clinics, and pharmacies with a single click, complete with distances and directions.

## Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS
- **AI & Machine Learning**: Google Gemini API (`gemini-2.5-flash`, `imagen-3.0-generate-002`)
- **3D Visualization**: `react-globe.gl`, `three.js`
- **Build Tool**: Vite

## Feasibility and Execution Plan
Our development and scaling strategy is designed as a phased rollout, ensuring a stable, user-centric product that can grow sustainably.

### Phase 1: Core Functionality & MVP (Complete)
This phase focused on establishing the core technical foundation and proving the concept's viability.
- **Features Implemented**: 3D Globe Explorer, multimodal analysis for environmental images and prescriptions, AI-powered Symptom and Mental Wellness checkers, secure user authentication, and a streaming AI Health Assistant.
- **Technical Validation**: The successful implementation of these features using a React frontend and the Gemini API backend confirms that the core architecture is robust, performant, and capable of delivering high-quality AI-driven insights.

### Phase 2: Public Health Integration & User Engagement (Next 6-12 Months)
With the core platform built, the next phase focuses on enhancing value for public health organizations and individual users.
- **Public Health Dashboards**: Develop aggregated, anonymized dashboards that allow health organizations to monitor environmental risk factors and health trends across specific regions.
- **Proactive Alert System**: Implement an opt-in system for push notifications or email alerts to warn users about emerging health risks in their registered location (e.g., high pollen counts, elevated air pollution).
- **Community Reporting Feature**: Enable users to submit geotagged images of potential public health hazards (e.g., illegal dumping, large areas of stagnant water), which can be flagged for review by local authorities.
- **AI Feedback Loop**: Integrate a system for users to provide feedback on the accuracy of AI analyses. This data will be used to iteratively refine prompts and improve the precision of the Gemini models over time.

### Phase 3: Platform Scaling & Predictive Analytics (12-24 Months)
This phase focuses on expanding the platform's capabilities and data sources to deliver predictive insights and broader accessibility.
- **Official Data Integration**: Integrate with official public health and environmental APIs (e.g., from WHO, CDC, local weather services) to enrich the AI's contextual understanding and improve the accuracy of its analyses and forecasts.
- **Predictive Modeling**: Leverage the accumulated anonymous data to develop predictive models that can forecast potential disease outbreak hotspots or high-risk periods with greater accuracy.
- **Native Mobile Applications**: Develop dedicated iOS and Android applications to provide a more seamless user experience, better performance, and deeper integration with device hardware (GPS, camera, offline access).
- **Enterprise & NGO Solutions**: Create a specialized version of OJAS for public health organizations, offering advanced analytics, custom reporting tools, and direct data integration capabilities.

### Technical Scalability
The application is architected for high scalability with minimal operational overhead.
- **Serverless AI**: The most computationally intensive tasks (analysis, image generation) are offloaded to Google's highly scalable Gemini API, eliminating the need for us to manage complex backend infrastructure.
- **Global Frontend Deployment**: The React frontend can be deployed globally via any modern Content Delivery Network (CDN), ensuring low-latency access for users anywhere in the world.
- **Authentication**: The current implementation uses a simplified `localStorage`-based system for user management. For a production environment, this would be replaced with a scalable, secure, dedicated external authentication service.

## Installation and Setup
Follow these steps to get a local copy of OJAS up and running.

**Prerequisites:**
- Node.js (v18 or later recommended)
- npm or yarn

**1. Clone the Repository**
```bash
git clone https://github.com/your-username/ojas.git
cd ojas
```

**2. Install Dependencies**
```bash
npm install
# or
yarn install
```

**3. Set Up Environment Variables**
OJAS requires a Google Gemini API key to function.

- Create a file named `.env` in the root of your project directory.
- Add your API key to this file:
  ```
  API_KEY=YOUR_GEMINI_API_KEY
  ```
- You can obtain a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

**4. Run the Development Server**
```bash
npm run dev
# or
yarn dev
```
The application should now be running on `http://localhost:5173`.

## Usage Guide
1.  **Homepage**: On the first visit, you'll see an intro animation. You can then explore the globe or sign up/log in.
2.  **Explore the Globe**: Click the "Explore Now" button. You can either click directly on the 3D globe or use the search bar to find a location. A detailed analysis panel will appear with hazards, potential diseases, and nearby health facilities.
3.  **Analyze an Image**: After logging in, select "Analyze Image". Upload a photo or use your camera to capture one. The AI will analyze it and produce a report.
4.  **Use Other Tools**: From the welcome dashboard, you can access the Prescription Analyzer, Symptom Checker, Mental Wellness Check-in, or your Daily Health Briefing. Follow the on-screen instructions for each tool.
5.  **Chat with the AI**: Click the chatbot icon in the bottom-right corner at any time to ask health-related questions.

## Demo
- **Live Demo Link**: [Insert Your Live Demo URL Here]
- **Video Walkthrough**: [Link to YouTube, Loom, or other video here]

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.