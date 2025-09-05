import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
    fbq: any;
  }
}

interface AnalyticsProps {
  googleAnalyticsId?: string;
  facebookPixelId?: string;
  hotjarId?: string;
}

const Analytics: React.FC<AnalyticsProps> = ({
  googleAnalyticsId = 'G-XXXXXXXXXX', // Replace with actual GA4 ID
  facebookPixelId = '000000000000000', // Replace with actual Pixel ID
  hotjarId = '0000000' // Replace with actual Hotjar ID
}) => {
  const location = useLocation();

  useEffect(() => {
    // Google Analytics 4
    if (googleAnalyticsId && process.env.NODE_ENV === 'production') {
      // Load GA4 script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
      document.head.appendChild(script);

      // Initialize GA4
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() {
        window.dataLayer.push(arguments);
      };
      window.gtag('js', new Date());
      window.gtag('config', googleAnalyticsId, {
        page_title: document.title,
        page_location: window.location.href,
      });
    }

    // Facebook Pixel
    if (facebookPixelId && process.env.NODE_ENV === 'production') {
      window.fbq = window.fbq || function() {
        (window.fbq.q = window.fbq.q || []).push(arguments);
      };
      window.fbq('init', facebookPixelId);
      window.fbq('track', 'PageView');

      const fbScript = document.createElement('script');
      fbScript.async = true;
      fbScript.src = 'https://connect.facebook.net/en_US/fbevents.js';
      document.head.appendChild(fbScript);
    }

    // Hotjar
    if (hotjarId && process.env.NODE_ENV === 'production') {
      const hotjarScript = `
        (function(h,o,t,j,a,r){
          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:${hotjarId},hjsv:6};
          a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
      `;
      
      const script = document.createElement('script');
      script.innerHTML = hotjarScript;
      document.head.appendChild(script);
    }
  }, [googleAnalyticsId, facebookPixelId, hotjarId]);

  // Track page views on route change
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      // Google Analytics page view
      if (window.gtag && googleAnalyticsId) {
        window.gtag('config', googleAnalyticsId, {
          page_title: document.title,
          page_location: window.location.href,
          page_path: location.pathname + location.search,
        });
      }

      // Facebook Pixel page view
      if (window.fbq) {
        window.fbq('track', 'PageView');
      }
    }
  }, [location, googleAnalyticsId]);

  return null; // This component doesn't render anything
};

// Event tracking utilities
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (process.env.NODE_ENV === 'production') {
    // Google Analytics event
    if (window.gtag) {
      window.gtag('event', eventName, parameters);
    }

    // Facebook Pixel event
    if (window.fbq) {
      window.fbq('track', eventName, parameters);
    }

    // Console log for development
    console.log('Analytics Event:', { eventName, parameters });
  }
};

// Specific event tracking functions
export const trackFormSubmit = (formType: string, formData?: Record<string, any>) => {
  trackEvent('form_submit', {
    form_type: formType,
    ...formData
  });
};

export const trackButtonClick = (buttonName: string, location?: string) => {
  trackEvent('button_click', {
    button_name: buttonName,
    location: location || window.location.pathname
  });
};

export const trackDownload = (fileName: string, fileType?: string) => {
  trackEvent('file_download', {
    file_name: fileName,
    file_type: fileType
  });
};

export const trackAssessmentStart = () => {
  trackEvent('assessment_start');
};

export const trackAssessmentComplete = (score: number) => {
  trackEvent('assessment_complete', {
    score: score
  });
};

export const trackROICalculatorUsed = (monthlyRevenue: number) => {
  trackEvent('roi_calculator_used', {
    monthly_revenue: monthlyRevenue
  });
};

export const trackCalBooking = (sessionType: string) => {
  trackEvent('cal_booking_started', {
    session_type: sessionType
  });
};

export default Analytics;