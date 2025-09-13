


import React, { useState, useEffect } from 'react';
import { HomePage } from './components/HomePage';
import { WelcomePage } from './components/WelcomePage';
import { GlobePage } from './components/GlobePage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { ChatBot } from './components/ChatBot';
import { ImageAnalysisPage } from './components/ImageAnalysisPage';
import { CheckupPage } from './components/CheckupPage';
import { PrescriptionAnalysisPage } from './components/PrescriptionAnalysisPage';
import { IntroAnimation } from './components/IntroAnimation';
import { MentalHealthPage } from './components/MentalHealthPage';
import { SymptomCheckerPage } from './components/SymptomCheckerPage';
import { AuthPage } from './components/AuthPage';
import { ActivityHistoryPage } from './components/ActivityHistoryPage';
import type { User, ActivityLogItem, Page } from './types';
import { HealthForecast } from './components/HealthForecast';
import { AdminDashboardPage } from './components/AdminDashboardPage';
import { ProfilePage } from './components/ProfilePage';
import { Sidebar } from './components/Sidebar';
import { AlertsPage } from './components/AlertsPage';

const ACTIVITY_HISTORY_KEY = 'geosick_activity_history';
const GLOBAL_ACTIVITY_HISTORY_KEY = 'geosick_global_activity_history';
const USERS_KEY = 'geosick_users';
const SESSION_KEY = 'geosick_session_phone';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [showIntro, setShowIntro] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [activityHistory, setActivityHistory] = useState<ActivityLogItem[]>([]);

  useEffect(() => {
      // Check for a logged-in user in localStorage
      const checkSession = () => {
          try {
              const loggedInUserPhone = localStorage.getItem(SESSION_KEY);
              if (loggedInUserPhone) {
                  const allUsers: any[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
                  const currentUser = allUsers.find(u => u.phone === loggedInUserPhone);
                  if (currentUser) {
                      // Don't store password in the user state
                      const { password, ...userDetails } = currentUser;
                      setUser(userDetails);
                      setCurrentPage('welcome');
                  } else {
                      // Session phone exists but user doesn't, clean up
                      localStorage.removeItem(SESSION_KEY);
                  }
              }
          } catch (error) {
              console.error("Session validation failed:", error);
              localStorage.removeItem(SESSION_KEY);
          }
      };

      checkSession();
      
      // Load personal activity history
      try {
        const storedHistory = localStorage.getItem(ACTIVITY_HISTORY_KEY);
        if (storedHistory) {
            setActivityHistory(JSON.parse(storedHistory));
        }
      } catch (error) {
          console.error("Could not load activity history from localStorage:", error);
          localStorage.removeItem(ACTIVITY_HISTORY_KEY);
      }
  }, []);

  const addGlobalActivityToHistory = (item: ActivityLogItem) => {
      try {
          const globalHistory: ActivityLogItem[] = JSON.parse(localStorage.getItem(GLOBAL_ACTIVITY_HISTORY_KEY) || '[]');
          const newGlobalHistory = [item, ...globalHistory];
          localStorage.setItem(GLOBAL_ACTIVITY_HISTORY_KEY, JSON.stringify(newGlobalHistory));
      } catch (error) {
           console.error("Could not save global activity to localStorage:", error);
      }
  };

  const addActivityToHistory = (item: Omit<ActivityLogItem, 'id' | 'timestamp' | 'userPhone'>) => {
      if (!user) return;
      const newActivity: ActivityLogItem = {
          ...item,
          id: new Date().toISOString() + Math.random(),
          timestamp: Date.now(),
          userPhone: user.phone,
      };

      // Set personal history
      setActivityHistory(prevHistory => {
          const newHistory = [newActivity, ...prevHistory];
          try {
            localStorage.setItem(ACTIVITY_HISTORY_KEY, JSON.stringify(newHistory));
          } catch (error) {
              console.error("Could not save activity history to localStorage:", error);
          }
          return newHistory;
      });

      // Also log to global history
      addGlobalActivityToHistory(newActivity);
  };

  const handleAuthSuccess = (newUser: User) => {
    setUser(newUser);
    setShowAuth(false);
    setCurrentPage('welcome');
    localStorage.setItem(SESSION_KEY, newUser.phone);

    // Log the login event to global history
    addGlobalActivityToHistory({
        id: new Date().toISOString(),
        timestamp: Date.now(),
        userPhone: newUser.phone,
        type: 'login',
        title: 'User Logged In',
        data: { message: `User ${newUser.name} (${newUser.phone}) logged in.` },
    });
  };
  
  const handleLogout = () => {
      setUser(null);
      setCurrentPage('home');
      localStorage.removeItem(SESSION_KEY);
  };

  const handleNavigation = (page: Page) => {
      setCurrentPage(page);
  };
  
  const renderPublicPages = () => {
    switch (currentPage) {
        case 'about':
            return <AboutPage onBack={() => setCurrentPage('home')} />;
        case 'contact':
            return <ContactPage onBack={() => setCurrentPage('home')} />;
        case 'explore':
             return <GlobePage onBack={() => setCurrentPage('home')} />;
        case 'home':
        default:
            return <HomePage
                onLoginClick={() => setShowAuth(true)}
                onAboutClick={() => setCurrentPage('about')}
                onContactClick={() => setCurrentPage('contact')}
                onExploreClick={() => setCurrentPage('explore')}
            />;
    }
  }

  const renderAuthenticatedApp = () => {
    if (!user) return null;

    const renderPage = () => {
        const isAdmin = false;
        switch (currentPage) {
            case 'welcome':
            case 'home': // Redirect home to welcome if logged in
                return <WelcomePage
                    user={user}
                    onAnalyze={() => setCurrentPage('image-analysis')}
                    onAnalyzePrescription={() => setCurrentPage('prescription-analysis')}
                    onAnalyzeMentalHealth={() => setCurrentPage('mental-health')}
                    onCheckSymptoms={() => setCurrentPage('symptom-checker')}
                />;
            case 'live-alerts':
                return <AlertsPage />;
            case 'image-analysis':
                return <ImageAnalysisPage
                    onBack={() => setCurrentPage('welcome')}
                    onScheduleCheckup={() => setCurrentPage('checkup')}
                    onAnalysisComplete={addActivityToHistory}
                />;
            case 'prescription-analysis':
                return <PrescriptionAnalysisPage onBack={() => setCurrentPage('welcome')} onAnalysisComplete={addActivityToHistory} />;
            case 'checkup':
                return <CheckupPage onBack={() => setCurrentPage('image-analysis')} />;
            case 'mental-health':
                return <MentalHealthPage onBack={() => setCurrentPage('welcome')} onAnalysisComplete={addActivityToHistory} />;
            case 'symptom-checker':
                return <SymptomCheckerPage onBack={() => setCurrentPage('welcome')} onAnalysisComplete={addActivityToHistory} />;
            case 'health-briefing': 
                 return <HealthForecast onBack={() => setCurrentPage('welcome')} />;
            case 'activity-history':
                 return <ActivityHistoryPage history={activityHistory} onBack={() => setCurrentPage('welcome')} />;
            case 'profile':
                return <ProfilePage user={user} onBack={() => setCurrentPage('welcome')} />;
            case 'admin-dashboard':
                return isAdmin ? <AdminDashboardPage onBack={() => setCurrentPage('welcome')} /> : <p>Access Denied. Admin features are disabled.</p>;
            case 'about':
                 return <AboutPage onBack={() => setCurrentPage('welcome')} />;
            case 'contact':
                return <ContactPage onBack={() => setCurrentPage('welcome')} />;
            case 'explore':
                return <GlobePage onBack={() => setCurrentPage('welcome')} />;
            default:
                return <WelcomePage
                    user={user}
                    onAnalyze={() => setCurrentPage('image-analysis')}
                    onAnalyzePrescription={() => setCurrentPage('prescription-analysis')}
                    onAnalyzeMentalHealth={() => setCurrentPage('mental-health')}
                    onCheckSymptoms={() => setCurrentPage('symptom-checker')}
                />;
        }
    };
    
    // New layout with sidebar for logged-in users
    return (
        <div className="flex h-screen bg-slate-100">
            <Sidebar user={user} currentPage={currentPage} onNavigate={handleNavigation} onLogout={handleLogout} />
            <main className="flex-1 overflow-y-auto">
                {renderPage()}
            </main>
        </div>
    );
  };

  if (showIntro) {
    return <IntroAnimation onComplete={() => setShowIntro(false)} />;
  }

  return (
    <>
      {user ? renderAuthenticatedApp() : renderPublicPages()}
      {user && <ChatBot onNavigate={handleNavigation} />}
      {showAuth && (
        <AuthPage
          onClose={() => setShowAuth(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      )}
    </>
  );
}